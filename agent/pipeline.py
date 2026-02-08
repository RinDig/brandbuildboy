from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import List, Optional
from uuid import uuid4

from agent.anthropic_client import AnthropicClient
from agent.config import Settings
from agent.ingest import Source, auto_pull_sources, gather_sources, truncate_sources
from agent.pricing import apply_price_guardrails
from agent.prompts import EDIT_PROMPT_TEMPLATE, SYSTEM_PROMPT, USER_PROMPT_TEMPLATE
from agent.sanity_client import fetch_sector_by_slug, fetch_sector_slugs, publish_sector


BRAND_PROFILE_NOTES: dict[str, str] = {
    "eduba": (
        "Pragmatic anti-hype consultancy voice. Crisp language, direct claims, "
        "measurable outcomes, and capability transfer emphasis."
    ),
    "pilot": (
        "Enterprise-modern advisory voice. Clear and professional, slightly formal, "
        "with emphasis on reliable delivery, governance, and executive readability."
    ),
}


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"[\s_-]+", "-", value)
    return value.strip("-") or "sector"


def normalize_brand(value: str | None) -> str:
    if not value:
        return "eduba"
    brand = value.strip().lower()
    brand = re.sub(r"[^a-z0-9-]", "-", brand)
    brand = re.sub(r"-+", "-", brand).strip("-")
    return brand or "eduba"


def brand_profile_text(brand_key: str) -> str:
    return BRAND_PROFILE_NOTES.get(
        brand_key,
        "Use a neutral professional B2B tone, grounded and measurable.",
    )


def with_key(item: dict) -> dict:
    return {"_key": uuid4().hex, **item}


def add_keys(payload: dict) -> dict:
    payload["consulting"]["cards"] = [
        with_key(card) for card in payload["consulting"]["cards"]
    ]
    payload["whyUs"]["items"] = [with_key(item) for item in payload["whyUs"]["items"]]
    payload["services"]["cards"] = [
        with_key(card) for card in payload["services"]["cards"]
    ]
    payload["methodology"]["steps"] = [
        with_key(step) for step in payload["methodology"]["steps"]
    ]
    payload["engagement"]["cards"] = [
        with_key(card) for card in payload["engagement"]["cards"]
    ]
    payload["faq"]["items"] = [with_key(item) for item in payload["faq"]["items"]]
    return payload


@dataclass
class AgentInput:
    company_name: str
    sector_label: str
    slug: Optional[str]
    brand_key: str
    context: str
    files: List[str]
    links: List[str]
    website: str
    include_categories: List[str]
    exclude_patterns: List[str]


def build_sources_summary(sources: List[Source]) -> str:
    if not sources:
        return "(no additional sources)"
    blocks = []
    for source in sources:
        snippet = source.content[:1200]
        blocks.append(f"[{source.source_type}] {source.source_id}\n{snippet}")
    return "\n\n".join(blocks)


def generate_sector_payload(agent_input: AgentInput, settings: Settings) -> dict:
    sources = gather_sources(agent_input.files, agent_input.links)
    if agent_input.website and agent_input.include_categories:
        sources.extend(
            auto_pull_sources(
                agent_input.website,
                agent_input.include_categories,
                agent_input.exclude_patterns,
            )
        )
    sources = truncate_sources(sources, max_chars=5000)
    sources_summary = build_sources_summary(sources)

    brand_key = normalize_brand(agent_input.brand_key)
    slug = agent_input.slug or slugify(agent_input.company_name)

    prompt = USER_PROMPT_TEMPLATE.format(
        brand_key=brand_key,
        brand_profile=brand_profile_text(brand_key),
        company_name=agent_input.company_name,
        sector_label=agent_input.sector_label,
        slug=slug,
        company_context=agent_input.context or "(no additional context)",
        sources_summary=sources_summary,
    )

    client = AnthropicClient(
        api_key=settings.anthropic_api_key,
        model=settings.anthropic_model,
        temperature=settings.anthropic_temperature,
        max_output_tokens=settings.max_output_tokens,
    )

    payload = client.generate_json(SYSTEM_PROMPT, prompt)
    payload["slug"] = slug
    payload["brand"] = brand_key
    payload = apply_price_guardrails(payload)
    payload = add_keys(payload)

    return payload


@dataclass
class EditInput:
    slug: str
    brand_key: str
    sector_label: str
    instructions: str
    context: str
    files: List[str]
    links: List[str]
    website: str
    include_categories: List[str]
    exclude_patterns: List[str]


def strip_keys(items: list[dict]) -> list[dict]:
    cleaned = []
    for item in items:
        if isinstance(item, dict):
            cleaned.append({k: v for k, v in item.items() if k != "_key"})
        else:
            cleaned.append(item)
    return cleaned


def normalize_existing(payload: dict, slug: str, brand_key: str) -> dict:
    payload = dict(payload)
    payload["slug"] = payload.get("slug") or slug
    payload["brand"] = normalize_brand(payload.get("brand") or brand_key)
    for section in ("consulting", "services", "engagement"):
        if isinstance(payload.get(section), dict):
            cards = payload[section].get("cards", [])
            payload[section]["cards"] = strip_keys(cards)
    if isinstance(payload.get("whyUs"), dict):
        payload["whyUs"]["items"] = strip_keys(payload["whyUs"].get("items", []))
    if isinstance(payload.get("methodology"), dict):
        payload["methodology"]["steps"] = strip_keys(
            payload["methodology"].get("steps", [])
        )
    if isinstance(payload.get("faq"), dict):
        payload["faq"]["items"] = strip_keys(payload["faq"].get("items", []))
    return payload


def generate_updated_payload(edit_input: EditInput, settings: Settings) -> dict:
    sources = gather_sources(edit_input.files, edit_input.links)
    if edit_input.website and edit_input.include_categories:
        sources.extend(
            auto_pull_sources(
                edit_input.website,
                edit_input.include_categories,
                edit_input.exclude_patterns,
            )
        )
    sources = truncate_sources(sources, max_chars=5000)
    sources_summary = build_sources_summary(sources)

    brand_key = normalize_brand(edit_input.brand_key)
    existing = fetch_sector_by_slug(
        project_id=settings.sanity_project_id,
        dataset=settings.sanity_dataset,
        api_version=settings.sanity_api_version,
        token=settings.sanity_api_token,
        slug=edit_input.slug,
        brand=brand_key,
    )
    if not existing:
        raise ValueError(
            f"Sector not found for slug: {edit_input.slug} (brand: {brand_key})"
        )

    normalized = normalize_existing(existing, edit_input.slug, brand_key)
    sector_label = edit_input.sector_label or normalized.get("title") or "Sector"
    existing_json = json.dumps(normalized, indent=2)

    prompt = EDIT_PROMPT_TEMPLATE.format(
        brand_key=brand_key,
        brand_profile=brand_profile_text(brand_key),
        slug=edit_input.slug,
        sector_label=sector_label,
        instructions=edit_input.instructions,
        company_context=edit_input.context or "(no additional context)",
        sources_summary=sources_summary,
        existing_json=existing_json,
    )

    client = AnthropicClient(
        api_key=settings.anthropic_api_key,
        model=settings.anthropic_model,
        temperature=settings.anthropic_temperature,
        max_output_tokens=settings.max_output_tokens,
    )

    payload = client.generate_json(SYSTEM_PROMPT, prompt)
    payload["slug"] = edit_input.slug
    payload["brand"] = brand_key
    payload = apply_price_guardrails(payload)
    payload = add_keys(payload)
    return payload


def publish_sector_payload(payload: dict, settings: Settings) -> str:
    slug = payload["slug"]
    brand_key = normalize_brand(payload.get("brand"))

    slugs = fetch_sector_slugs(
        project_id=settings.sanity_project_id,
        dataset=settings.sanity_dataset,
        api_version=settings.sanity_api_version,
        token=settings.sanity_api_token,
        brand=brand_key,
    )
    if slug in slugs:
        page_index = slugs.index(slug) + 1
    else:
        slugs.append(slug)
        page_index = len(slugs)

    payload["pageIndex"] = f"{page_index:03d}"
    document_id = f"sector-{slug}" if brand_key == "eduba" else f"sector-{brand_key}-{slug}"
    doc = {
        "_id": document_id,
        "_type": "sector",
        "brand": brand_key,
        "title": payload["title"],
        "slug": {"current": slug},
        "pageIndex": payload["pageIndex"],
        "pageTag": payload["pageTag"],
        "hero": payload["hero"],
        "consulting": payload["consulting"],
        "whyUs": payload["whyUs"],
        "services": payload["services"],
        "methodology": payload["methodology"],
        "engagement": payload["engagement"],
        "faq": payload["faq"],
        "cta": payload["cta"],
    }

    publish_sector(
        project_id=settings.sanity_project_id,
        dataset=settings.sanity_dataset,
        api_version=settings.sanity_api_version,
        token=settings.sanity_api_token,
        document=doc,
    )

    if brand_key == "eduba":
        return f"{settings.site_url}/sectors/{slug}"
    return f"{settings.site_url}/{brand_key}/{slug}"
