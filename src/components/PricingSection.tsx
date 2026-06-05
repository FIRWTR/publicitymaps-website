"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter Report",
    price: 99,
    period: "one-time",
    description: "Perfect for businesses placing a few signs in a single area.",
    features: [
      "1 service area analyzed",
      "Up to 5 ranked locations",
      "Visibility Score™ per location",
      "Traffic count data",
      "Basic demographics",
      "PDF report",
    ],
    cta: "Get Starter Report",
    highlight: false,
    badge: null,
  },
  {
    name: "Professional Report",
    price: 299,
    period: "one-time",
    description: "For businesses running active sign campaigns across a wider area.",
    features: [
      "Up to 3 service areas",
      "Up to 15 ranked locations",
      "Full Visibility Score™ breakdown",
      "Traffic + speed limit data",
      "Full demographic profile",
      "Competitor density mapping",
      "Sign type recommendations",
      "PDF + interactive map",
    ],
    cta: "Get Professional Report",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Business Growth Plan",
    price: 999,
    period: "year",
    description: "Ongoing intelligence for businesses making regular advertising decisions.",
    features: [
      "Unlimited reports",
      "All service areas",
      "Monthly data refresh",
      "Priority delivery (same-day)",
      "Campaign sign placement",
      "Year-over-year comparison",
      "Dedicated account support",
      "Team collaboration access",
    ],
    cta: "Start Growth Plan",
    highlight: false,
    badge: "Best Value",
  },
  {
    name: "Enterprise",
    price: null,
    period: "custom",
    description: "For agencies, sign companies, and high-volume advertisers.",
    features: [
      "White-label reporting",
      "API access",
      "Custom data integrations",
      "Multi-market analysis",
      "Volume pricing",
      "Dedicated success manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
];

export default function PricingSection({ compact = false }: { compact?: boolean }) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!compact && (
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">
                Simple Pricing
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Invest Once, Advertise Smart
            </h2>
            <p className="text-lg text-slate-500">
              Every report pays for itself the first time you avoid a low-performing sign placement.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                plan.highlight
                  ? "bg-[#0066FF] border-[#0066FF] shadow-2xl shadow-blue-500/30"
                  : hoveredPlan === plan.name
                  ? "bg-white border-slate-200 shadow-xl shadow-slate-100/50"
                  : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                      plan.highlight
                        ? "bg-white text-[#0066FF]"
                        : "bg-[#00D084] text-white"
                    }`}
                  >
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h3
                  className={`text-base font-bold mb-1 ${
                    plan.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-xs leading-relaxed mb-5 ${
                    plan.highlight ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price !== null ? (
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-4xl font-black ${
                          plan.highlight ? "text-white" : "text-slate-900"
                        }`}
                      >
                        ${plan.price}
                      </span>
                      <span
                        className={`text-sm pb-1 ${
                          plan.highlight ? "text-blue-200" : "text-slate-400"
                        }`}
                      >
                        /{plan.period}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`text-3xl font-black ${
                        plan.highlight ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Custom
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <path
                          d="M2.5 7l3 3 6-6"
                          stroke={plan.highlight ? "rgba(255,255,255,0.8)" : "#00D084"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`text-xs leading-relaxed ${
                          plan.highlight ? "text-blue-100" : "text-slate-600"
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={
                    plan.name === "Enterprise"
                      ? "/contact"
                      : plan.name === "Starter Report"
                      ? "/checkout?plan=starter"
                      : plan.name === "Professional Report"
                      ? "/checkout?plan=professional"
                      : "/checkout?plan=growth"
                  }
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.highlight
                      ? "bg-white text-[#0066FF] hover:bg-blue-50"
                      : "bg-[#0066FF] text-white hover:bg-[#0052CC]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1L2 3v3.5c0 2.485 1.96 4.81 4.5 5.5C9.04 11.31 11 8.985 11 6.5V3L6.5 1z" stroke="#94A3B8" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M4.5 6.5l1.5 1.5 2.5-2.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Secure checkout
          </span>
          <span className="text-slate-200 select-none">·</span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="3" width="11" height="7" rx="1.5" stroke="#94A3B8" strokeWidth="1.2" />
              <path d="M1 5.5h11" stroke="#94A3B8" strokeWidth="1.2" />
            </svg>
            All major cards
          </span>
          <span className="text-slate-200 select-none">·</span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1.5C3.743 1.5 1.5 3.743 1.5 6.5S3.743 11.5 6.5 11.5 11.5 9.257 11.5 6.5 9.257 1.5 6.5 1.5z" stroke="#94A3B8" strokeWidth="1.2" />
              <path d="M6.5 4v3l1.5 1.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            14-day money-back guarantee
          </span>
        </div>

        <p className="text-center mt-4 text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          All reports include a{" "}
          <span className="font-semibold text-slate-700">14-day money-back guarantee</span>
          . Not satisfied? Email{" "}
          <a href="mailto:support@publicitymaps.com" className="text-[#0066FF] hover:underline">
            support@publicitymaps.com
          </a>{" "}
          for a full refund — no questions asked.
        </p>
      </div>
    </section>
  );
}
