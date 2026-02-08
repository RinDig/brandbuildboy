# Railway Deployment Guide

This app needs both Node.js (Next.js) and Python (agent pipeline).  
Railpack may only detect Node in some projects.  
This repo includes a `Dockerfile` that installs both runtimes and is the recommended Railway path.

## 1) Create Railway service

1. In Railway, create a new project from this GitHub repo.
2. In Railway service settings, set `Builder` to `Dockerfile`.

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
- `PYTHON_BIN` is already set by the `Dockerfile` (`/opt/venv/bin/python`), so you can omit it.

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
