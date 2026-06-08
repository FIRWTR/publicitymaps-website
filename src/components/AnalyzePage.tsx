"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const AnalyzeMap = dynamic(() => import("./AnalyzeMap"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", background: "#060d14" }} />,
});

const RADIUS_OPTIONS = [
  { value: 1,  label: "1 mi" },
  { value: 3,  label: "3 mi" },
  { value: 5,  label: "5 mi" },
  { value: 10, label: "10 mi" },
];

const BIZ_OPTIONS = [
  { value: "landscaping",  label: "Landscaping" },
  { value: "roofing",      label: "Roofing" },
  { value: "restoration",  label: "Restoration" },
  { value: "coffee",       label: "Coffee / Café" },
  { value: "events",       label: "Events" },
  { value: "political",    label: "Political" },
  { value: "general",      label: "General / Other" },
];

const TIER_COLOR: Record<string, string> = {
  Excellent: "#4ade80",
  Good:      "#fbbf24",
  Fair:      "#fb923c",
  Limited:   "#f87171",
};

const SCORE_BAR_COLOR = ["#0099ff", "#00cc66", "#fbbf24", "#a78bfa"];
const SCORE_LABELS = ["Traffic", "Income", "Homeownership", "Nearby Businesses"];

type AnalysisResult = {
  success: boolean;
  location: { lat: number; lng: number; displayName: string; shortName: string };
  demographics: {
    medianIncome: number; homeownershipRate: number; population: number;
    medianHomeValue: number; tractName: string;
  } | null;
  roads: {
    motorways: number; trunks: number; primaries: number;
    secondaries: number; tertiaries: number; namedRoads: string[];
  };
  businessCount: number;
  radiusMeters: number;
  radiusMiles: number;
  hasDemographics: boolean;
  analysis: {
    overallScore: number; tier: string; summary: string;
    scores: { traffic: number; income: number; homeownership: number; activity: number };
    recommendations: { priority: string; title: string; detail: string; signType: string }[];
    keyInsights: string[];
    bizProfile: { label: string; topFactor: string; idealCustomer: string; signStrategy: string };
  };
};

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontFamily: "Inter,system-ui,sans-serif" }}>
        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{score}/100</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 5, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${score}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 5,
          transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
    </div>
  );
}

const PRIORITY_COLOR: Record<string, string> = { High: "#f87171", Medium: "#fbbf24", Low: "#94a3b8" };

export default function AnalyzePage() {
  const [address, setAddress]     = useState("");
  const [radius, setRadius]       = useState(3);
  const [bizType, setBizType]     = useState("general");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [result, setResult]       = useState<AnalysisResult | null>(null);
  const [legalOpen, setLegalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim(), radiusMiles: radius, bizType }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Analysis failed");
      setResult(data as AnalysisResult);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const mapCenter = result ? [result.location.lat, result.location.lng] as [number, number] : null;
  const tierColor = result ? (TIER_COLOR[result.analysis.tier] ?? "#94a3b8") : "#94a3b8";
  const scoreArr = result
    ? [result.analysis.scores.traffic, result.analysis.scores.income, result.analysis.scores.homeownership, result.analysis.scores.activity]
    : [];

  return (
    <div className="pm-analyze-layout" style={{ display: "flex", height: "100vh", background: "#060d14", fontFamily: "Inter,system-ui,sans-serif" }}>

      {/* ── Left panel ──────────────────────────────────────────────────────── */}
      <div className="pm-analyze-panel" style={{
        overflowY: "auto", overflowX: "hidden",
        background: "rgba(6,13,20,0.97)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        paddingTop: 72,
        display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ padding: "24px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff6600", boxShadow: "0 0 10px #ff660099" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#ff9900", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Market Intelligence Tool
            </span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#f8fafc", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: 6 }}>
            Analyze Your Market Area
          </h1>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.5, marginBottom: 20 }}>
            Enter any address. We pull real traffic, income, homeownership, and road data to find your best sign placement zones.
          </p>
        </div>

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <form onSubmit={handleAnalyze} style={{ padding: "0 24px 24px" }}>

          {/* Address */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Address or City
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="e.g. 123 Main St, Vancouver, WA"
                required
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "11px 14px 11px 38px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10, color: "#f1f5f9",
                  fontSize: 14, outline: "none",
                  transition: "border-color 0.15s",
                  fontFamily: "inherit",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(255,102,0,0.6)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2C8.686 2 6 4.686 6 8c0 6 6 14 6 14s6-8 6-14c0-3.314-2.686-6-6-6z" />
                <circle cx="12" cy="8" r="2.5" />
              </svg>
            </div>
          </div>

          {/* Business type */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Business Type
            </label>
            <select
              value={bizType}
              onChange={e => setBizType(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10, color: "#f1f5f9",
                fontSize: 14, outline: "none", cursor: "pointer",
                fontFamily: "inherit", appearance: "none",
              }}
            >
              {BIZ_OPTIONS.map(b => (
                <option key={b.value} value={b.value} style={{ background: "#0f172a" }}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Radius */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              Analysis Radius
            </label>
            <div style={{ display: "flex", gap: 6 }}>
              {RADIUS_OPTIONS.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRadius(r.value)}
                  style={{
                    flex: 1, padding: "9px 0",
                    borderRadius: 8,
                    border: radius === r.value ? "1.5px solid #ff6600" : "1.5px solid rgba(255,255,255,0.1)",
                    background: radius === r.value ? "rgba(255,102,0,0.18)" : "rgba(255,255,255,0.04)",
                    color: radius === r.value ? "#ff9900" : "#64748b",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    transition: "all 0.12s ease",
                    fontFamily: "inherit",
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !address.trim()}
            style={{
              width: "100%", padding: "13px 20px",
              borderRadius: 12, border: "none",
              background: loading || !address.trim()
                ? "rgba(255,102,0,0.4)"
                : "linear-gradient(135deg, #ff4400, #ff8800)",
              color: "white", fontSize: 14, fontWeight: 800,
              cursor: loading || !address.trim() ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: loading || !address.trim() ? "none" : "0 8px 28px rgba(255,102,0,0.4)",
              transition: "all 0.2s ease",
              fontFamily: "inherit", letterSpacing: "-0.01em",
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 15, height: 15,
                  border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white",
                  borderRadius: "50%", animation: "spin 0.7s linear infinite",
                }} />
                Pulling live data…
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze This Area
              </>
            )}
          </button>

          {error && (
            <div style={{
              marginTop: 12, padding: "10px 14px",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8, fontSize: 13, color: "#fca5a5",
            }}>
              {error}
            </div>
          )}
        </form>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        {result && (
          <div ref={resultsRef} style={{ padding: "0 24px 24px", animation: "pm-fade-up 0.5s ease both" }}>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />

            {/* Location + overall score */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, color: "#475569", fontWeight: 500, marginBottom: 3 }}>
                  {result.radiusMiles}-mile radius · {BIZ_OPTIONS.find(b => b.value === bizType)?.label}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.3 }}>
                  {result.location.shortName}
                </div>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: tierColor, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {result.analysis.overallScore}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: tierColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {result.analysis.tier}
                </div>
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, marginBottom: 18 }}>
              {result.analysis.summary}
            </p>

            {/* Score bars */}
            <div style={{ marginBottom: 18 }}>
              {scoreArr.map((s, i) => (
                <ScoreBar key={SCORE_LABELS[i]} label={SCORE_LABELS[i]} score={s} color={SCORE_BAR_COLOR[i]} />
              ))}
            </div>

            {/* Business profile card */}
            <div style={{
              background: "rgba(255,102,0,0.07)",
              border: "1px solid rgba(255,102,0,0.2)",
              borderRadius: 10, padding: "12px 14px", marginBottom: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#ff9900", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {result.analysis.bizProfile.label} — Ideal Customer
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.55, margin: "0 0 8px" }}>
                {result.analysis.bizProfile.idealCustomer}
              </p>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 6 }}>
                <svg style={{ flexShrink: 0, marginTop: 1 }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>
                  <strong style={{ color: "#94a3b8" }}>Top factor:</strong> {result.analysis.bizProfile.topFactor}
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                <svg style={{ flexShrink: 0, marginTop: 1 }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2.2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
                <span style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>
                  <strong style={{ color: "#94a3b8" }}>Sign strategy:</strong> {result.analysis.bizProfile.signStrategy}
                </span>
              </div>
            </div>

            {/* Key insights */}
            {result.analysis.keyInsights.length > 0 && (
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: "12px 14px", marginBottom: 18,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Live Data Pulled
                </div>
                {result.analysis.keyInsights.map((ins, i) => (
                  <div key={i} style={{ fontSize: 12, color: "#64748b", marginBottom: i < result.analysis.keyInsights.length - 1 ? 5 : 0, lineHeight: 1.4 }}>
                    · {ins}
                  </div>
                ))}
                {!result.hasDemographics && (
                  <div style={{ fontSize: 11, color: "#374151", marginTop: 6, fontStyle: "italic" }}>
                    Demographic data available for US addresses only.
                  </div>
                )}
              </div>
            )}

            {/* Recommendations */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                Recommendations
              </div>
              {result.analysis.recommendations.map((rec, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10, padding: "12px 14px",
                  marginBottom: 8,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20,
                      background: `${PRIORITY_COLOR[rec.priority]}22`,
                      color: PRIORITY_COLOR[rec.priority],
                      textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>
                      {rec.priority}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{rec.title}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55, margin: "0 0 7px" }}>{rec.detail}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                    <span style={{ fontSize: 11, color: "#475569" }}>{rec.signType}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/pricing"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px 18px", borderRadius: 12,
                background: "linear-gradient(135deg, #ff4400, #ff8800)",
                color: "white", fontSize: 13, fontWeight: 800,
                textDecoration: "none", marginBottom: 24,
                boxShadow: "0 6px 24px rgba(255,102,0,0.4)",
              }}
            >
              Get a Full Custom Report for This Area
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {/* ── Legal disclaimer (collapsible) ───────────────────────────────── */}
        <div style={{ padding: "10px 24px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => setLegalOpen(!legalOpen)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              padding: 0, width: "100%", textAlign: "left",
            }}
          >
            <svg style={{ flexShrink: 0 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#d97706", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Legal Notice
            </span>
            <svg style={{ marginLeft: "auto", transition: "transform 0.2s", transform: legalOpen ? "rotate(180deg)" : "none" }}
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {legalOpen && (
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.6, margin: "0 0 6px" }}>
                Sign placement laws vary by jurisdiction. Before placing any signage, you are responsible for:
              </p>
              <ul style={{ fontSize: 11, color: "#475569", lineHeight: 1.7, margin: "0 0 0 14px", padding: 0 }}>
                <li>Checking local municipal codes, zoning ordinances, and permit requirements</li>
                <li>Verifying HOA rules and obtaining permission from property owners</li>
                <li>Complying with right-of-way restrictions</li>
                <li>Following election sign timing laws if applicable</li>
              </ul>
              <p style={{ fontSize: 11, color: "#374151", lineHeight: 1.5, margin: "6px 0 0", fontStyle: "italic" }}>
                PublicityMaps provides location intelligence only. Data sourced from US Census, OpenStreetMap, and public records.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* ── Map ─────────────────────────────────────────────────────────────── */}
      <div className="pm-analyze-map" style={{ flex: 1, position: "relative" }}>
        <AnalyzeMap
          center={mapCenter}
          radiusMeters={result?.radiusMeters ?? Math.round(radius * 1609.34)}
        />
        {!result && !loading && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}>
            <div style={{
              background: "rgba(6,13,20,0.82)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "20px 28px",
              textAlign: "center",
            }}>
              <svg style={{ margin: "0 auto 10px" }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 2C8.686 2 6 4.686 6 8c0 6 6 14 6 14s6-8 6-14c0-3.314-2.686-6-6-6z" />
                <circle cx="12" cy="8" r="2.5" />
              </svg>
              <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>Enter an address to see your market</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        select option { background: #0f172a; color: #f1f5f9; }
        .pm-analyze-panel { width: 400px; min-width: 320px; flex-shrink: 0; }
        .pm-analyze-map { flex: 1; }
        @media (max-width: 767px) {
          .pm-analyze-layout { flex-direction: column; }
          .pm-analyze-panel { width: 100% !important; min-width: 0 !important; flex-shrink: unset; height: 60vh; }
          .pm-analyze-map { flex: none; height: 40vh; }
        }
      `}</style>
    </div>
  );
}
