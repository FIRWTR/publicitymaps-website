const INDUSTRIES = [
  {
    name: "Restoration",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L4 10v14h20V10L14 4z" stroke="#0066FF" strokeWidth="1.5" fill="#EBF3FF" />
        <rect x="10" y="17" width="8" height="7" stroke="#0066FF" strokeWidth="1.5" fill="none" />
        <path d="M10 12h8" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="11" r="1.5" fill="#0066FF" />
      </svg>
    ),
    color: "#EBF3FF",
    desc: "Target homeowners in storm-hit areas",
  },
  {
    name: "Landscaping",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 22V14M14 14C14 14 8 10 8 5a6 6 0 0 1 12 0c0 5-6 9-6 9z" stroke="#00D084" strokeWidth="1.5" strokeLinecap="round" fill="#DCFCE7" />
        <path d="M8 22h12" stroke="#00D084" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#DCFCE7",
    desc: "Reach residential neighborhoods",
  },
  {
    name: "Roofing",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14L14 4l10 10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#FEF9C3" />
        <rect x="7" y="14" width="14" height="8" stroke="#F59E0B" strokeWidth="1.5" fill="#FEF9C3" />
        <line x1="14" y1="14" x2="14" y2="22" stroke="#F59E0B" strokeWidth="1" />
      </svg>
    ),
    color: "#FEF9C3",
    desc: "Find high homeownership zones",
  },
  {
    name: "Real Estate",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="12" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="#EDE9FE" />
        <rect x="14" y="8" width="10" height="14" stroke="#8B5CF6" strokeWidth="1.5" fill="#EDE9FE" />
        <line x1="2" y1="22" x2="26" y2="22" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#EDE9FE",
    desc: "Dominate farm areas and listings",
  },
  {
    name: "Political Campaigns",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="#EF4444" strokeWidth="1.5" fill="#FEE2E2" />
        <path d="M4 12h20" stroke="#EF4444" strokeWidth="1" />
        <path d="M8 16h4M8 18h6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="21" cy="5" r="3" fill="#EF4444" />
        <path d="M18 5h-4" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    color: "#FEE2E2",
    desc: "Place yard signs where voters live",
  },
  {
    name: "Coffee Shops",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 11h16l-2 10H8L6 11z" stroke="#92400E" strokeWidth="1.5" fill="#FEF3C7" />
        <path d="M20 13h2a2 2 0 0 1 0 4h-2" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M10 7c0-2 2-2 2-4M14 7c0-2 2-2 2-4" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#FEF3C7",
    desc: "Find high foot-traffic corridors",
  },
  {
    name: "Events",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="7" width="20" height="18" rx="2" stroke="#0066FF" strokeWidth="1.5" fill="#EBF3FF" />
        <line x1="4" y1="12" x2="24" y2="12" stroke="#0066FF" strokeWidth="1.5" />
        <line x1="10" y1="4" x2="10" y2="10" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="4" x2="18" y2="10" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="17" r="1.5" fill="#0066FF" />
        <circle cx="14" cy="17" r="1.5" fill="#0066FF" />
        <circle cx="18" cy="17" r="1.5" fill="#0066FF" />
      </svg>
    ),
    color: "#EBF3FF",
    desc: "Maximize signage for event day traffic",
  },
  {
    name: "Food Trucks",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="11" width="20" height="10" rx="2" stroke="#00A3FF" strokeWidth="1.5" fill="#CCEEFF" />
        <rect x="18" y="9" width="8" height="12" rx="2" stroke="#00A3FF" strokeWidth="1.5" fill="#CCEEFF" />
        <circle cx="8" cy="22" r="2.5" stroke="#00A3FF" strokeWidth="1.5" fill="white" />
        <circle cx="20" cy="22" r="2.5" stroke="#00A3FF" strokeWidth="1.5" fill="white" />
        <path d="M6 11V8a3 3 0 0 1 6 0v3" stroke="#00A3FF" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    color: "#CCEEFF",
    desc: "Scout high-lunch-traffic intersections",
  },
];

export default function IndustriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN — editorial text + industry tags */}
          <div className="w-full lg:w-[40%] flex-shrink-0 border-l-4 border-[#0066FF] pl-6 lg:pl-8">
            <p className="text-xs font-semibold text-[#0066FF] tracking-widest uppercase mb-4">
              Who It&apos;s For
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-6">
              Built for the businesses that build your community.
            </h2>

            {/* Industry pill tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {INDUSTRIES.map((industry) => (
                <span
                  key={industry.name}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200 bg-slate-50 hover:border-[#0066FF]/40 hover:bg-blue-50 hover:text-[#0066FF] transition-colors cursor-default"
                >
                  {industry.name}
                </span>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className="text-slate-500 text-sm leading-relaxed italic border-t border-slate-100 pt-6">
              &ldquo;Whether you&apos;re fixing roofs, running for office, or serving morning coffee — your signs deserve better placement.&rdquo;
            </blockquote>

            <p className="text-center mt-8 text-sm text-slate-400">
              Don&apos;t see your industry?{" "}
              <a href="/contact" className="text-[#0066FF] font-medium hover:underline">
                We work with any local business →
              </a>
            </p>
          </div>

          {/* RIGHT COLUMN — industry cards grid */}
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {INDUSTRIES.map((industry) => (
                <div
                  key={industry.name}
                  className="group bg-white rounded-2xl border border-slate-100 p-5 hover:border-[#0066FF]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: industry.color }}
                  >
                    {industry.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{industry.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
