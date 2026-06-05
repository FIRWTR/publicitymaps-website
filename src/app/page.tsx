import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import VisibilityScoreSection from "@/components/VisibilityScoreSection";
import IndustriesSection from "@/components/IndustriesSection";
import SampleMapSection from "@/components/SampleMapSection";
import WhySection from "@/components/WhySection";
import SampleReportSection from "@/components/SampleReportSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <VisibilityScoreSection />
        <IndustriesSection />
        <SampleMapSection />
        <WhySection />
        <SampleReportSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
