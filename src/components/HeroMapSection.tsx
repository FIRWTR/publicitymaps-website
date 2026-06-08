"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { BizType, LayerKey } from "@/data/heroLocations";
import { HERO_LOCATIONS } from "@/data/heroLocations";

const HeroMapLeaflet = dynamic(() => import("./HeroMapLeaflet"), {
  ssr: false,
  loading: () => <div className="h-full w-full" style={{ background: "#060d14" }} />,
});

// ── Config ────────────────────────────────────────────────────────────────────
const BIZ_TYPES: { key: BizType; label: string; icon: string }[] = [
  { key: "landscaping",  label: "Landscaping",  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { key: "roofing",      label: "Roofing",      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { key: "restoration",  label: "Restoration",  icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { key: "coffee",       label: "Coffee Shop",  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { key: "events",       label: "Events",       icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { key: "political",    label: "Political",    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
];

const LAYERS: { key: LayerKey; label: string; desc: string; icon: string }[] = [
  { key: "opportunity",  label: "Opportunity",  desc: "Best ad locations",  icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { key: "traffic",      label: "Traffic",      desc: "Daily vehicle flow", icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4" },
  { key: "competition",  label: "Competition",  desc: "Competitor density", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7" },
  { key: "income",       label: "Income",       desc: "Household income",   icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" },
  { key: "growth",       label: "Growth",       desc: "Future projections", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
];

const LAYER_BADGE_COLOR: Record<LayerKey, string> = {
  opportunity: "#ff6600",
  traffic:     "#0099ff",
  competition: "#bb00ff",
  income:      "#00cc66",
  growth:      "#00cccc",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroMapSection() {
  const [bizType, setBizType] = useState<BizType>("landscaping");
  const [layer,   setLayer]   = useState<LayerKey>("opportunity");
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.65);

  async function handleAnalyze() {
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setAnalyzing(false);
    setAnalyzed(true);
  }

  function handleLocClick(id: number) {
    const loc = HERO_LOCATIONS.find((l) => l.id === id);
    if (!loc) return;
    setActiveId(id);
    setFlyTarget([...loc.coords] as [number, number]);
  }

  const topLocs = [...HERO_LOCATIONS]
    .sort((a, b) => b.weights[bizType] - a.weights[bizType])
    .slice(0, 7);

  const avgScore = Math.round(
    HERO_LOCATIONS.reduce((s, l) => s + Math.round(l.weights[bizType] * 100), 0) /
    HERO_LOCATIONS.length
  );

  return (
    <section style={{ height: "100vh", position: "relative", overflow: "hidden", background: "#060d14" }}>

      {/* ── Map fills entire hero ──────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <HeroMapLeaflet
          bizType={bizType}
          layer={layer}
          showPins={analyzed}
          activeId={activeId}
          flyTarget={flyTarget}
          onPinClick={(id) => setActiveId((prev) => (prev === id ? null : id))}
          heatmapOpacity={heatmapOpacity}
        />
      </div>

      {/* Top gradient for navbar readability */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(to bottom, rgba(6,13,20,0.85) 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Bottom gradient for card readability */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
        background: "linear-gradient(to top, rgba(6,13,20,0.7) 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* ── PRE-ANALYZE: centered glass card ──────────────────────── */}
      {!analyzed && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "80px 16px 32px",
        }}>
          <div style={{
            background: "rgba(6,13,20,0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 24,
            padding: "36px 36px 32px",
            maxWidth: 520,
            width: "100%",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            animation: "pm-fade-up 0.7s ease both",
          }}>

            {/* Badge */}
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:20 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#ff6600", boxShadow:"0 0 10px #ff660099", animation:"pm-flicker 2s ease-in-out infinite" }} />
              <span style={{ fontSize:11, fontWeight:600, color:"#ff9900", letterSpacing:"0.08em", textTransform:"uppercase" }}>
                Live Market Intelligence · Clark County, WA
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: "#f8fafc",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}>
              Find Where Your<br />
              <span style={{ color: "#ff6600" }}>Next Customers</span> Live.
            </h1>
            <p style={{ fontSize:14, color:"#64748b", marginBottom:24, lineHeight:1.5 }}>
              Select your business type and see every high-opportunity zone in your market — in seconds.
            </p>

            {/* Business type pills */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
              {BIZ_TYPES.map((b) => (
                <button
                  key={b.key}
                  onClick={() => setBizType(b.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 14px", borderRadius: 40,
                    border: bizType === b.key ? "1.5px solid #ff6600" : "1.5px solid rgba(255,255,255,0.12)",
                    background: bizType === b.key ? "rgba(255,102,0,0.15)" : "rgba(255,255,255,0.04)",
                    color: bizType === b.key ? "#ff9900" : "#94a3b8",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: bizType === b.key ? "0 0 16px rgba(255,102,0,0.25)" : "none",
                    fontFamily: "Inter,system-ui,sans-serif",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={b.icon} />
                  </svg>
                  {b.label}
                </button>
              ))}
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: 14,
                border: "none",
                background: analyzing
                  ? "linear-gradient(135deg, #cc4400, #ff6600)"
                  : "linear-gradient(135deg, #ff4400, #ff8800)",
                color: "white",
                fontSize: 15,
                fontWeight: 800,
                cursor: analyzing ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: "0 8px 32px rgba(255,102,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
                transition: "all 0.2s ease",
                fontFamily: "Inter,system-ui,sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {analyzing ? (
                <>
                  <div style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Scanning market data…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Analyze Market
                </>
              )}
            </button>

            {/* Social proof */}
            <p style={{ fontSize:12, color:"#475569", textAlign:"center", marginTop:16 }}>
              Used by <strong style={{ color:"#64748b" }}>1,200+ local businesses</strong> across 48 states
            </p>
          </div>
        </div>
      )}

      {/* ── POST-ANALYZE: slim top bar ─────────────────────────────── */}
      {analyzed && (
        <div
          style={{
            position: "absolute", top: 72, left: 16, right: 16, zIndex: 20,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 12, flexWrap: "wrap",
            animation: "pm-fade-up 0.5s ease both",
          }}
        >
          {/* Business type selector (slim) */}
          <div style={{
            display: "flex", gap: 6,
            background: "rgba(6,13,20,0.82)",
            backdropFilter: "blur(16px)",
            borderRadius: 50,
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "5px 8px",
          }}>
            {BIZ_TYPES.map((b) => (
              <button
                key={b.key}
                onClick={() => setBizType(b.key)}
                style={{
                  padding: "5px 12px", borderRadius: 40,
                  border: "none",
                  background: bizType === b.key ? "rgba(255,102,0,0.25)" : "transparent",
                  color: bizType === b.key ? "#ff9900" : "#64748b",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "Inter,system-ui,sans-serif",
                  boxShadow: bizType === b.key ? "0 0 12px rgba(255,102,0,0.2)" : "none",
                }}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Stats chip */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(6,13,20,0.82)",
            backdropFilter: "blur(16px)",
            borderRadius: 50,
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "6px 14px",
            fontSize: 12, color: "#94a3b8",
            fontFamily: "Inter,system-ui,sans-serif",
          }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#ff6600", boxShadow:"0 0 8px #ff660099", animation:"pm-flicker 2s ease-in-out infinite" }} />
            <span style={{ color:"#ff9900", fontWeight:700 }}>{HERO_LOCATIONS.length} zones</span>
            <span>&bull; Avg score</span>
            <span style={{ color:"#4ade80", fontWeight:700 }}>{avgScore}/100</span>
          </div>
        </div>
      )}

      {/* ── Heatmap intensity slider (bottom-right, post-analyze) ──── */}
      {analyzed && (
        <div
          style={{
            position: "absolute", right: 16, bottom: 100, zIndex: 20,
            background: "rgba(6,13,20,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 14,
            padding: "10px 14px 11px",
            width: 192,
            animation: "pm-slide-right 0.5s ease 0.4s both",
          }}
        >
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 8,
            fontFamily: "Inter,system-ui,sans-serif",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Heat
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#ff9900", letterSpacing: "-0.02em" }}>
              {Math.round(heatmapOpacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0} max={100} step={1}
            value={Math.round(heatmapOpacity * 100)}
            onChange={(e) => setHeatmapOpacity(Number(e.target.value) / 100)}
            className="pm-heat-slider"
            style={{
              background: `linear-gradient(to right, #ff6600 0%, #ff6600 ${Math.round(heatmapOpacity * 100)}%, rgba(255,255,255,0.12) ${Math.round(heatmapOpacity * 100)}%, rgba(255,255,255,0.12) 100%)`,
            }}
          />
        </div>
      )}

      {/* ── Layer toggles (right side, post-analyze) ──────────────── */}
      {analyzed && (
        <div
          style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
            zIndex: 20,
            display: "flex", flexDirection: "column", gap: 6,
            animation: "pm-slide-right 0.5s ease 0.2s both",
          }}
        >
          {LAYERS.map((l) => {
            const active = layer === l.key;
            const c = LAYER_BADGE_COLOR[l.key];
            return (
              <button
                key={l.key}
                onClick={() => setLayer(l.key)}
                title={l.desc}
                style={{
                  width: 44, height: 44,
                  borderRadius: 12,
                  border: active ? `1.5px solid ${c}` : "1.5px solid rgba(255,255,255,0.10)",
                  background: active ? `rgba(${hexToRgb(c)},0.2)` : "rgba(6,13,20,0.82)",
                  backdropFilter: "blur(12px)",
                  color: active ? c : "#475569",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s ease",
                  boxShadow: active ? `0 0 16px rgba(${hexToRgb(c)},0.4)` : "none",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={l.icon} />
                </svg>
              </button>
            );
          })}
          {/* Layer label */}
          <div style={{
            marginTop: 4, textAlign: "center",
            fontSize: 9, fontWeight: 600, color: "#475569", letterSpacing:"0.06em",
            fontFamily:"Inter,system-ui,sans-serif", textTransform:"uppercase",
          }}>
            {LAYERS.find(l => l.key === layer)?.label}
          </div>
        </div>
      )}

      {/* ── Top locations panel (right side, post-analyze) ─────────── */}
      {analyzed && (
        <div
          style={{
            position: "absolute", right: 72, top: 130, zIndex: 20,
            width: 240,
            background: "rgba(6,13,20,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            overflow: "hidden",
            animation: "pm-slide-right 0.5s ease 0.1s both",
            display: "none", // shown via class below
          }}
          className="pm-locations-panel"
        >
          <div style={{ padding:"12px 14px 8px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em" }}>
              Top Locations
            </div>
          </div>
          {topLocs.map((loc, i) => {
            const score = Math.round(loc.weights[bizType] * 100);
            const color = score >= 80 ? "#4ade80" : score >= 60 ? "#fbbf24" : "#f87171";
            const isActive = activeId === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleLocClick(loc.id)}
                style={{
                  width:"100%", padding:"8px 14px",
                  display:"flex", alignItems:"center", gap:10,
                  border:"none",
                  background: isActive ? "rgba(255,102,0,0.1)" : "transparent",
                  cursor:"pointer", textAlign:"left",
                  borderBottom: i < topLocs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transition:"all 0.12s ease",
                  fontFamily:"Inter,system-ui,sans-serif",
                }}
              >
                <div style={{
                  width:22, height:22, borderRadius:"50%",
                  background: color === "#4ade80" ? "rgba(22,163,74,0.25)" : color === "#fbbf24" ? "rgba(217,119,6,0.25)" : "rgba(220,38,38,0.25)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:10, fontWeight:800, color, flexShrink:0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:"#e2e8f0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{loc.name}</div>
                  <div style={{ fontSize:10, color:"#475569" }}>{loc.area}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:800, color, flexShrink:0 }}>{score}</span>
              </button>
            );
          })}
          <div style={{ padding:"10px 14px" }}>
            <Link
              href="/pricing"
              style={{
                display:"block", textAlign:"center", padding:"8px",
                borderRadius:10, background:"rgba(255,102,0,0.15)",
                border:"1px solid rgba(255,102,0,0.3)",
                color:"#ff9900", fontSize:11, fontWeight:700,
                textDecoration:"none", transition:"all 0.15s ease",
                fontFamily:"Inter,system-ui,sans-serif",
              }}
            >
              Get My Full Report →
            </Link>
          </div>
        </div>
      )}

      {/* ── Bottom metric chips ────────────────────────────────────── */}
      {analyzed && (
        <div
          style={{
            position: "absolute", bottom: 32, left: 16,
            zIndex: 20,
            display: "flex", gap: 10, flexWrap: "wrap",
            animation: "pm-fade-up 0.5s ease 0.3s both",
          }}
        >
          {[
            { label: "Population Reach", value: "412,000+", color: "#0099ff" },
            { label: "Daily Traffic",    value: "1.2M+",    color: "#ff6600" },
            { label: "Avg Score",        value: `${avgScore}/100`, color: "#4ade80" },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                background: "rgba(6,13,20,0.82)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "8px 14px",
                fontFamily: "Inter,system-ui,sans-serif",
              }}
            >
              <div style={{ fontSize:10, color:"#475569", fontWeight:500, marginBottom:2 }}>{m.label}</div>
              <div style={{ fontSize:16, fontWeight:800, color:m.color, letterSpacing:"-0.02em" }}>{m.value}</div>
            </div>
          ))}

          <Link
            href="/pricing"
            style={{
              display:"flex", alignItems:"center", gap:8,
              background:"linear-gradient(135deg, #ff4400, #ff8800)",
              borderRadius:12, padding:"8px 18px",
              color:"white", fontSize:13, fontWeight:800,
              textDecoration:"none",
              boxShadow:"0 8px 24px rgba(255,102,0,0.5)",
              fontFamily:"Inter,system-ui,sans-serif",
              letterSpacing:"-0.01em",
              animation:"pm-flicker 4s ease-in-out infinite",
            }}
          >
            Get My Custom Report
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      {!analyzed && (
        <div style={{
          position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)",
          zIndex:20, display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          animation:"pm-fade-up 1s ease 1s both",
          pointerEvents:"none",
        }}>
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"Inter,sans-serif" }}>Scroll to explore</span>
          <div style={{ width:1, height:24, background:"linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      )}

      {/* Inline style for spin animation + panel visibility */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 900px) { .pm-locations-panel { display: block !important; } }
      `}</style>
    </section>
  );
}

// helper
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
