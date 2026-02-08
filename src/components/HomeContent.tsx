import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { ThreeWheelStrategy } from "@/components/ThreeWheelStrategy";
import { Services } from "@/components/Services";
import { ParadigmShift } from "@/components/ParadigmShift";
import { Works } from "@/components/Works";
import { Reviews } from "@/components/Reviews";
import { Team } from "@/components/Team";

interface HomeContentProps {
  brandKey?: string;
}

export function HomeContent({ brandKey = "eduba" }: HomeContentProps) {
  return (
    <Layout brandKey={brandKey}>
      <HeroSection />
      <ThreeWheelStrategy />
      <Services />
      <Works />
      <Reviews />
      <ParadigmShift brandKey={brandKey} />
      <Team />
    </Layout>
  );
}
