import SectionCard from "@/components/section/SectionCard";
import Navbar from "../components/ui/Navbar";
import HeroSection from "@/components/section/HeroSection";
import { Footer } from "@/components/ui/Footer";
import MuseumSection from "@/components/section/MuseumSection";
import StepSection from "@/components/section/StepSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <StepSection />
      <SectionCard />

      <MuseumSection />
      <Footer />
    </div>
  );
}
