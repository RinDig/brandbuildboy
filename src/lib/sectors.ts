import "server-only";
import type { Sector } from "@/lib/sectorTypes";
import { fallbackSectors } from "@/data/sectors";

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;
const SANITY_API_VERSION = process.env.SANITY_API_VERSION || "2023-08-01";
const SANITY_API_READ_TOKEN = process.env.SANITY_API_READ_TOKEN;

const HAS_SANITY = Boolean(SANITY_PROJECT_ID && SANITY_DATASET);

const sectorProjection = `{
  "slug": slug.current,
  title,
  pageIndex,
  pageTag,
  hero,
  consulting,
  whyUs,
  services,
  methodology,
  engagement,
  faq,
  cta
}`;

async function fetchSanity<T>(query: string, params?: Record<string, string>) {
  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    throw new Error("Missing SANITY_PROJECT_ID or SANITY_DATASET");
  }

  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );
  url.searchParams.set("query", query);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    });
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
    headers: SANITY_API_READ_TOKEN
      ? { Authorization: `Bearer ${SANITY_API_READ_TOKEN}` }
      : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Sanity request failed: ${res.status} ${errorText}`);
  }

  const data = (await res.json()) as { result: T };
  return data.result;
}

export async function getSectors(): Promise<Sector[]> {
  if (!HAS_SANITY) {
    return fallbackSectors;
  }

  const query = `*[_type == "sector"]${sectorProjection}`;
  const result = await fetchSanity<Sector[]>(query);
  return result;
}

export async function getSectorBySlug(slug: string): Promise<Sector | null> {
  if (!HAS_SANITY) {
    return fallbackSectors.find((sector) => sector.slug === slug) ?? null;
  }

  const query = `*[_type == "sector" && slug.current == $slug][0]${sectorProjection}`;
  const result = await fetchSanity<Sector | null>(query, { slug });
  return result ?? null;
}
