import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { getSectorBySlug } from "@/lib/sectors";
import { ChatForm } from "@/app/sectors/[slug]/chat/ChatForm";
import { getSanitizedBrandKey, hasBrandTheme } from "@/lib/brands";

interface BrandedChatPageProps {
  params: Promise<{ brand: string; slug: string }>;
}

export default async function BrandedSectorChatPage({
  params,
}: BrandedChatPageProps) {
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
      <ChatForm
        slug={sector.slug}
        title={sector.title}
        pageTag={sector.pageTag}
        brandKey={brandKey}
      />
    </Layout>
  );
}
