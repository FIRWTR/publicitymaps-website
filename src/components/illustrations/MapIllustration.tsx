"use client";

import { useEffect, useState } from "react";

type Pin = {
  x: number;
  y: number;
  score: number;
  label: string;
  color: "green" | "yellow" | "red";
};

const PINS: Pin[] = [
  { x: 52, y: 38, score: 94, label: "Main & Oak", color: "green" },
  { x: 30, y: 58, score: 87, label: "5th Ave", color: "green" },
  { x: 70, y: 62, score: 78, label: "Commerce Blvd", color: "yellow" },
  { x: 45, y: 72, score: 72, label: "River Rd", color: "yellow" },
  { x: 18, y: 35, score: 51, label: "Industrial Dr", color: "red" },
  { x: 80, y: 30, score: 63, label: "Park Lane", color: "yellow" },
];

function useAnimatedPins() {
  const [visible, setVisible] = useState<number[]>([]);
  useEffect(() => {
    PINS.forEach((_, i) => {
      setTimeout(() => setVisible((prev) => [...prev, i]), 400 + i * 300);
    });
  }, []);
  return visible;
}

export default function MapIllustration() {
  const visiblePins = useAnimatedPins();

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Map background */}
        <rect width="400" height="300" fill="#F8FAFC" />

        {/* Grid / block pattern (city blocks) */}
        <g stroke="#E2E8F0" strokeWidth="1" fill="none">
          {/* Horizontal roads */}
          <line x1="0" y1="60" x2="400" y2="60" strokeWidth="2" stroke="#E8EDF3" />
          <line x1="0" y1="120" x2="400" y2="120" strokeWidth="3" stroke="#DDE3EC" />
          <line x1="0" y1="170" x2="400" y2="170" strokeWidth="2" stroke="#E8EDF3" />
          <line x1="0" y1="230" x2="400" y2="230" strokeWidth="2" stroke="#E8EDF3" />
          {/* Vertical roads */}
          <line x1="80" y1="0" x2="80" y2="300" strokeWidth="2" stroke="#E8EDF3" />
          <line x1="160" y1="0" x2="160" y2="300" strokeWidth="3" stroke="#DDE3EC" />
          <line x1="240" y1="0" x2="240" y2="300" strokeWidth="2" stroke="#E8EDF3" />
          <line x1="320" y1="0" x2="320" y2="300" strokeWidth="2" stroke="#E8EDF3" />
        </g>

        {/* City blocks (subtle fills) */}
        <g fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5">
          <rect x="82" y="62" width="76" height="56" rx="2" />
          <rect x="162" y="62" width="76" height="56" rx="2" />
          <rect x="242" y="62" width="76" height="56" rx="2" />
          <rect x="82" y="122" width="76" height="46" rx="2" />
          <rect x="162" y="122" width="76" height="46" rx="2" />
          <rect x="242" y="122" width="76" height="46" rx="2" />
          <rect x="82" y="172" width="76" height="56" rx="2" />
          <rect x="162" y="172" width="76" height="56" rx="2" />
          <rect x="242" y="172" width="76" height="56" rx="2" />
          <rect x="2" y="62" width="76" height="56" rx="2" />
          <rect x="2" y="172" width="76" height="56" rx="2" />
          <rect x="322" y="62" width="76" height="56" rx="2" />
          <rect x="322" y="172" width="76" height="56" rx="2" />
        </g>

        {/* Heat zones */}
        {/* Green zone — high visibility */}
        <ellipse cx="208" cy="114" rx="70" ry="55" fill="rgba(0,208,132,0.12)" />
        <ellipse cx="208" cy="114" rx="45" ry="35" fill="rgba(0,208,132,0.18)" />
        {/* Yellow zone */}
        <ellipse cx="120" cy="175" rx="55" ry="45" fill="rgba(250,204,21,0.12)" />
        <ellipse cx="120" cy="175" rx="32" ry="28" fill="rgba(250,204,21,0.16)" />
        {/* Yellow zone 2 */}
        <ellipse cx="280" cy="155" rx="50" ry="40" fill="rgba(250,204,21,0.10)" />
        {/* Red zone */}
        <ellipse cx="52" cy="108" rx="40" ry="32" fill="rgba(239,68,68,0.10)" />

        {/* Roads with dashed center lines */}
        <line x1="0" y1="120" x2="400" y2="120" stroke="#DDE3EC" strokeWidth="3" />
        <line
          x1="0"
          y1="120"
          x2="400"
          y2="120"
          stroke="#CBD5E1"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line x1="160" y1="0" x2="160" y2="300" stroke="#DDE3EC" strokeWidth="3" />
        <line
          x1="160"
          y1="0"
          x2="160"
          y2="300"
          stroke="#CBD5E1"
          strokeWidth="1"
          strokeDasharray="8 6"
        />

        {/* Traffic flow arrows on main roads */}
        <g fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.6">
          <path d="M40 117 L55 117 M52 114 L55 117 L52 120" />
          <path d="M100 117 L115 117 M112 114 L115 117 L112 120" />
          <path d="M200 117 L215 117 M212 114 L215 117 L212 120" />
          <path d="M300 117 L315 117 M312 114 L315 117 L312 120" />
          <path d="M157 40 L157 55 M154 52 L157 55 L160 52" />
          <path d="M157 160 L157 175 M154 172 L157 175 L160 172" />
          <path d="M157 230 L157 245 M154 242 L157 245 L160 242" />
        </g>

        {/* Location pins */}
        {PINS.map((pin, i) => {
          const visible = visiblePins.includes(i);
          const cx = (pin.x / 100) * 400;
          const cy = (pin.y / 100) * 300;
          const pinColor =
            pin.color === "green"
              ? "#00D084"
              : pin.color === "yellow"
              ? "#F59E0B"
              : "#EF4444";
          const bgColor =
            pin.color === "green"
              ? "#DCFCE7"
              : pin.color === "yellow"
              ? "#FEF9C3"
              : "#FEE2E2";
          const textColor =
            pin.color === "green"
              ? "#15803D"
              : pin.color === "yellow"
              ? "#92400E"
              : "#991B1B";

          return (
            <g
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: `translateY(${visible ? 0 : 8}px)`,
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {/* Pulse ring */}
              {visible && pin.color === "green" && (
                <circle
                  cx={cx}
                  cy={cy - 12}
                  r="10"
                  fill="none"
                  stroke={pinColor}
                  strokeWidth="1.5"
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values="8;16;8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Pin body */}
              <path
                d={`M${cx} ${cy - 2} C${cx} ${cy - 2} ${cx - 9} ${cy - 18} ${cx - 9} ${cy - 22} A9 9 0 0 1 ${cx + 9} ${cy - 22} C${cx + 9} ${cy - 18} ${cx} ${cy - 2} ${cx} ${cy - 2}Z`}
                fill={pinColor}
                stroke="white"
                strokeWidth="1.5"
              />
              <circle cx={cx} cy={cy - 22} r="4" fill="white" />

              {/* Score label */}
              <rect
                x={cx + 12}
                y={cy - 30}
                width="36"
                height="16"
                rx="8"
                fill={bgColor}
                stroke={pinColor}
                strokeWidth="1"
              />
              <text
                x={cx + 30}
                y={cy - 19}
                textAnchor="middle"
                fontSize="7"
                fontWeight="700"
                fill={textColor}
                fontFamily="Inter, sans-serif"
              >
                {pin.score}
              </text>
            </g>
          );
        })}

        {/* Compass rose */}
        <g transform="translate(365, 25)" opacity="0.5">
          <circle cx="0" cy="0" r="10" fill="white" stroke="#E2E8F0" strokeWidth="1" />
          <text x="0" y="-4" textAnchor="middle" fontSize="5" fill="#64748B" fontFamily="Inter" fontWeight="600">N</text>
          <path d="M0 -2 L1 2 L0 1 L-1 2 Z" fill="#0066FF" />
        </g>
      </svg>

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm p-2.5 flex gap-3">
        {[
          { color: "#00D084", label: "High" },
          { color: "#F59E0B", label: "Mid" },
          { color: "#EF4444", label: "Low" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] font-medium text-slate-600">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Top score card */}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm p-2.5">
        <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
          Top Location
        </div>
        <div className="text-xs font-bold text-slate-900">Main &amp; Oak</div>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="text-base font-black text-[#00D084] leading-none">94</div>
          <div className="text-[9px] text-slate-400 leading-tight">
            /100<br />score
          </div>
        </div>
      </div>
    </div>
  );
}
