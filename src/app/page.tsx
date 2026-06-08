import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroMapSection from "@/components/HeroMapSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FinalCTASection from "@/components/FinalCTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroMapSection />

        {/* Three punchy value statements */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                {
                  stat: "Find Opportunity.",
                  body: "See every high-visibility zone in your market before you spend a dollar on signs.",
                  color: "#ff6600",
                },
                {
                  stat: "See Demand.",
                  body: "Real traffic counts, homeownership rates, and demographic data — layered on one map.",
                  color: "#0099ff",
                },
                {
                  stat: "Grow Smarter.",
                  body: "Our top-ranked locations have a 94% accuracy rate for delivering above-average visibility.",
                  color: "#00cc88",
                },
              ].map((v) => (
                <div key={v.stat} className="flex flex-col gap-3">
                  <div
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ color: v.color, letterSpacing: "-0.03em" }}
                  >
                    {v.stat}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <PricingSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
