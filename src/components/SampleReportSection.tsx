const LOCATIONS = [
  { rank: 1, name: "Main St & Oak Ave", score: 94, traffic: "18,400", impressions: "552,000", type: "Yard Sign / Banner", color: "#00D084" },
  { rank: 2, name: "5th Ave & Commerce Blvd", score: 89, traffic: "15,200", impressions: "456,000", type: "Vehicle Wrap Route", color: "#00D084" },
  { rank: 3, name: "River Parkway N", score: 82, traffic: "12,800", impressions: "384,000", type: "Banner / Stake Sign", color: "#00D084" },
  { rank: 4, name: "Park Boulevard", score: 71, traffic: "9,400", impressions: "282,000", type: "Yard Sign", color: "#F59E0B" },
  { rank: 5, name: "Pine St & 3rd Ave", score: 66, traffic: "7,100", impressions: "213,000", type: "Yard Sign", color: "#F59E0B" },
];

export default function SampleReportSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">
              Report Preview
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            What You&apos;ll Receive
          </h2>
          <p className="text-lg text-slate-500">
            A comprehensive, downloadable PublicityMap™ report with everything you need to place signs that work.
          </p>
        </div>

        {/* Report preview card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-100/50 overflow-hidden">
            {/* Report header */}
            <div className="bg-slate-950 px-8 py-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#0066FF] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1C3.791 1 2 2.791 2 5c0 3 4 7 4 7s4-4 4-7c0-2.209-1.791-4-4-4z" fill="white" />
                      <circle cx="6" cy="5" r="1.5" fill="#0066FF" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-sm">PublicityMaps</span>
                </div>
                <h3 className="text-white text-xl font-black">Visibility Report</h3>
                <p className="text-slate-400 text-xs mt-0.5">Restoration Company — Southeast Austin, TX</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-[#00D084]">94</div>
                <div className="text-xs text-slate-400">Top Location Score</div>
                <div className="mt-2 inline-flex items-center gap-1 bg-emerald-500/10 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                  <span className="text-[10px] font-semibold text-emerald-400">5 Locations Ranked</span>
                </div>
              </div>
            </div>

            {/* Location table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    {["Rank", "Location", "Score", "Daily Traffic", "Est. Impressions/Mo", "Sign Type"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LOCATIONS.map((loc) => (
                    <tr key={loc.rank} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="w-6 h-6 rounded-lg bg-[#0066FF] flex items-center justify-center">
                          <span className="text-[10px] font-black text-white">{loc.rank}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: loc.color }} />
                          <span className="text-sm font-semibold text-slate-800">{loc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-base font-black" style={{ color: loc.color }}>{loc.score}</span>
                        <span className="text-xs text-slate-400">/100</span>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-slate-700">{loc.traffic}</td>
                      <td className="px-4 py-3.5 text-sm font-medium text-slate-700">{loc.impressions}</td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-semibold text-[#0066FF]">
                          {loc.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Report footer */}
            <div className="px-8 py-5 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Includes: Traffic data, demographics, homeownership rates, income analysis, and competitor saturation.
              </div>
              <a
                href="/example-report"
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-semibold hover:bg-[#0052CC] transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v7M3 5l3 3 3-3M2 10h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                See Full Example Report
              </a>
            </div>
          </div>

          {/* What's included */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: "📍", label: "Top Locations", desc: "Ranked by Visibility Score™" },
              { icon: "🚗", label: "Traffic Counts", desc: "Daily vehicle data per location" },
              { icon: "👥", label: "Demographics", desc: "Income, homeownership, age" },
              { icon: "🎯", label: "Sign Types", desc: "Recommended placement format" },
              { icon: "📊", label: "Impressions Est.", desc: "Monthly estimated exposures" },
              { icon: "📥", label: "PDF Download", desc: "Shareable with your team" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 p-3.5 shadow-sm">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
