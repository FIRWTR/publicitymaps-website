"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MapIllustration from "./illustrations/MapIllustration";

// Simple SVG face avatars — distinct hair colors/styles
function AvatarFace({
  hairColor,
  skinTone,
  hairStyle,
}: {
  hairColor: string;
  skinTone: string;
  hairStyle: "short" | "long" | "curly" | "bald-top";
}) {
  return (
    <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      {/* Hair back / base layer */}
      {hairStyle === "short" && (
        <ellipse cx="14" cy="9" rx="8" ry="7" fill={hairColor} />
      )}
      {hairStyle === "long" && (
        <>
          <ellipse cx="14" cy="9" rx="8" ry="7" fill={hairColor} />
          <rect x="6" y="12" width="3" height="8" rx="1.5" fill={hairColor} />
          <rect x="19" y="12" width="3" height="8" rx="1.5" fill={hairColor} />
        </>
      )}
      {hairStyle === "curly" && (
        <>
          <ellipse cx="14" cy="9" rx="8.5" ry="7.5" fill={hairColor} />
          <circle cx="7" cy="8" r="3" fill={hairColor} />
          <circle cx="21" cy="8" r="3" fill={hairColor} />
          <circle cx="10" cy="5" r="2.5" fill={hairColor} />
          <circle cx="18" cy="5" r="2.5" fill={hairColor} />
        </>
      )}
      {hairStyle === "bald-top" && (
        <>
          <ellipse cx="14" cy="12" rx="8" ry="6" fill={hairColor} />
          <ellipse cx="14" cy="8" rx="7" ry="4" fill={skinTone} />
        </>
      )}
      {/* Face */}
      <ellipse cx="14" cy="15" rx="7.5" ry="8" fill={skinTone} />
      {/* Eyes */}
      <circle cx="11" cy="13.5" r="1.1" fill="#1E293B" />
      <circle cx="17" cy="13.5" r="1.1" fill="#1E293B" />
      {/* Eye shine */}
      <circle cx="11.5" cy="13" r="0.4" fill="white" />
      <circle cx="17.5" cy="13" r="0.4" fill="white" />
      {/* Smile */}
      <path
        d="M11 17.5 Q14 19.5 17 17.5"
        stroke="#94A3B8"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      {/* Nose */}
      <ellipse cx="14" cy="16" rx="1" ry="0.6" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

const AVATARS = [
  { hairColor: "#8B4513", skinTone: "#FDBCB4", hairStyle: "short" as const },
  { hairColor: "#2C2C2C", skinTone: "#C68642", hairStyle: "curly" as const },
  { hairColor: "#D4A017", skinTone: "#FAEBD7", hairStyle: "long" as const },
  { hairColor: "#4A3728", skinTone: "#D2A679", hairStyle: "bald-top" as const },
];

// Zip code teaser widget
function ZipTeaser() {
  const [zip, setZip] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (zip.trim().length >= 4) setSubmitted(true);
  }

  return (
    <div className="mb-8">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500 shrink-0">
            See top ad locations in your area →
          </span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter your zip code"
            className="w-36 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#0052CC] transition-colors"
          >
            Preview Map
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl shadow-sm px-4 py-3 max-w-sm">
          {/* Mini heat-map suggestion using CSS circles */}
          <div className="relative w-12 h-12 shrink-0">
            <div className="absolute inset-0 rounded-lg bg-slate-100 overflow-hidden">
              <div
                className="absolute"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(0,208,132,0.35)",
                  top: 2,
                  left: 2,
                  filter: "blur(4px)",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "rgba(0,102,255,0.3)",
                  bottom: 4,
                  right: 2,
                  filter: "blur(3px)",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "rgba(0,163,255,0.28)",
                  top: 16,
                  left: 18,
                  filter: "blur(3px)",
                }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 leading-tight">
              Austin Metro
            </p>
            <p className="text-xs text-slate-500">3 high-visibility zones found</p>
          </div>
          <Link
            href="/pricing"
            className="text-xs font-semibold text-[#0066FF] hover:text-[#0052CC] whitespace-nowrap"
          >
            Get Full Report →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-blue-50/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div ref={heroRef}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="text-xs font-semibold text-[#0066FF] tracking-wide">
                Helping Local Businesses Since 2021
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-black leading-[1.08] tracking-tight text-slate-900 mb-6">
              Know Exactly{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #0066FF 0%, #00A3FF 50%, #00D084 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Where To
                <br />
                Advertise
              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-[480px] mb-4">
              We research traffic counts, demographics, homeownership rates,
              and visibility factors so you know exactly where to put your
              signs, banners, vehicle wraps, and yard signs — before you
              spend a dollar.
            </p>

            <p className="text-[15px] italic text-slate-400 mb-8">
              &ldquo;The problem isn&rsquo;t your signs. It&rsquo;s where you&rsquo;re putting them.&rdquo;
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0066FF] text-white font-semibold text-[15px] hover:bg-[#0052CC] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
              >
                Get My Visibility Report
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/example-report"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-[15px] hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 10L6 6l3 3 5-5"
                    stroke="#0066FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="1.5"
                    y="1.5"
                    width="13"
                    height="13"
                    rx="2"
                    stroke="#94A3B8"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
                See Example Report
              </Link>
            </div>

            {/* Phone / human touch */}
            <p className="text-sm text-slate-400 mb-8">
              Questions?{" "}
              <a href="tel:+15125550194" className="text-[#0066FF] font-medium hover:underline">
                Call us at (512) 555-0194
              </a>{" "}
              &mdash; Mon–Fri, 9am–6pm CT
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex -space-x-2">
                {AVATARS.map((avatar, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                  >
                    <AvatarFace
                      hairColor={avatar.hairColor}
                      skinTone={avatar.skinTone}
                      hairStyle={avatar.hairStyle}
                    />
                  </div>
                ))}
              </div>
              <span>
                Used by{" "}
                <strong className="text-slate-700">1,200+ local businesses</strong>{" "}
                across 48 states
              </span>
            </div>
          </div>

          {/* Right column — map */}
          <div className="relative">
            <MapIllustration />

            {/* Floating metric cards */}
            <div className="absolute -left-4 top-1/3 bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-3 min-w-[130px] hidden lg:block">
              <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Daily Traffic
              </div>
              <div className="text-xl font-black text-slate-900 leading-none">
                18,400
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">vehicles/day</div>
              <div className="flex items-center gap-1 mt-1.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 7l3-3 3 3" stroke="#00D084" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[9px] font-medium text-emerald-600">+12% vs avg</span>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-3 min-w-[140px] hidden lg:block">
              <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Homeowners
              </div>
              <div className="text-xl font-black text-slate-900 leading-none">71%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">in this zone</div>
              <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
                <div
                  className="h-1 rounded-full bg-[#0066FF]"
                  style={{ width: "71%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling marquee of brand names */}
        <div className="mt-16 border-t border-slate-100 pt-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-6">
            Built for businesses like yours
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              "Restoration",
              "Landscaping",
              "Roofing",
              "Real Estate",
              "Political Campaigns",
              "Coffee Shops",
              "Events",
              "Food Trucks",
              "Nonprofits",
              "Churches",
            ].map((industry) => (
              <span
                key={industry}
                className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
