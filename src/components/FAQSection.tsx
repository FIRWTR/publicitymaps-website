"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "How current is your data?",
    answer:
      "Our traffic data comes from state DOT AADT (Annual Average Daily Traffic) counts, updated annually. Demographic data uses U.S. Census American Community Survey 5-year estimates, refreshed each December. Competitor density data in our proprietary database is updated monthly. Business Growth Plan subscribers receive automatic monthly refreshes to their existing reports when significant data changes occur in their service area.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 14-day money-back guarantee on all reports. If you're not satisfied with your PublicityMap™ for any reason within 14 days of delivery, email support@publicitymaps.com and we'll issue a full refund — no questions asked. We'd also appreciate the chance to re-analyze at no charge, but the refund is yours regardless.",
  },
  {
    question: "What data sources do you use?",
    answer:
      "PublicityMaps aggregates data from multiple authoritative sources including AADT (Annual Average Daily Traffic) counts from state DOTs, U.S. Census demographics, homeownership and income data from the American Community Survey, Google Maps visibility analysis, and proprietary competitor intelligence. Our AI synthesizes all of these into a single Visibility Score™ for each location.",
  },
  {
    question: "Can I use this for campaign signs and political advertising?",
    answer:
      "Absolutely. Political campaigns are one of our most popular use cases. We analyze voter-heavy corridors, homeownership rates (homeowners display signs), neighborhood political history, and traffic volumes to identify exactly where campaign signs will generate maximum voter impressions per dollar spent.",
  },
  {
    question: "Can I use PublicityMaps to plan billboard placements?",
    answer:
      "Yes. While our reports are optimized for on-site signage (yard signs, banners, vehicle wraps), the same Visibility Score™ methodology applies to billboard site selection. We analyze sightlines, approach speed, dwell time, and daily traffic to rank billboard locations by ROI potential.",
  },
  {
    question: "Do you support multiple cities and markets?",
    answer:
      "Yes. Our Professional Report covers up to 3 service areas, and our Business Growth Plan supports unlimited markets. Enterprise customers can access multi-city analysis through our API. We have coverage across all major U.S. metros and can analyze most secondary markets within 48 hours.",
  },
  {
    question: "How accurate are your recommendations?",
    answer:
      "Our top-ranked locations have a 94% accuracy rate in delivering higher-than-average visibility outcomes when measured against actual impression data. We continuously improve our models by comparing predicted scores against real-world performance data from our customers.",
  },
  {
    question: "How long does it take to receive my report?",
    answer:
      "Standard reports are delivered within 24 hours of submission. Business Growth Plan subscribers get priority same-day delivery. Enterprise customers can use our API for on-demand generation. You'll receive an email with your interactive PDF and shareable map link.",
  },
  {
    question: "What is a Visibility Score™?",
    answer:
      "The Visibility Score™ is our proprietary 0–100 rating system for physical advertising locations. It synthesizes 8 weighted factors: vehicle traffic volume, demographics fit, homeownership rate, average household income, physical visibility (sightlines), posted speed limit, competitor sign density, and your specific customer profile. A score of 80+ indicates an excellent placement opportunity.",
  },
  {
    question: "Can I order a report for a specific intersection?",
    answer:
      "Yes. You can specify exact addresses, intersections, or corridors you want analyzed. You can also let us identify the best locations within your entire service area — often finding high-performing spots you wouldn't have considered otherwise.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-slate-500">
            Everything you need to know before getting your first report.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                openIndex === i
                  ? "border-[#0066FF]/20 bg-blue-50/40"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-semibold text-slate-900">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === i ? "bg-[#0066FF]" : "bg-slate-100"
                  }`}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={`transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M2 3.5l3 3 3-3"
                      stroke={openIndex === i ? "white" : "#64748B"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-400 mb-3">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
          >
            Talk to our team
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
