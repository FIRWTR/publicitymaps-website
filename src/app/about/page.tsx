import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PublicityMaps — Our Mission & Story",
  description:
    "Learn how PublicityMaps is building the future of location intelligence for physical advertising.",
};

const TEAM_VALUES = [
  {
    icon: "🗺️",
    title: "Data Over Guesswork",
    description:
      "Every recommendation we make is grounded in verifiable, real-world data. We don't guess — we measure.",
  },
  {
    icon: "🎯",
    title: "Precision for Small Business",
    description:
      "We believe local businesses deserve the same intelligence that national brands rely on. We level the playing field.",
  },
  {
    icon: "⚡",
    title: "Speed to Insight",
    description:
      "A report that takes two weeks doesn't serve the business owner placing signs this weekend. We move fast.",
  },
  {
    icon: "🔒",
    title: "Accuracy You Can Trust",
    description:
      "Our methodology is continuously validated against real-world performance data. We refine every signal.",
  },
];

const FOUNDERS = [
  {
    name: "Marcus Rowe",
    title: "Co-Founder & CEO",
    bio: "12 years in location intelligence at ESRI and Google Maps Platform, watching SMBs waste millions on intuition-based sign placement. He built PublicityMaps to finally give local businesses the data advantage national brands take for granted.",
    linkedin: "linkedin.com/in/marcusrowe",
    // Brown hair, medium skin
    hairColor: "#5C3317",
    skinTone: "#C68642",
    hairStyle: "short" as const,
    bgColor: "#EFF6FF",
    accentColor: "#0066FF",
  },
  {
    name: "Daniela Cruz",
    title: "Co-Founder & Head of Data Science",
    bio: "PhD in Urban Mobility from UT Austin, previously building traffic prediction models for TXDOT. She leads our Visibility Score™ methodology — turning raw AADT counts and Census data into actionable placement intelligence.",
    linkedin: "linkedin.com/in/danielacruz",
    // Dark hair, warm skin
    hairColor: "#1A0A00",
    skinTone: "#D2956A",
    hairStyle: "long" as const,
    bgColor: "#F0FDF4",
    accentColor: "#00D084",
  },
  {
    name: "Tyler Nash",
    title: "Co-Founder & Head of Product",
    bio: "Former product lead at HubSpot and Yext, obsessed with making complex data feel simple for non-technical business owners. He ensures every report delivers clarity, not confusion.",
    linkedin: "linkedin.com/in/tylernash",
    // Auburn/lighter hair, lighter skin
    hairColor: "#B45309",
    skinTone: "#FAEBD7",
    hairStyle: "curly" as const,
    bgColor: "#FFF7ED",
    accentColor: "#F59E0B",
  },
];

function FounderAvatar({
  hairColor,
  skinTone,
  hairStyle,
}: {
  hairColor: string;
  skinTone: string;
  hairStyle: "short" | "long" | "curly";
}) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      {hairStyle === "short" && (
        <ellipse cx="32" cy="20" rx="18" ry="16" fill={hairColor} />
      )}
      {hairStyle === "long" && (
        <>
          <ellipse cx="32" cy="20" rx="18" ry="16" fill={hairColor} />
          <rect x="13" y="26" width="7" height="20" rx="3.5" fill={hairColor} />
          <rect x="44" y="26" width="7" height="20" rx="3.5" fill={hairColor} />
        </>
      )}
      {hairStyle === "curly" && (
        <>
          <ellipse cx="32" cy="20" rx="19" ry="17" fill={hairColor} />
          <circle cx="15" cy="19" r="7" fill={hairColor} />
          <circle cx="49" cy="19" r="7" fill={hairColor} />
          <circle cx="22" cy="10" r="6" fill={hairColor} />
          <circle cx="42" cy="10" r="6" fill={hairColor} />
          <circle cx="32" cy="8" r="5" fill={hairColor} />
        </>
      )}
      {/* Face */}
      <ellipse cx="32" cy="36" rx="17" ry="19" fill={skinTone} />
      {/* Eyes */}
      <circle cx="25" cy="31" r="2.5" fill="#1E293B" />
      <circle cx="39" cy="31" r="2.5" fill="#1E293B" />
      {/* Eye shine */}
      <circle cx="26.2" cy="29.8" r="1" fill="white" />
      <circle cx="40.2" cy="29.8" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="32" cy="36" rx="2.2" ry="1.4" fill="rgba(0,0,0,0.09)" />
      {/* Smile */}
      <path
        d="M26 41 Q32 45.5 38 41"
        stroke="#94A3B8"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-10"
              style={{ background: "radial-gradient(ellipse, #0066FF 0%, transparent 70%)" }}
            />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
              <span className="text-xs font-semibold text-[#00D084] tracking-wide uppercase">Our Mission</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              The Future of{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0066FF, #00A3FF, #00D084)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Location Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              PublicityMaps is building the intelligence layer for physical advertising — helping
              every business make confident, data-driven decisions about where to put their signs, banners, and campaigns.
            </p>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
                  <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">Why We Built This</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                  Local businesses were flying blind
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We watched landscapers, roofers, and restoration companies spend thousands on signs that sat on low-traffic corners — while a half-mile away, a perfect intersection with 18,000 daily drivers sat empty.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The problem wasn&apos;t the signs. The problem was the data. Big national brands have entire location intelligence teams. Local businesses had nothing.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  PublicityMaps changes that. We built an AI-powered platform that gives any business owner — regardless of size — access to the same traffic data, demographic analysis, and visibility scoring that Fortune 500 marketers use every day.
                </p>
              </div>
              {/* Illustration */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <svg viewBox="0 0 320 240" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Simple city map */}
                  <rect width="320" height="240" fill="#F8FAFC" rx="12" />
                  <g stroke="#E2E8F0" fill="none" strokeWidth="1.5">
                    <line x1="0" y1="80" x2="320" y2="80" strokeWidth="2" />
                    <line x1="0" y1="160" x2="320" y2="160" strokeWidth="2" />
                    <line x1="100" y1="0" x2="100" y2="240" strokeWidth="2" />
                    <line x1="220" y1="0" x2="220" y2="240" strokeWidth="2" />
                  </g>
                  <g fill="#F1F5F9" stroke="#E8EDF3" strokeWidth="0.5">
                    <rect x="2" y="2" width="96" height="76" rx="2" />
                    <rect x="102" y="2" width="116" height="76" rx="2" />
                    <rect x="222" y="2" width="96" height="76" rx="2" />
                    <rect x="2" y="82" width="96" height="76" rx="2" />
                    <rect x="102" y="82" width="116" height="76" rx="2" />
                    <rect x="222" y="82" width="96" height="76" rx="2" />
                    <rect x="2" y="162" width="96" height="76" rx="2" />
                    <rect x="222" y="162" width="96" height="76" rx="2" />
                  </g>
                  {/* Heat zones */}
                  <circle cx="160" cy="80" r="55" fill="rgba(0,208,132,0.15)" />
                  <circle cx="160" cy="80" r="30" fill="rgba(0,208,132,0.2)" />
                  {/* Pins */}
                  <path d="M160 74 C160 74 152 62 152 57 A8 8 0 0 1 168 57 C168 62 160 74 160 74Z" fill="#00D084" stroke="white" strokeWidth="1.5" />
                  <circle cx="160" cy="57" r="3.5" fill="white" />
                  <rect x="168" y="48" width="28" height="14" rx="7" fill="#DCFCE7" stroke="#00D084" strokeWidth="0.8" />
                  <text x="182" y="58" textAnchor="middle" fontSize="7" fontWeight="700" fill="#15803D" fontFamily="Inter">94</text>

                  <path d="M100 76 C100 76 93 65 93 60 A7 7 0 0 1 107 60 C107 65 100 76 100 76Z" fill="#F59E0B" stroke="white" strokeWidth="1.5" />
                  <circle cx="100" cy="60" r="3" fill="white" />

                  <path d="M220 155 C220 155 213 144 213 139 A7 7 0 0 1 227 139 C227 144 220 155 220 155Z" fill="#EF4444" stroke="white" strokeWidth="1.5" />
                  <circle cx="220" cy="139" r="3" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-3.5 py-1.5 mb-4 shadow-sm">
                <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">The People Behind It</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900">Meet the Team</h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                Three domain experts who got tired of watching great businesses make expensive guesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FOUNDERS.map((founder) => (
                <div
                  key={founder.name}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  {/* Avatar header */}
                  <div
                    className="flex items-center justify-center pt-8 pb-6"
                    style={{ backgroundColor: founder.bgColor }}
                  >
                    <div
                      className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md"
                    >
                      <FounderAvatar
                        hairColor={founder.hairColor}
                        skinTone={founder.skinTone}
                        hairStyle={founder.hairStyle}
                      />
                    </div>
                  </div>
                  {/* Info */}
                  <div className="px-5 py-5">
                    <h3 className="font-bold text-slate-900 text-base">{founder.name}</h3>
                    <p
                      className="text-xs font-semibold mb-3 mt-0.5"
                      style={{ color: founder.accentColor }}
                    >
                      {founder.title}
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {founder.bio}
                    </p>
                    <p className="text-xs text-slate-400">{founder.linkedin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900">Our Principles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TEAM_VALUES.map((value) => (
                <div key={value.title} className="bg-slate-50 rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-14">
              {[
                { value: "1,200+", label: "Reports delivered" },
                { value: "48", label: "States covered" },
                { value: "94%", label: "Customer satisfaction" },
                { value: "3.4×", label: "Average ROI improvement" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-black text-[#0066FF] mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Data sources */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-6">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">
                Our Data Sources
              </h3>
              <ul className="space-y-2 mb-4">
                {[
                  "State DOT AADT counts — updated annually",
                  "U.S. Census American Community Survey (5-year estimates)",
                  "Google Maps Platform visibility analysis",
                  "Proprietary competitor database (updated monthly)",
                ].map((source) => (
                  <li key={source} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                    {source}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                Performance stats based on aggregate customer outcomes data, 2023–2025. ROI lift measured against pre-PublicityMaps baseline reported by customers.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0066FF]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to advertise with intelligence?
            </h2>
            <p className="text-blue-200 mb-2">
              Get your first PublicityMap™ report and see exactly where your signs belong.
            </p>
            <p className="text-blue-300 text-sm mb-6 font-medium">
              Try risk-free — 14-day money-back guarantee
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#0066FF] font-bold hover:bg-blue-50 transition-colors shadow-xl"
            >
              Get My Visibility Report
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
