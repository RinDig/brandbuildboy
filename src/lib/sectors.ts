import "server-only";
import type { Sector } from "@/lib/sectorTypes";
import { fallbackSectors } from "@/data/sectors";
import { getSanitizedBrandKey } from "@/lib/brands";

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;
const SANITY_API_VERSION = process.env.SANITY_API_VERSION || "2023-08-01";
const SANITY_API_READ_TOKEN = process.env.SANITY_API_READ_TOKEN;

const HAS_SANITY = Boolean(SANITY_PROJECT_ID && SANITY_DATASET);

const sectorProjection = `{
  brand,
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

export async function getSectors(brandKey?: string): Promise<Sector[]> {
  const brand = getSanitizedBrandKey(brandKey);

  if (!HAS_SANITY) {
    if (brand !== "eduba") return [];
    return fallbackSectors.map((sector) => ({ ...sector, brand: "eduba" }));
  }

  const query =
    brand === "eduba"
      ? `*[_type == "sector" && (!defined(brand) || brand == $brand)]${sectorProjection}`
      : `*[_type == "sector" && brand == $brand]${sectorProjection}`;
  const result = await fetchSanity<Sector[]>(query, { brand });
  return result.map((sector) => ({ ...sector, brand: sector.brand || "eduba" }));
}

export async function getSectorBySlug(
  slug: string,
  brandKey?: string
): Promise<Sector | null> {
  const brand = getSanitizedBrandKey(brandKey);

  if (!HAS_SANITY) {
    if (brand !== "eduba") return null;
    const result = fallbackSectors.find((sector) => sector.slug === slug) ?? null;
    return result ? { ...result, brand: "eduba" } : null;
  }

  const query =
    brand === "eduba"
      ? `*[_type == "sector" && slug.current == $slug && (!defined(brand) || brand == $brand)][0]${sectorProjection}`
      : `*[_type == "sector" && slug.current == $slug && brand == $brand][0]${sectorProjection}`;
  const result = await fetchSanity<Sector | null>(query, { slug, brand });
  return result ? { ...result, brand: result.brand || "eduba" } : null;
}

export async function getBrandsWithSectors(): Promise<string[]> {
  if (!HAS_SANITY) {
    return ["eduba"];
  }

  const query = `array::unique(*[_type == "sector"]{ "brand": coalesce(brand, "eduba") }.brand)`;
  const result = await fetchSanity<string[] | null>(query);
  return (result || []).filter(Boolean);
}
