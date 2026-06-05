import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — PublicityMaps",
  description:
    "Review the PublicityMaps Terms of Service. Learn about payment terms, refund policy, data sources, and your rights as a customer.",
};

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By purchasing a report, creating an account, or otherwise using the PublicityMaps platform
        (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree,
        please do not use our Service. These Terms apply to all users, customers, and visitors.
      </p>
    ),
  },
  {
    id: "service",
    title: "2. Description of Service",
    content: (
      <>
        <p>
          PublicityMaps provides location intelligence reports for physical advertising. Our reports
          combine traffic volume data, demographic analysis, visibility scoring, and AI-assisted
          interpretation to help businesses identify high-impact advertising locations.
        </p>
        <p className="mt-3">
          Reports are compiled using publicly available data sources (including state DOT traffic
          counts, U.S. Census Bureau data, and mapping APIs) combined with our proprietary
          Visibility Score™ methodology. Each report is delivered digitally in PDF format within the
          stated delivery window.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "3. Payment Terms",
    content: (
      <>
        <p>
          All prices are listed in U.S. dollars. Current pricing is as follows:
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              name: "Starter Report",
              price: "$99 one-time",
              desc: "5 ranked locations, Visibility Score™, PDF report",
            },
            {
              name: "Professional Report",
              price: "$299 one-time",
              desc: "15 ranked locations, full breakdown, interactive map",
            },
            {
              name: "Business Growth Plan",
              price: "$999/year",
              desc: "Unlimited reports, monthly refresh, priority delivery",
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100"
            >
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{plan.name}</div>
                <div className="text-sm text-slate-500 mt-0.5">{plan.desc}</div>
              </div>
              <div className="text-sm font-bold text-[#0066FF] shrink-0">{plan.price}</div>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Payments are processed securely. PublicityMaps does not store full credit card numbers on
          our servers. All transactions are protected by 256-bit SSL encryption. Prices are subject
          to change with reasonable notice posted on the website.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "4. Refund Policy",
    content: (
      <>
        <div className="bg-[#00D084]/10 border border-[#00D084]/30 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#00D084" />
              <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-slate-900">14-Day Money-Back Guarantee</span>
          </div>
          <p className="text-sm text-slate-600">
            If you are not satisfied with your report within 14 days of delivery, contact us at{" "}
            <a href="mailto:support@publicitymaps.com" className="text-[#0066FF] hover:underline">
              support@publicitymaps.com
            </a>{" "}
            for a full refund. No questions asked.
          </p>
        </div>
        <p>
          Refund requests must be submitted within 14 calendar days of the report delivery date.
          Refunds for the Business Growth Plan are prorated during the first 14 days. After the
          14-day window, no refunds are issued for completed reports or subscription periods already
          rendered.
        </p>
      </>
    ),
  },
  {
    id: "accuracy",
    title: "5. Accuracy Disclaimer",
    content: (
      <>
        <p>
          PublicityMaps reports are based on the best available publicly accessible data at the time
          of report generation, including DOT traffic counts, U.S. Census American Community Survey
          (ACS) data, and Google Maps visibility analysis. We make reasonable efforts to ensure data
          accuracy and currency.
        </p>
        <p className="mt-3">
          However, <strong>PublicityMaps does not guarantee specific business outcomes</strong> from
          sign or advertisement placement. Traffic counts, demographic compositions, and competitive
          landscapes change over time. Report recommendations represent data-informed analysis, not a
          guarantee of advertising performance, foot traffic, or revenue results.
        </p>
      </>
    ),
  },
  {
    id: "data-sources",
    title: "6. Data Sources",
    content: (
      <>
        <p className="mb-4">Our reports draw from the following data sources:</p>
        <ul className="space-y-2">
          {[
            "Annual Average Daily Traffic (AADT) counts from state Departments of Transportation — updated annually",
            "U.S. Census Bureau American Community Survey (ACS) 5-year estimates",
            "ACS homeownership and household income data by census tract",
            "Google Maps visibility and intersection geometry analysis",
            "Proprietary competitor intelligence database compiled from public business listings",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
              <span className="text-slate-600 text-sm">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Data sources may be updated or supplemented as better sources become available. We will
          note any significant methodology changes in updated reports.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "7. Intellectual Property",
    content: (
      <>
        <p>
          The PublicityMaps platform, its software, visual design, and all associated content are
          the exclusive property of PublicityMaps LLC. All rights reserved.
        </p>
        <p className="mt-3">
          <strong>Visibility Score™</strong> and <strong>PublicityMap™</strong> are trademarks of
          PublicityMaps LLC. You may not use these marks without written permission. Reports
          purchased by customers may be used internally for business decision-making. Resale,
          redistribution, or commercial licensing of report data to third parties is prohibited
          without a written agreement.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by applicable law, PublicityMaps LLC and its officers,
        employees, and affiliates shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages arising from your use of the Service or reliance on
        report data — including but not limited to lost profits, lost revenue, or business
        interruption. Our total liability to any customer shall not exceed the amount paid for the
        applicable report or subscription in the 12 months preceding the claim.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    content: (
      <p>
        These Terms are governed by and construed in accordance with the laws of the State of Texas,
        without regard to its conflict-of-law provisions. Any disputes shall be resolved in the
        state or federal courts located in Texas. If any provision of these Terms is found to be
        unenforceable, the remaining provisions will remain in full effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "10. Contact",
    content: (
      <>
        <p>Questions about these Terms? Reach us at:</p>
        <div className="mt-4 bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-1">
          <p className="font-semibold text-slate-900">PublicityMaps LLC</p>
          <p className="text-sm text-slate-600">
            Email:{" "}
            <a href="mailto:support@publicitymaps.com" className="text-[#0066FF] hover:underline">
              support@publicitymaps.com
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-5">
              <span className="text-xs font-semibold text-[#00D084] tracking-wide uppercase">Legal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-400 text-lg">
              Effective date: January 1, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Quick nav */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-12">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                On this page
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm text-[#0066FF] hover:underline"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {SECTIONS.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    {section.title}
                  </h2>
                  <div className="text-slate-600 leading-relaxed">{section.content}</div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-16 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 mb-4">
                These Terms were last updated on January 1, 2025. We may update them periodically —
                continued use of the Service constitutes acceptance of any changes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/privacy"
                  className="text-sm text-[#0066FF] hover:underline"
                >
                  Read our Privacy Policy
                </Link>
                <span className="hidden sm:inline text-slate-300">|</span>
                <Link
                  href="/contact"
                  className="text-sm text-[#0066FF] hover:underline"
                >
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
