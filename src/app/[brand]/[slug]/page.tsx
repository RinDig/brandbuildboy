import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { SectorPage } from "@/components/SectorPage";
import { getSectorBySlug, getSectors } from "@/lib/sectors";
import {
  getBrandTheme,
  getBrandThemes,
  getSanitizedBrandKey,
  hasBrandTheme,
} from "@/lib/brands";

export const revalidate = 300;

interface BrandedSectorPageProps {
  params: Promise<{ brand: string; slug: string }>;
}

export async function generateStaticParams() {
  const all = await Promise.all(
    getBrandThemes().map(async (brand) => {
      const sectors = await getSectors(brand.key);
      return sectors.map((sector) => ({ brand: brand.key, slug: sector.slug }));
    })
  );

  return all.flat();
}

export async function generateMetadata({ params }: BrandedSectorPageProps) {
  const { brand, slug } = await params;
  const brandKey = getSanitizedBrandKey(brand);
  if (!hasBrandTheme(brandKey)) {
    return {};
  }

  const sector = await getSectorBySlug(slug, brandKey);
  if (!sector) {
    return {};
  }

  const brandTheme = getBrandTheme(brandKey);
  return {
    title: `${sector.title} | ${brandTheme.name}`,
    description: sector.hero.subtitle,
  };
}

export default async function BrandedSectorPage({ params }: BrandedSectorPageProps) {
  const { brand, slug } = await params;
  const brandKey = getSanitizedBrandKey(brand);
  if (!hasBrandTheme(brandKey)) {
    notFound();
  }

  const sector = await getSectorBySlug(slug, brandKey);
  if (!sector) {
    notFound();
  }

  return (
    <Layout brandKey={brandKey}>
      <SectorPage sector={sector} />
    </Layout>
  );
}
