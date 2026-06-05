import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — PublicityMaps",
  description:
    "How PublicityMaps collects, uses, and protects your personal information. We never sell your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-slate-950 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-5">
              <span className="text-xs font-semibold text-[#00D084] tracking-wide uppercase">
                Legal
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-lg">Effective date: January 1, 2025</p>
          </div>
        </section>

        {/* Commitment banner */}
        <section className="bg-[#0066FF] py-8">
          <div className="max-w-3xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
              {[
                { icon: "🔒", text: "We never sell your data to third parties" },
                { icon: "🤖", text: "We never use your data to train external AI models" },
                { icon: "🗑️", text: "We delete your personal data on request" },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-sm font-medium text-blue-100">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">

            {/* What we collect */}
            <div id="collect" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                1. What Data We Collect
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We collect only the information needed to generate your report and communicate with
                you about your order. This includes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { field: "Name", purpose: "To address your report and communications" },
                  { field: "Email address", purpose: "To deliver your report and order updates" },
                  { field: "Business name", purpose: "To personalize your report cover" },
                  { field: "Service area / city", purpose: "To define the geographic scope of analysis" },
                  { field: "Business type", purpose: "To tailor competitive and demographic analysis" },
                ].map((item) => (
                  <div
                    key={item.field}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-100"
                  >
                    <div className="font-semibold text-slate-800 text-sm">{item.field}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.purpose}</div>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mt-4">
                We also collect payment transaction records (order amount, date, transaction ID) for
                accounting and fraud prevention. We do not store full credit card numbers.
              </p>
            </div>

            {/* How we use it */}
            <div id="use" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your information is used exclusively for the following purposes:
              </p>
              <ul className="space-y-3">
                {[
                  "To generate your PublicityMap™ Visibility Report",
                  "To send you order confirmation, status updates, and report delivery",
                  "To respond to your support or follow-up questions",
                  "To improve the accuracy and relevance of our analysis methodology (using anonymized, aggregated patterns only — never your personal details)",
                  "To comply with legal obligations and prevent fraudulent transactions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00D084] shrink-0" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What we DON'T do */}
            <div id="dont" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                3. What We Do NOT Do
              </h2>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 space-y-4">
                {[
                  {
                    icon: "✗",
                    title: "We never sell your data",
                    desc: "Your personal information is not sold, rented, or traded to any third party — ever.",
                  },
                  {
                    icon: "✗",
                    title: "We never use your data to train external AI models",
                    desc: "Your business information, service area, and report data are not used to train any external AI or machine learning system.",
                  },
                  {
                    icon: "✗",
                    title: "We do not send unsolicited marketing",
                    desc: "We only contact you regarding your order and service. You can unsubscribe from any optional communications at any time.",
                  },
                  {
                    icon: "✗",
                    title: "We do not share data with advertisers",
                    desc: "We run no advertising network and share no data with ad platforms or data brokers.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                      <div className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data retention */}
            <div id="retention" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                4. Data Retention
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We retain delivered reports for <strong>2 years</strong> from the delivery date so
                you can re-download them if needed. After that period, reports are permanently deleted
                from our systems.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Personal information (name, email, business details) is retained for the same 2-year
                window, unless you request earlier deletion. To request deletion of your personal data,
                email{" "}
                <a
                  href="mailto:support@publicitymaps.com"
                  className="text-[#0066FF] hover:underline"
                >
                  support@publicitymaps.com
                </a>{" "}
                with the subject line &ldquo;Data Deletion Request.&rdquo; We will process your request
                within 30 days.
              </p>
            </div>

            {/* Cookies */}
            <div id="cookies" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                5. Cookies & Analytics
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We use standard analytics cookies to understand how visitors use our website —
                specifically which pages are visited, how long sessions last, and where traffic
                originates. This helps us improve the site experience.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do <strong>not</strong> use advertising cookies, retargeting pixels, or any
                tracking technology that follows you across other websites. You can disable cookies
                in your browser settings at any time without affecting your ability to place an order.
              </p>
            </div>

            {/* Your rights */}
            <div id="rights" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                6. Your Rights
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <div className="space-y-3">
                {[
                  {
                    right: "Access",
                    desc: "Request a copy of the personal data we hold about you.",
                  },
                  {
                    right: "Correction",
                    desc: "Ask us to correct inaccurate or incomplete information.",
                  },
                  {
                    right: "Deletion",
                    desc: "Request that we delete your personal data from our systems.",
                  },
                ].map((item) => (
                  <div
                    key={item.right}
                    className="flex items-start gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100"
                  >
                    <div className="font-bold text-[#0066FF] text-sm w-20 shrink-0">
                      {item.right}
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mt-4">
                To exercise any of these rights, email{" "}
                <a
                  href="mailto:support@publicitymaps.com"
                  className="text-[#0066FF] hover:underline"
                >
                  support@publicitymaps.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            {/* Contact */}
            <div id="contact" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                7. Contact
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or how we handle your
                data, please contact us:
              </p>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-1">
                <p className="font-semibold text-slate-900">PublicityMaps LLC</p>
                <p className="text-sm text-slate-600">
                  Email:{" "}
                  <a
                    href="mailto:support@publicitymaps.com"
                    className="text-[#0066FF] hover:underline"
                  >
                    support@publicitymaps.com
                  </a>
                </p>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-4 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 mb-4">
                This Privacy Policy was last updated on January 1, 2025. We may revise it
                periodically — any material changes will be communicated via email.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/terms" className="text-sm text-[#0066FF] hover:underline">
                  Read our Terms of Service
                </Link>
                <span className="hidden sm:inline text-slate-300">|</span>
                <Link href="/contact" className="text-sm text-[#0066FF] hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
