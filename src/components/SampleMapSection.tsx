"use client";

import { useState } from "react";

type Zone = {
  id: string;
  label: string;
  tier: "green" | "yellow" | "red";
  score: number;
  traffic: string;
  address: string;
  cx: number;
  cy: number;
};

const ZONES: Zone[] = [
  { id: "z1", label: "Main & Oak", tier: "green", score: 94, traffic: "18,400/day", address: "Main St & Oak Ave", cx: 52, cy: 36 },
  { id: "z2", label: "5th & Commerce", tier: "green", score: 89, traffic: "15,200/day", address: "5th Ave & Commerce Blvd", cx: 28, cy: 56 },
  { id: "z3", label: "River Pkwy", tier: "green", score: 82, traffic: "12,800/day", address: "River Parkway N", cx: 70, cy: 26 },
  { id: "z4", label: "Park Blvd", tier: "yellow", score: 71, traffic: "9,400/day", address: "Park Boulevard", cx: 78, cy: 58 },
  { id: "z5", label: "Pine & 3rd", tier: "yellow", score: 66, traffic: "7,100/day", address: "Pine St & 3rd Ave", cx: 42, cy: 72 },
  { id: "z6", label: "Industrial Dr", tier: "red", score: 48, traffic: "3,200/day", address: "Industrial Drive", cx: 16, cy: 32 },
  { id: "z7", label: "Back Rd", tier: "red", score: 38, traffic: "1,800/day", address: "Old Back Road", cx: 85, cy: 80 },
];

const TIER_COLORS = {
  green: { fill: "rgba(0,208,132,0.15)", stroke: "#00D084", pin: "#00D084", bg: "#DCFCE7", text: "#15803D", label: "Best Visibility" },
  yellow: { fill: "rgba(245,158,11,0.12)", stroke: "#F59E0B", pin: "#F59E0B", bg: "#FEF9C3", text: "#92400E", label: "Moderate Visibility" },
  red: { fill: "rgba(239,68,68,0.10)", stroke: "#EF4444", pin: "#EF4444", bg: "#FEE2E2", text: "#991B1B", label: "Poor Visibility" },
};

export default function SampleMapSection() {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);

  return (
    <section id="sample-map" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">
              Interactive Demo
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            See Your Market At A Glance
          </h2>
          <p className="text-lg text-slate-500">
            Every PublicityMap™ shows you exactly which zones to target and which to avoid — color-coded for instant clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-100/50 bg-[#F8FAFC]">
              {/* Map header bar */}
              <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-slate-500 font-medium">PublicityMap™ — Sample Report</span>
                </div>
                <span className="text-[10px] text-slate-400">7 locations analyzed</span>
              </div>

              {/* SVG Map */}
              <div className="relative">
                <svg viewBox="0 0 400 280" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="400" height="280" fill="#F8FAFC" />

                  {/* Street grid */}
                  <g stroke="#E2E8F0" fill="none">
                    <line x1="0" y1="56" x2="400" y2="56" strokeWidth="2" />
                    <line x1="0" y1="112" x2="400" y2="112" strokeWidth="3" />
                    <line x1="0" y1="168" x2="400" y2="168" strokeWidth="2" />
                    <line x1="0" y1="224" x2="400" y2="224" strokeWidth="2" />
                    <line x1="80" y1="0" x2="80" y2="280" strokeWidth="2" />
                    <line x1="160" y1="0" x2="160" y2="280" strokeWidth="3" />
                    <line x1="240" y1="0" x2="240" y2="280" strokeWidth="2" />
                    <line x1="320" y1="0" x2="320" y2="280" strokeWidth="2" />
                  </g>

                  {/* City blocks */}
                  <g fill="#F1F5F9" stroke="#E8EDF3" strokeWidth="0.5">
                    {[
                      [82, 58, 76, 52], [162, 58, 76, 52], [242, 58, 76, 52], [322, 58, 76, 52],
                      [2, 58, 76, 52], [82, 114, 76, 52], [162, 114, 76, 52], [242, 114, 76, 52],
                      [322, 114, 76, 52], [2, 114, 76, 52], [82, 170, 76, 52], [162, 170, 76, 52],
                      [242, 170, 76, 52], [322, 170, 76, 52],
                    ].map(([x, y, w, h], i) => (
                      <rect key={i} x={x} y={y} width={w} height={h} rx="2" />
                    ))}
                  </g>

                  {/* Zone heat overlays */}
                  {ZONES.map((zone) => {
                    const colors = TIER_COLORS[zone.tier];
                    const cx = (zone.cx / 100) * 400;
                    const cy = (zone.cy / 100) * 280;
                    const r = zone.tier === "green" ? 48 : zone.tier === "yellow" ? 38 : 28;
                    return (
                      <g key={zone.id}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill={colors.fill}
                          style={{ cursor: "pointer" }}
                          onClick={() => setActiveZone(zone === activeZone ? null : zone)}
                        />
                        {activeZone?.id === zone.id && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={r + 4}
                            fill="none"
                            stroke={colors.stroke}
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                            opacity="0.7"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Road labels */}
                  <text x="200" y="109" textAnchor="middle" fontSize="6" fill="#94A3B8" fontFamily="Inter" fontWeight="500">Main Street</text>
                  <text x="158" y="140" textAnchor="middle" fontSize="6" fill="#94A3B8" fontFamily="Inter" fontWeight="500" transform="rotate(-90 158 140)">Commerce Blvd</text>

                  {/* Location pins */}
                  {ZONES.map((zone) => {
                    const colors = TIER_COLORS[zone.tier];
                    const cx = (zone.cx / 100) * 400;
                    const cy = (zone.cy / 100) * 280;
                    const isActive = activeZone?.id === zone.id;
                    return (
                      <g
                        key={zone.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveZone(zone === activeZone ? null : zone)}
                      >
                        {/* Pin shadow */}
                        <ellipse cx={cx} cy={cy + 2} rx="5" ry="2" fill="rgba(0,0,0,0.1)" />
                        {/* Pin body */}
                        <path
                          d={`M${cx} ${cy - 1} C${cx} ${cy - 1} ${cx - 7} ${cy - 13} ${cx - 7} ${cy - 17} A7 7 0 0 1 ${cx + 7} ${cy - 17} C${cx + 7} ${cy - 13} ${cx} ${cy - 1} ${cx} ${cy - 1}Z`}
                          fill={isActive ? colors.pin : colors.pin}
                          stroke="white"
                          strokeWidth="1.5"
                          style={{
                            filter: isActive ? `drop-shadow(0 0 6px ${colors.pin}80)` : "none",
                            transform: isActive ? "scale(1.3)" : "scale(1)",
                            transformOrigin: `${cx}px ${cy}px`,
                            transition: "transform 0.2s ease",
                          }}
                        />
                        <circle cx={cx} cy={cy - 17} r="3" fill="white" />
                        {/* Score badge */}
                        <rect x={cx + 9} y={cy - 24} width="22" height="12" rx="6" fill="white" stroke={colors.stroke} strokeWidth="0.8" />
                        <text x={cx + 20} y={cy - 15} textAnchor="middle" fontSize="6" fontWeight="700" fill={colors.text} fontFamily="Inter, sans-serif">
                          {zone.score}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Active zone popup */}
                {activeZone && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 min-w-[200px] z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {activeZone.address}
                      </span>
                      <button onClick={() => setActiveZone(null)} className="text-slate-300 hover:text-slate-500 text-xs">✕</button>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <span
                        className="text-3xl font-black"
                        style={{ color: TIER_COLORS[activeZone.tier].pin }}
                      >
                        {activeZone.score}
                      </span>
                      <span className="text-sm text-slate-400 pb-1">/100 Visibility Score</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>🚗 {activeZone.traffic}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span
                        className="font-semibold"
                        style={{ color: TIER_COLORS[activeZone.tier].text }}
                      >
                        {TIER_COLORS[activeZone.tier].label}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Legend + zone list */}
          <div className="space-y-4">
            {/* Legend */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Zone Legend</h3>
              {(["green", "yellow", "red"] as const).map((tier) => {
                const c = TIER_COLORS[tier];
                return (
                  <div key={tier} className="flex items-center gap-3 mb-2.5">
                    <div
                      className="w-4 h-4 rounded-full border-2"
                      style={{ backgroundColor: c.fill, borderColor: c.pin }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{c.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location list */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3">All Locations</h3>
              <div className="space-y-2">
                {[...ZONES].sort((a, b) => b.score - a.score).map((zone) => {
                  const c = TIER_COLORS[zone.tier];
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZone(zone === activeZone ? null : zone)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.pin }} />
                        <span className="text-xs font-medium text-slate-700">{zone.label}</span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: c.pin }}>{zone.score}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href="/pricing"
              className="block w-full text-center px-4 py-3 rounded-xl bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#0052CC] transition-colors shadow-lg shadow-blue-500/20"
            >
              Get My Map →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
