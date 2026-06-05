import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Example Report — PublicityMaps",
  description:
    "See a full sample PublicityMap™ Visibility Report — including ranked locations, traffic data, demographics, and sign recommendations.",
};

const SAMPLE_LOCATIONS = [
  {
    rank: 1,
    name: "Main St & Oak Ave",
    address: "Main Street & Oak Avenue",
    score: 94,
    traffic: "18,400",
    homeowners: "71%",
    income: "High ($95K+)",
    competition: "Low (2 competitors)",
    speed: "35 mph",
    signType: "Yard Sign / Banner",
    impressions: "552,000",
    tier: "green",
    color: "#00D084",
    bg: "#DCFCE7",
    textColor: "#15803D",
    note: "Highest traffic intersection in target zone. Excellent sightlines from both approach directions. Low competitor saturation.",
  },
  {
    rank: 2,
    name: "5th Ave & Commerce Blvd",
    address: "5th Avenue & Commerce Boulevard",
    score: 89,
    traffic: "15,200",
    homeowners: "68%",
    income: "High ($88K+)",
    competition: "Low (1 competitor)",
    speed: "35 mph",
    signType: "Vehicle Wrap Route",
    impressions: "456,000",
    tier: "green",
    color: "#00D084",
    bg: "#DCFCE7",
    textColor: "#15803D",
    note: "Strong residential corridor. Ideal for vehicle wrap routes on Tuesday–Saturday mornings.",
  },
  {
    rank: 3,
    name: "River Parkway N",
    address: "River Parkway North at Oak Creek Bridge",
    score: 82,
    traffic: "12,800",
    homeowners: "64%",
    income: "Mid-High ($72K+)",
    competition: "Moderate (4 competitors)",
    speed: "45 mph",
    signType: "Large Banner / Stake Sign",
    impressions: "384,000",
    tier: "green",
    color: "#00D084",
    bg: "#DCFCE7",
    textColor: "#15803D",
    note: "High traffic but higher speed limit — use larger sign format (3x4 ft minimum) for maximum readability.",
  },
  {
    rank: 4,
    name: "Park Boulevard",
    address: "Park Boulevard & Lincoln Way",
    score: 71,
    traffic: "9,400",
    homeowners: "58%",
    income: "Mid ($61K+)",
    competition: "Moderate (3 competitors)",
    speed: "30 mph",
    signType: "Yard Sign",
    impressions: "282,000",
    tier: "yellow",
    color: "#F59E0B",
    bg: "#FEF9C3",
    textColor: "#92400E",
    note: "Solid secondary location. Lower homeownership rate reduces ideal customer density but still worthwhile.",
  },
  {
    rank: 5,
    name: "Pine St & 3rd Ave",
    address: "Pine Street & 3rd Avenue",
    score: 66,
    traffic: "7,100",
    homeowners: "54%",
    income: "Mid ($58K+)",
    competition: "Moderate (5 competitors)",
    speed: "25 mph",
    signType: "Yard Sign",
    impressions: "213,000",
    tier: "yellow",
    color: "#F59E0B",
    bg: "#FEF9C3",
    textColor: "#92400E",
    note: "Acceptable location if budget allows. Saturation is higher — differentiate with strong creative.",
  },
];

export default function ExampleReportPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Report Header */}
        <div className="bg-slate-950 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#0066FF] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1C3.791 1 2 2.791 2 5c0 3 4 7 4 7s4-4 4-7c0-2.209-1.791-4-4-4z" fill="white" />
                      <circle cx="6" cy="5" r="1.5" fill="#0066FF" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-xs font-medium">PublicityMaps™</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">Visibility Report</h1>
                <p className="text-slate-400 text-sm mt-1">
                  Sample: Restoration Company — Southeast Austin, TX — {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#00D084]">94</div>
                  <div className="text-xs text-slate-400">Top Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">5</div>
                  <div className="text-xs text-slate-400">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">1.9M</div>
                  <div className="text-xs text-slate-400">Est. Mo. Impressions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary bar */}
        <div className="bg-[#0066FF]/5 border-b border-blue-100 py-3 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-6 text-sm">
            {[
              { label: "Business Type", value: "Restoration" },
              { label: "Target Area", value: "Southeast Austin, TX" },
              { label: "Radius Analyzed", value: "15 miles" },
              { label: "Locations Reviewed", value: "47" },
              { label: "Top Locations Returned", value: "5" },
            ].map((item) => (
              <div key={item.label}>
                <span className="text-slate-400">{item.label}: </span>
                <span className="font-semibold text-slate-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Location cards */}
          <h2 className="text-xl font-black text-slate-900 mb-6">Ranked Locations</h2>

          <div className="space-y-6">
            {SAMPLE_LOCATIONS.map((loc) => (
              <div
                key={loc.rank}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  {/* Rank sidebar */}
                  <div
                    className="w-1 flex-shrink-0 self-stretch"
                    style={{ backgroundColor: loc.color }}
                  />
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-8 h-8 rounded-xl bg-[#0066FF] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-black text-white">{loc.rank}</span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900">{loc.name}</h3>
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: loc.bg, color: loc.textColor }}
                          >
                            {loc.tier === "green" ? "Best" : "Moderate"} Visibility
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 ml-11 mb-3">{loc.address}</p>
                        <p className="text-sm text-slate-600 ml-11 leading-relaxed italic border-l-2 border-slate-200 pl-3">
                          {loc.note}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-center ml-11 sm:ml-0 bg-slate-50 rounded-xl p-4 min-w-[100px]">
                        <div
                          className="text-4xl font-black"
                          style={{ color: loc.color }}
                        >
                          {loc.score}
                        </div>
                        <div className="text-xs text-slate-400">/100 Score</div>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
                      {[
                        { label: "Daily Traffic", value: loc.traffic + "/day" },
                        { label: "Homeowners", value: loc.homeowners },
                        { label: "Avg Income", value: loc.income },
                        { label: "Competition", value: loc.competition },
                        { label: "Speed Limit", value: loc.speed },
                        { label: "Mo. Impressions", value: loc.impressions },
                      ].map((m) => (
                        <div key={m.label} className="bg-slate-50 rounded-xl p-3">
                          <div className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">{m.label}</div>
                          <div className="text-xs font-bold text-slate-800">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-slate-400">Recommended sign:</span>
                      <span className="text-xs font-semibold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-full">
                        {loc.signType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Methodology */}
          <div className="mt-12 bg-slate-50 rounded-2xl border border-slate-100 p-6">
            <h2 className="text-lg font-black text-slate-900 mb-4">Methodology</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              This report was generated using the PublicityMaps Visibility Score™ algorithm, which synthesizes the following data sources and signals:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                "State DOT traffic counts",
                "U.S. Census ACS data",
                "Homeownership rates",
                "Household income",
                "Posted speed limits",
                "Physical sightline analysis",
                "Competitor sign density",
                "Customer profile matching",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#00D084" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#0066FF] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-2">
              Ready for your custom report?
            </h2>
            <p className="text-blue-100 mb-5">
              Get your own PublicityMap™ tailored to your business, service area, and target customer.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0066FF] font-bold hover:bg-blue-50 transition-colors shadow-xl"
            >
              Get My Visibility Report
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
