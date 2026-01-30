import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { SectorPage } from "@/components/SectorPage";
import { getSectorBySlug, getSectors } from "@/lib/sectors";

export const revalidate = 300;

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sectors = await getSectors();
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = await getSectorBySlug(slug);

  if (!sector) {
    return {};
  }

  return {
    title: `${sector.title} | EDUBA`,
    description: sector.hero.subtitle,
  };
}

export default async function SectorRoute({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = await getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  return (
    <Layout>
      <SectorPage sector={sector} />
    </Layout>
  );
}
