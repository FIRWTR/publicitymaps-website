const COMPARISONS = [
  {
    traditional: "Guesswork and gut feelings",
    publicitymaps: "Data-driven decisions from 8+ signals",
  },
  {
    traditional: "Expensive mistakes that don't perform",
    publicitymaps: "Know before you spend a single dollar",
  },
  {
    traditional: "Limited or no performance reporting",
    publicitymaps: "Actionable intelligence and ranked locations",
  },
  {
    traditional: "One-size-fits-all placements",
    publicitymaps: "Custom analysis for your specific customer",
  },
  {
    traditional: "Months of trial and error",
    publicitymaps: "Optimized strategy in as little as 24 hours",
  },
  {
    traditional: "Ignore competitor saturation",
    publicitymaps: "Map competitor density in real time",
  },
];

const STATS = [
  {
    value: "3.4×",
    label: "Avg. lift in sign ROI",
    footnote: "*Avg. reported by customers vs. pre-use baseline",
  },
  {
    value: "94%",
    label: "Accuracy rate on top-ranked locations",
    footnote: "*Top-ranked locations, measured 2023–2025",
  },
  {
    value: "24hr",
    label: "Delivery on standard reports",
    footnote: "Standard reports. Business Growth: same-day.",
  },
  {
    value: "1,200+",
    label: "Businesses analyzed to date",
    footnote: "*Unique businesses, 48 U.S. states",
  },
];

export default function WhySection() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
            <span className="text-xs font-semibold text-[#00D084] tracking-wide uppercase">
              The Difference
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Traditional Advertising vs. PublicityMaps
          </h2>
          <p className="text-lg text-slate-400">
            Stop throwing money at locations that might work. Use data that tells you which ones will.
          </p>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto mb-16">
          {/* Table header */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-2xl p-4 text-center">
              <div className="inline-flex items-center gap-2 text-slate-400">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2L2 5v7h10V5L7 2z" stroke="#64748B" strokeWidth="1.5" />
                </svg>
                <span className="text-sm font-semibold">Traditional Advertising</span>
              </div>
            </div>
            <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-2xl p-4 text-center">
              <div className="inline-flex items-center gap-2 text-[#0066FF]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C3.686 1 1 3.686 1 7c0 4.5 6 8 6 8s6-3.5 6-8c0-3.314-2.686-6-6-6z" fill="#0066FF" />
                  <circle cx="7" cy="7" r="2" fill="white" />
                </svg>
                <span className="text-sm font-semibold">PublicityMaps</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {COMPARISONS.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                {/* Traditional */}
                <div className="bg-slate-800/40 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 2l6 6M8 2L2 8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-400">{row.traditional}</span>
                </div>
                {/* PublicityMaps */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#00D084" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-200 font-medium">{row.publicitymaps}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-4xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #0066FF, #00A3FF, #00D084)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
              <div className="text-[10px] text-slate-500 mt-1 leading-snug">{stat.footnote}</div>
            </div>
          ))}
        </div>

        {/* Methodology footnote */}
        <p className="text-[11px] text-slate-500 text-center max-w-2xl mx-auto mt-6 italic">
          *Performance data based on aggregate outcomes reported by PublicityMaps customers 2023–2025. Individual results vary based on business type, market, and sign creative. Full methodology available on request.
        </p>
      </div>
    </section>
  );
}
