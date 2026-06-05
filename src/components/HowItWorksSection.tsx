"use client";

const STEPS = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0066FF" strokeWidth="1.5" fill="none" />
        <path d="M7 8h10M7 12h7M7 16h5" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Tell Us About Your Business",
    description:
      "Share your business type, service area, and target customer. We use this to calibrate our analysis specifically for your market.",
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#0066FF" strokeWidth="1.5" fill="none" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#0066FF" opacity="0.2" />
        <circle cx="12" cy="12" r="1.5" fill="#0066FF" />
      </svg>
    ),
    title: "We Analyze Traffic, Demographics & Visibility",
    description:
      "We cross-reference traffic counts, homeownership rates, income data, speed limits, competitor density, and sightlines for your area.",
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.134 2 5 5.134 5 9c0 6 7 13 7 13s7-7 7-13c0-3.866-3.134-7-7-7z"
          stroke="#0066FF"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="12" cy="9" r="2.5" stroke="#0066FF" strokeWidth="1.5" fill="#0066FF" fillOpacity="0.1" />
        <rect x="7" y="18" width="10" height="4" rx="1" fill="#0066FF" opacity="0.15" />
        <path d="M8 18h8" stroke="#0066FF" strokeWidth="1" />
      </svg>
    ),
    title: "Receive Your PublicityMap™",
    description:
      "Get a detailed report with ranked locations, Visibility Scores™, traffic data, demographic breakdowns, and placement recommendations.",
  },
  {
    number: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="#00D084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="#00D084" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    title: "Place Signs With Confidence",
    description:
      "Stop guessing. Every dollar you spend on signage now goes to locations you know will deliver maximum visibility and impressions.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-semibold text-[#0066FF] tracking-wide">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-500">
            From business profile to actionable placement map in as little as 24 hours.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {/* Step circle */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-100 flex items-center justify-center group-hover:border-[#0066FF]/30 group-hover:shadow-blue-500/10 transition-all duration-300">
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0066FF] flex items-center justify-center">
                    <span className="text-[9px] font-black text-white">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA below steps */}
        <div className="mt-14 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0066FF] text-white font-semibold text-sm hover:bg-[#0052CC] transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
          >
            Start Your Analysis
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
