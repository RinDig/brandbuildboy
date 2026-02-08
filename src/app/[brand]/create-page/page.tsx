import { notFound } from "next/navigation";
import { CreatePageForm } from "@/components/CreatePageForm";
import { getSanitizedBrandKey, hasBrandTheme } from "@/lib/brands";

interface BrandCreatePageProps {
  params: Promise<{ brand: string }>;
}

export default async function BrandCreatePage({ params }: BrandCreatePageProps) {
  const { brand } = await params;
  const brandKey = getSanitizedBrandKey(brand);
  if (!hasBrandTheme(brandKey)) {
    notFound();
  }

  return <CreatePageForm brandKey={brandKey} />;
}
