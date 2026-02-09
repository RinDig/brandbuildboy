from __future__ import annotations

import json
from typing import Any, Dict

import requests


def fetch_sector_slugs(
    project_id: str,
    dataset: str,
    api_version: str,
    token: str,
    brand: str,
) -> list[str]:
    if brand == "eduba":
        query = (
            '*[_type == "sector" && (!defined(brand) || brand == $brand)]'
            '|order(_createdAt asc){ "slug": slug.current }'
        )
    else:
        query = (
            '*[_type == "sector" && brand == $brand]'
            '|order(_createdAt asc){ "slug": slug.current }'
        )
    url = f"https://{project_id}.api.sanity.io/v{api_version}/data/query/{dataset}"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(
        url,
        headers=headers,
        params={"query": query, "$brand": f"\"{brand}\""},
        timeout=30,
    )
    if not response.ok:
        raise RuntimeError(
            f"Sanity query failed: {response.status_code} {response.text}"
        )
    data = response.json()
    slugs = [item.get("slug") for item in data.get("result", []) if item.get("slug")]
    return slugs


def fetch_sector_by_slug(
    project_id: str,
    dataset: str,
    api_version: str,
    token: str,
    slug: str,
    brand: str,
) -> dict | None:
    if brand == "eduba":
        query = (
            '*[_type == "sector" && slug.current == $slug && (!defined(brand) || brand == $brand)][0]'
            '{'
            '"brand": coalesce(brand, "eduba"),'
            '"slug": slug.current,'
            'title,'
            'pageIndex,'
            'pageTag,'
            'hero,'
            'consulting,'
            'whyUs,'
            'services,'
            'methodology,'
            'engagement,'
            'faq,'
            'cta'
            '}'
        )
    else:
        query = (
            '*[_type == "sector" && slug.current == $slug && brand == $brand][0]'
            '{'
            '"brand": coalesce(brand, "eduba"),'
            '"slug": slug.current,'
            'title,'
            'pageIndex,'
            'pageTag,'
            'hero,'
            'consulting,'
            'whyUs,'
            'services,'
            'methodology,'
            'engagement,'
            'faq,'
            'cta'
            '}'
        )
    url = f"https://{project_id}.api.sanity.io/v{api_version}/data/query/{dataset}"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(
        url,
        headers=headers,
        params={
            "query": query,
            "$slug": f"\"{slug}\"",
            "$brand": f"\"{brand}\"",
        },
        timeout=30,
    )
    if not response.ok:
        raise RuntimeError(
            f"Sanity query failed: {response.status_code} {response.text}"
        )
    data = response.json()
    return data.get("result")


def publish_sector(
    project_id: str,
    dataset: str,
    api_version: str,
    token: str,
    document: Dict[str, Any],
) -> Dict[str, Any]:
    url = f"https://{project_id}.api.sanity.io/v{api_version}/data/mutate/{dataset}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    payload = {"mutations": [{"createOrReplace": document}]}
    response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=30)
    if not response.ok:
        details = response.text
        if response.status_code == 403 and "permission \"create\" required" in details:
            raise RuntimeError(
                "Sanity publish failed: API token lacks create permission for this dataset. "
                "Use SANITY_API_WRITE_TOKEN with create/update rights (Editor role or equivalent). "
                f"Raw response: {details}"
            )
        raise RuntimeError(f"Sanity publish failed: {response.status_code} {details}")
    return response.json()
