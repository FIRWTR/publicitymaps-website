import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #0066FF 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0066FF] shadow-2xl shadow-blue-500/40 mb-8">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4C10.477 4 6 8.477 6 14c0 7.5 10 16 10 16s10-8.5 10-16c0-5.523-4.477-10-10-10z"
              fill="white"
            />
            <circle cx="16" cy="14" r="4" fill="#0066FF" />
          </svg>
        </div>

        <h2 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-[1.08]">
          Stop Guessing Where{" "}
          <br className="hidden sm:block" />
          <span
            style={{
              background: "linear-gradient(135deg, #0066FF, #00A3FF, #00D084)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            To Advertise
          </span>
        </h2>

        <p className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
          Get your PublicityMap™ today and put every sign, banner, and wrapped vehicle in a location that drives real results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0066FF] text-white font-bold text-base hover:bg-[#0052CC] transition-all duration-200 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            Get My Visibility Report
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/example-report"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
          >
            View Example Report
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 mb-8">
          {[
            "One-time purchase, no subscription",
            "14-day money-back guarantee",
            "Delivered within 24 hours",
          ].map((trust) => (
            <div key={trust} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l3 3 7-6" stroke="#00D084" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{trust}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-500">
          Prefer to talk first?{" "}
          <a href="tel:+15125550194" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            Call us at (512) 555-0194
          </a>{" "}
          &mdash; Mon–Fri, 9am–6pm CT
        </p>
      </div>
    </section>
  );
}
