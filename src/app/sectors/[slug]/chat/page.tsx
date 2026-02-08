import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { getSectorBySlug } from "@/lib/sectors";
import { ChatForm } from "./ChatForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SectorChatPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = await getSectorBySlug(slug, "eduba");

  if (!sector) {
    notFound();
  }

  return (
    <Layout brandKey="eduba">
      <ChatForm
        slug={sector.slug}
        title={sector.title}
        pageTag={sector.pageTag}
        brandKey="eduba"
      />
    </Layout>
  );
}
