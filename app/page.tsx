import FeatureSection from "@/components/section/FeatureSection";
import Navbar from "../components/ui/Navbar";
import HeroSection from "@/components/section/HeroSection";
import { Footer } from "@/components/ui/Footer";
import MuseumSection from "@/components/section/MuseumSection";
import StepSection from "@/components/section/StepSection";

import LandingLayout from "@/components/ui/LandingLayout";

export default function Home() {
  return (
    <LandingLayout>
      <Navbar />
      <HeroSection />
      <StepSection />
      <FeatureSection />
      <MuseumSection />
      <Footer />
    </LandingLayout>
  );
}
