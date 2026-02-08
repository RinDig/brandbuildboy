# BrandBuildBoy (Eduba-based)

Multi-brand Next.js app that generates branded, document-style sector pages using:

- Next.js (frontend + API routes)
- Python agent (Anthropic generation + source ingestion)
- Sanity (content storage and publishing)

## Local setup

1. Install Node + Python.
2. Install dependencies:

```bash
npm install
pip install -r agent/requirements.txt
```

3. Create `.env.local` from `.env.example` and fill values.
4. Run:

```bash
npm run dev
```

## Route model

- Eduba default home: `/`
- Eduba default create page: `/create-page`
- Eduba sector pages: `/sectors/{slug}`
- Branded home: `/{brand}`
- Branded create page: `/{brand}/create-page`
- Branded sector page: `/{brand}/{slug}`
- VigilOre quick-create path: `/vigilore/create-page`
- Armetor quick-create path: `/armetor/create-page`

## Deploying on Railway

See `RAILWAY_DEPLOY.md`.
