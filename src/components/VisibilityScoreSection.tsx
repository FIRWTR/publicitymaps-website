"use client";

import { useEffect, useRef, useState } from "react";

const METRICS = [
  { label: "Vehicle Traffic", value: "18,000/day", icon: "🚗", bar: 90 },
  { label: "Homeowners", value: "71%", icon: "🏠", bar: 71 },
  { label: "Household Income", value: "High", icon: "💰", bar: 85 },
  { label: "Competitor Density", value: "Low", icon: "📊", bar: 20 },
  { label: "Visibility Rating", value: "Excellent", icon: "👁", bar: 95 },
  { label: "Speed Limit", value: "35 mph", icon: "⚡", bar: 75 },
  { label: "Demographics Fit", value: "98%", icon: "🎯", bar: 98 },
  { label: "Customer Fit Score", value: "94/100", icon: "✅", bar: 94 },
];

function ScoreRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<SVGCircleElement>(null);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayed / 100) * circumference;

  useEffect(() => {
    let start: number | null = null;
    const duration = 1800;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
        />
        <circle
          ref={ref}
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#00D084" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-white leading-none">{displayed}</span>
        <span className="text-sm font-medium text-slate-400 mt-0.5">/100</span>
      </div>
    </div>
  );
}

export default function VisibilityScoreSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="visibility-score"
      ref={sectionRef}
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #0066FF 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
            <span className="text-xs font-semibold text-[#00D084] tracking-wide uppercase">
              Proprietary Algorithm
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Introducing the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00A3FF, #00D084)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Visibility Score™
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Every location receives a comprehensive score based on 8 data-driven
            factors — so you always know which spots deliver maximum impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Score display */}
          <div className="flex flex-col items-center">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center w-full max-w-sm mx-auto">
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
                Main St &amp; Oak Ave — Sample Location
              </div>

              {inView && <ScoreRing score={94} />}

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Vehicles/Day", value: "18,000" },
                  { label: "Homeowners", value: "71%" },
                  { label: "Income Tier", value: "High" },
                  { label: "Competition", value: "Low" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 rounded-xl p-3 text-center"
                  >
                    <div className="text-lg font-black text-white">{item.value}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400 font-semibold">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M3 6l4-4 4 4" stroke="#00D084" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Excellent placement opportunity
              </div>
            </div>
          </div>

          {/* Metrics breakdown */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Every score is built from 8 signals
            </h3>
            <div className="space-y-4">
              {METRICS.map((metric, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{metric.icon}</span>
                      <span className="text-sm font-medium text-slate-300">
                        {metric.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {metric.value}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: inView ? `${metric.bar}%` : "0%",
                        background:
                          metric.bar >= 70
                            ? "linear-gradient(90deg, #0066FF, #00D084)"
                            : metric.bar >= 40
                            ? "linear-gradient(90deg, #F59E0B, #FCD34D)"
                            : "linear-gradient(90deg, #EF4444, #F87171)",
                        transition: `width 0.8s ease ${i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
