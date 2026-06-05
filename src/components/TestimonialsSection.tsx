const TESTIMONIALS = [
  {
    id: "jake",
    name: "Jake Whitmore",
    title: "Owner",
    business: "Whitmore Restoration",
    city: "Dallas, TX",
    industry: "Restoration",
    industryColor: "bg-blue-50 text-blue-600",
    quote:
      "I spent two summers guessing where to put signs after hail storms. First season using PublicityMaps I identified three intersections I never would have tried. My call volume went up 40% the following month. The $299 report paid for itself about ten times over.",
    stars: 5,
    avatarBg: "#0066FF",
    avatarInitials: "JW",
  },
  {
    id: "maria",
    name: "Maria Espinoza",
    title: "Owner",
    business: "Verde Lawn & Landscape",
    city: "Phoenix, AZ",
    industry: "Landscaping",
    industryColor: "bg-green-50 text-green-600",
    quote:
      "The map showed me an intersection two blocks from my shop I'd driven past a thousand times without really seeing. 18,000 cars a day, 73% homeowners. I put a sign there on a Friday — had three estimates booked by Monday.",
    stars: 5,
    avatarBg: "#00D084",
    avatarInitials: "ME",
  },
  {
    id: "derek",
    name: "Derek Okafor",
    title: "Campaign Manager",
    business: "Okafor for City Council",
    city: "Columbus, OH",
    industry: "Political Campaign",
    industryColor: "bg-red-50 text-red-600",
    quote:
      "We used PublicityMaps to place 200 campaign yard signs across three precincts. The targeted placement approach helped us win a district we'd lost by 8 points two years prior. Data-driven politics works.",
    stars: 5,
    avatarBg: "#DC2626",
    avatarInitials: "DO",
  },
  {
    id: "brittney",
    name: "Brittney Hale",
    title: "Owner",
    business: "Summit Roofing",
    city: "Denver, CO",
    industry: "Roofing",
    industryColor: "bg-amber-50 text-amber-600",
    quote:
      "I was skeptical at first — it's a yard sign, not a rocket launch. But the visibility score breakdown changed how I think about every sign dollar I spend. Now I don't place anything without running it through a report first.",
    stars: 5,
    avatarBg: "#D97706",
    avatarInitials: "BH",
  },
  {
    id: "andre",
    name: "Andre Fontaine",
    title: "Owner",
    business: "The Morning Pull Coffee",
    city: "Nashville, TN",
    industry: "Coffee Shop",
    industryColor: "bg-orange-50 text-orange-600",
    quote:
      "Food businesses live and die by foot traffic. The report identified two corridors near my shop with the highest commuter density in my zip code. My weekend walk-in traffic went up noticeably after I switched to those locations.",
    stars: 5,
    avatarBg: "#EA580C",
    avatarInitials: "AF",
  },
  {
    id: "tamara",
    name: "Tamara Reid",
    title: "Executive Director",
    business: "Eastside Family Nonprofit",
    city: "Atlanta, GA",
    industry: "Nonprofit",
    industryColor: "bg-purple-50 text-purple-600",
    quote:
      "We have a tiny advertising budget. PublicityMaps helped us stretch every sign dollar toward the neighborhoods where our target families actually live. The demographic overlay data is exactly what a nonprofit needs.",
    stars: 5,
    avatarBg: "#7C3AED",
    avatarInitials: "TR",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44L2 4.632l3.455-.502L7 1z"
            fill="#F59E0B"
            stroke="#F59E0B"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function Avatar({
  bg,
  initials,
}: {
  bg: string;
  initials: string;
}) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: bg }}
    >
      <span className="text-white text-xs font-bold tracking-wide">{initials}</span>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">
              Customer Stories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-500 mb-5">
            Real businesses. Real results. Real intersections.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#0066FF] rounded-full px-4 py-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44L2 4.632l3.455-.502L7 1z"
                fill="white"
                strokeWidth="0"
              />
            </svg>
            <span className="text-xs font-bold text-white tracking-wide">
              50+ verified reviews
            </span>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/60 hover:-translate-y-0.5 transition-all duration-300 p-6 flex flex-col"
            >
              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 pt-5 border-t border-slate-100">
                <Avatar bg={t.avatarBg} initials={t.avatarInitials} />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t.title}, {t.business}
                  </div>
                  <div className="text-xs text-slate-400">{t.city}</div>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.industryColor}`}
                  >
                    {t.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom aggregate rating row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-5">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44L2 4.632l3.455-.502L7 1z"
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
          <span className="text-slate-700 font-semibold text-sm">
            Average rating{" "}
            <span className="text-slate-900 font-black">4.9/5</span> across{" "}
            <span className="text-slate-900 font-black">50+ reviews</span>
          </span>
          <span className="hidden sm:block text-slate-300">|</span>
          <span className="text-xs text-slate-400">
            Verified customer reviews from multiple platforms
          </span>
        </div>
      </div>
    </section>
  );
}
