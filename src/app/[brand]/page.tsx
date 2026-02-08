import { notFound } from "next/navigation";
import { HomeContent } from "@/components/HomeContent";
import { getSanitizedBrandKey, hasBrandTheme, getBrandThemes } from "@/lib/brands";

export const revalidate = 300;

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return getBrandThemes().map((brand) => ({ brand: brand.key }));
}

export default async function BrandHomePage({ params }: BrandPageProps) {
  const { brand } = await params;
  const brandKey = getSanitizedBrandKey(brand);
  if (!hasBrandTheme(brandKey)) {
    notFound();
  }

  return <HomeContent brandKey={brandKey} />;
}
