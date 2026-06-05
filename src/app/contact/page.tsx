import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Order Your Report — PublicityMaps",
  description:
    "Order a PublicityMap™ Visibility Report. We analyze traffic data, demographics, and location intelligence for your business — delivered in 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 bg-slate-950 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-5">
              <span className="text-xs font-semibold text-[#00D084] tracking-wide uppercase">
                Get Started
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Order Your PublicityMap™
            </h1>
            <p className="text-lg text-slate-400">
              Fill out the form below and we&apos;ll have your Visibility Report ready within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <ContactForm />
          </div>
        </section>

        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="max-w-2xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: "🔒", title: "Secure & Private", desc: "Your data is never shared or sold" },
              { icon: "⚡", title: "24-Hour Delivery", desc: "Standard reports in under a day" },
              { icon: "✅", title: "Satisfaction Guaranteed", desc: "Not happy? We re-analyze for free" },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-sm font-bold text-slate-800">{item.title}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
