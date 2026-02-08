# Railway Deployment Guide

This app needs both Node.js (Next.js) and Python (agent pipeline).  
`nixpacks.toml` is configured so Railway installs both runtimes and agent dependencies.

## 1) Create Railway service

1. In Railway, create a new project from this GitHub repo.
2. Keep default Nixpacks builder (it will read `nixpacks.toml`).

## 2) Add environment variables

Set these in Railway Variables:

- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL` (optional, default: `claude-sonnet-4-5-20250929`)
- `ANTHROPIC_TEMPERATURE` (optional, default: `0.3`)
- `ANTHROPIC_MAX_OUTPUT_TOKENS` (optional, default: `2400`)
- `SANITY_PROJECT_ID`
- `SANITY_DATASET` (usually `production`)
- `SANITY_API_VERSION` (default: `2023-08-01`)
- `SANITY_API_READ_TOKEN` (optional for frontend read)
- `SANITY_API_WRITE_TOKEN` (required for create/edit publish)
- `SITE_URL` (set to your Railway public URL or custom domain)
- `PYTHON_BIN=python`

## 3) Sanity schema

This app uses `sector` docs with a `brand` field.  
Ensure your Sanity dataset has the updated schema from `studio-eduba.io/schemaTypes/sector.ts`.

## 4) First checks after deploy

1. Open `/` and verify Eduba default renders.
2. Open `/pilot` and verify branded shell route renders.
3. Submit `/create-page` with test data.
4. Confirm published URL returns content.

## 5) Domain notes

- Keep Eduba default pages on `eduba.io`.
- Branded pilot pages can live under path prefixes like:
  - `/pilot/{slug}`
  - additional brands later as `/brand-key/{slug}`
