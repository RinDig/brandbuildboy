# Eduba Sector Agent (Python)

Generates branded sector page payloads from chat + docs + links, applies pricing guardrails, and auto-publishes to Sanity.

## How the workflow works

1. Input: provide company, sector, brand, optional slug, context, and optional docs/links.
2. Ingestion: files are parsed (PDF/DOCX/TXT/MD) and links are fetched/cleaned.
3. Prompting: structured prompts (`prompts.py`) ask Anthropic to return strict JSON.
4. Guardrails: service prices are normalized with static ranges (`pricing.py`).
5. Sanity publish: payload is mapped to the `sector` schema and upserted.
6. Result: published URL is returned (brand-aware path).

## Files and responsibilities

- `config.py`
  - Loads `.env.local` + env vars.
  - Holds Anthropic + Sanity settings.
- `ingest.py`
  - Extracts text from PDFs, DOCX, and text files.
  - Fetches and cleans HTML from URLs.
- `prompts.py`
  - System + user prompts for generating sector JSON.
  - Defines schema + output rules.
- `anthropic_client.py`
  - Anthropic Messages API wrapper.
  - Parses model output into JSON.
- `pricing.py`
  - Static pricing guardrails for service cards.
- `sanity_client.py`
  - Publishes documents to Sanity.
  - Reads existing slugs per brand to set `pageIndex` order.
- `pipeline.py`
  - Orchestrates ingestion -> LLM -> guardrails -> publish.
  - Adds `_key` values required by Sanity arrays.
- `cli.py`
  - CLI entry point to run the agent locally.

## Setup

```bash
pip install -r agent/requirements.txt
```

Add env vars to `.env.local`:

```
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=claude-sonnet-4-5-20250929
ANTHROPIC_TEMPERATURE=0.3
ANTHROPIC_MAX_OUTPUT_TOKENS=2400
SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_API_VERSION=2023-08-01
SANITY_API_WRITE_TOKEN=...
SITE_URL=http://localhost:3000
```

## Run

```bash
python -m agent.cli \
  --company "Acme Aerospace" \
  --sector "Aerospace" \
  --brand "pilot" \
  --context "They build propulsion systems and want faster certification." \
  --doc /path/to/brief.pdf \
  --link https://example.com/case-study
```

Add `--no-publish` to print the JSON without sending to Sanity.

## Notes

- Pricing guardrails are intentionally static for now.
- Slug ordering drives `pageIndex` per brand.
- `/create-page` and `/api/sector-chat` call this same CLI pipeline.
