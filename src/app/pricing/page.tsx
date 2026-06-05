import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — PublicityMaps",
  description:
    "Simple, transparent pricing for location intelligence reports. Start with a one-time Starter Report for $99.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
              style={{ background: "radial-gradient(ellipse, #0066FF 0%, transparent 70%)" }}
            />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-5">
              <span className="text-xs font-semibold text-[#00D084] tracking-wide uppercase">Pricing</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-5">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Every report pays for itself the first time you place a sign that actually performs. Start with a single report — no subscription required.
            </p>
          </div>
        </section>

        <PricingSection compact />

        {/* Comparison */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">
              What does one misplaced sign cost you?
            </h2>
            <p className="text-slate-500 mb-8">
              At $15–$50 per sign installation, plus print costs, one wrong location costs more than a Professional Report.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { cost: "$15–50", label: "Sign installation cost", sub: "per location" },
                { cost: "$20–80", label: "Print & materials", sub: "per sign" },
                { cost: "0", label: "Impressions", sub: "from wrong location" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-slate-100 p-5">
                  <div className="text-2xl font-black text-slate-900 mb-1">{item.cost}</div>
                  <div className="text-sm font-medium text-slate-700">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.sub}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-slate-500 text-sm">
              A $99 Starter Report shows you exactly which 5 locations to hit — often saving 10× its cost on the first campaign.
            </p>
          </div>
        </section>

        <FAQSection />

        {/* CTA */}
        <section className="py-16 bg-[#0066FF]">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Start with your first report today
            </h2>
            <p className="text-blue-100 mb-6">
              No subscription. No contracts. Just actionable intelligence you can use this week.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#0066FF] font-bold hover:bg-blue-50 transition-colors shadow-xl"
            >
              Order My Report
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
