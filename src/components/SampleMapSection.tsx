"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { MapLocation } from "./MapLeaflet";

const MapLeaflet = dynamic(() => import("./MapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400">Loading map…</span>
      </div>
    </div>
  ),
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_LOCATIONS: MapLocation[] = [
  {
    id: 1, rank: 1,
    name: "NE 179th St & 72nd Ave",
    area: "Battle Ground Corridor",
    coords: [45.7635, -122.5580],
    score: 94, traffic: "26,800/day",
    signType: "Large yard signs + banners",
    customerFit: "Excellent — high homeownership, median income $82K",
    action: "Deploy 4×8 banners facing southbound NE 179th traffic",
    zone: "high", routeType: "Retail Corridor",
    categories: ["all","home-services","signs","landscaping"],
  },
  {
    id: 2, rank: 2,
    name: "NE 139th St & I-5 Exit 9",
    area: "Salmon Creek",
    coords: [45.7263, -122.683],
    score: 91, traffic: "31,200/day",
    signType: "High-visibility roadside",
    customerFit: "Strong — commuter corridor, 72% homeowners nearby",
    action: "Place signs visible from I-5 off-ramp approach",
    zone: "high", routeType: "Commuter Route",
    categories: ["all","vehicle-routes","signs","landscaping","restoration"],
  },
  {
    id: 3, rank: 3,
    name: "NE 219th St & SR 503",
    area: "Brush Prairie",
    coords: [45.7820, -122.5321],
    score: 89, traffic: "18,400/day",
    signType: "Yard signs + A-frames",
    customerFit: "Strong — rural residential, large lot homeowners",
    action: "Yard sign blitz along SR 503 before weekend traffic",
    zone: "high", routeType: "Retail Corridor",
    categories: ["all","home-services","signs","landscaping","political"],
  },
  {
    id: 4, rank: 4,
    name: "SE 164th Ave & Mill Plain",
    area: "Vancouver East",
    coords: [45.627, -122.545],
    score: 87, traffic: "28,400/day",
    signType: "Large-format banner",
    customerFit: "Excellent — high homeownership, median income $78K",
    action: "4×8 banner facing westbound Mill Plain traffic",
    zone: "high", routeType: "Commuter Route",
    categories: ["all","home-services","signs","restoration","events"],
  },
  {
    id: 5, rank: 5,
    name: "NE 117th St & 63rd Ave",
    area: "Orchards",
    coords: [45.659, -122.573],
    score: 85, traffic: "14,100/day",
    signType: "Vehicle wrap + yard signs",
    customerFit: "Good — dense residential, growing families",
    action: "Brand service trucks on NE 117th daily route",
    zone: "high", routeType: "Retail Corridor",
    categories: ["all","vehicle-routes","home-services","landscaping"],
  },
  {
    id: 6, rank: 6,
    name: "SE 192nd Ave & SR-14",
    area: "Camas Gateway",
    coords: [45.588, -122.406],
    score: 84, traffic: "19,800/day",
    signType: "Directional signs",
    customerFit: "Good — affluent suburb, avg household income $95K",
    action: "Directional signs pointing toward service area on SR-14",
    zone: "high", routeType: "Commuter Route",
    categories: ["all","home-services","signs","restoration"],
  },
  {
    id: 7, rank: 7,
    name: "NW 119th St & 10th Ave",
    area: "Ridgefield",
    coords: [45.815, -122.740],
    score: 83, traffic: "9,600/day",
    signType: "Yard signs",
    customerFit: "Good — fast-growing suburb, new homeowners",
    action: "Saturate NW 119th with yard signs — low competition",
    zone: "medium", routeType: "Retail Corridor",
    categories: ["all","home-services","political","landscaping"],
  },
  {
    id: 8, rank: 8,
    name: "NE Fourth Plain Blvd",
    area: "Hazel Dell",
    coords: [45.68, -122.668],
    score: 82, traffic: "22,100/day",
    signType: "Yard signs + vehicle wrap",
    customerFit: "Strong — dense residential, 68% homeowners",
    action: "Deploy yard signs at 3 key intersections before weekend",
    zone: "medium", routeType: "Retail Corridor",
    categories: ["all","home-services","political","signs","landscaping"],
  },
  {
    id: 9, rank: 9,
    name: "NE 78th St & 182nd Ave",
    area: "Hazel Dell North",
    coords: [45.704, -122.610],
    score: 80, traffic: "11,300/day",
    signType: "A-frame signs",
    customerFit: "Moderate-good — established residential, moderate income",
    action: "A-frames at key intersections on weekend mornings",
    zone: "medium", routeType: "Commuter Route",
    categories: ["all","home-services","signs","events"],
  },
  {
    id: 10, rank: 10,
    name: "SE 34th St & 192nd Ave",
    area: "Fisher's Landing",
    coords: [45.604, -122.504],
    score: 79, traffic: "17,500/day",
    signType: "A-frame + yard signs",
    customerFit: "Good — newer development, growing families",
    action: "Target weekend retail traffic with A-frame signage",
    zone: "medium", routeType: "Retail Corridor",
    categories: ["all","home-services","signs","landscaping","events"],
  },
];

const BUSINESS_TYPES = [
  { key: "all",         label: "All Businesses" },
  { key: "landscaping", label: "Landscaping" },
  { key: "home-services", label: "Home Services" },
  { key: "restoration", label: "Restoration" },
  { key: "signs",       label: "Sign Companies" },
  { key: "vehicle-routes", label: "Vehicle Routes" },
  { key: "political",   label: "Political Campaign" },
  { key: "events",      label: "Events" },
];

const GOALS: Record<string, string> = {
  "all":           "Maximize Visibility",
  "landscaping":   "More Residential Leads",
  "home-services": "More Service Calls",
  "restoration":   "Storm-Hit Neighborhoods",
  "signs":         "High-Traffic Corridors",
  "vehicle-routes":"Commuter Exposure",
  "political":     "Voter Outreach",
  "events":        "Maximize Foot Traffic",
};

const SIGN_TYPES: Record<string, string> = {
  "all":           "Yard Signs & Banners",
  "landscaping":   "Yard Signs & Banners",
  "home-services": "Yard Signs & Vehicle Wraps",
  "restoration":   "Yard Signs & Storm Banners",
  "signs":         "Large-Format Banners",
  "vehicle-routes":"Vehicle Wraps & Magnetics",
  "political":     "Yard Signs & Door Hangers",
  "events":        "Banners & A-Frames",
};

const NAV_ITEMS = [
  { key: "overview",     label: "Overview",        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { key: "heatmap",      label: "Heat Map",         icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
  { key: "locations",    label: "Top Locations",    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  { key: "traffic",      label: "Traffic Analysis", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { key: "demographics", label: "Demographics",     icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { key: "competition",  label: "Competition",      icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { key: "recommendations", label: "Recommendations", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { key: "saved",        label: "Saved Reports",    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400">
      <path d="M4 5.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dropdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col min-w-[140px]">
      <span className="text-[10px] text-slate-400 font-medium mb-0.5">{label}</span>
      <div className="flex items-center gap-1.5 cursor-pointer">
        <span className="text-sm font-semibold text-slate-800">{value}</span>
        <ChevronIcon />
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function SampleMapSection() {
  const [activeNav, setActiveNav] = useState("heatmap");
  const [businessType, setBusinessType] = useState("landscaping");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [mapTab, setMapTab] = useState<"heatmap" | "traffic" | "satellite">("heatmap");

  const visible = ALL_LOCATIONS.filter((l) => l.categories.includes(businessType));
  const ranked = [...visible].sort((a, b) => b.score - a.score).slice(0, 10);

  const avgScore = Math.round(visible.reduce((s, l) => s + l.score, 0) / visible.length);
  const totalTraffic = visible.reduce((s, l) => s + parseInt(l.traffic.replace(/\D/g, "")), 0);
  const highPct = Math.round((visible.filter(l => l.zone === "high").length / visible.length) * 100);
  const medPct = Math.round((visible.filter(l => l.zone === "medium").length / visible.length) * 100);
  const lowPct = 100 - highPct - medPct;

  function handleLocationClick(loc: MapLocation) {
    setActiveId(loc.id);
    setFlyTarget([...loc.coords] as [number, number]);
    setActiveNav("heatmap");
  }

  return (
    <section id="sample-map" className="py-16 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Section label */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">
              Interactive Demo — Clark County, WA
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
            See What Your Report Looks Like
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Switch the business type dropdown. Click any pin or ranked location. Your real report covers your actual service area.
          </p>
        </div>

        {/* Dashboard frame */}
        <div className="rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/70 overflow-hidden bg-white">

          {/* ── Top bar ───────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white gap-4 flex-wrap">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-[#0066FF] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1C4.686 1 2 3.686 2 7c0 4.2 6 9 6 9s6-4.8 6-9c0-3.314-2.686-6-6-6z" fill="white" />
                  <circle cx="8" cy="7" r="2.2" fill="#0066FF" />
                </svg>
              </div>
              <span className="font-bold text-sm text-slate-900">
                Publicity<span className="text-[#0066FF]">Maps</span>
              </span>
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* Business Type — functional */}
              <div className="flex flex-col min-w-[140px]">
                <span className="text-[10px] text-slate-400 font-medium mb-0.5">Business Type</span>
                <div className="flex items-center gap-1.5">
                  <select
                    value={businessType}
                    onChange={(e) => { setBusinessType(e.target.value); setActiveId(null); }}
                    className="text-sm font-semibold text-slate-800 bg-transparent border-none outline-none cursor-pointer pr-1 appearance-none"
                  >
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt.key} value={bt.key}>{bt.label}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-slate-100" />
              <Dropdown label="Goal" value={GOALS[businessType] ?? "Maximize Visibility"} />
              <div className="hidden sm:block w-px h-8 bg-slate-100" />
              <Dropdown label="Location" value="Clark County, WA" />
            </div>

            {/* CTA */}
            <Link
              href="/pricing"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] text-white text-sm font-bold hover:bg-[#0052CC] transition-colors shadow-sm shadow-blue-500/20"
            >
              Get My Custom PublicityMap
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* ── Body ──────────────────────────────────────────────────── */}
          <div className="flex" style={{ height: 620 }}>

            {/* Left nav */}
            <div className="hidden lg:flex flex-col w-52 border-r border-slate-100 bg-white shrink-0">
              <nav className="flex-1 py-3 space-y-0.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveNav(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors rounded-none ${
                        isActive
                          ? "bg-blue-50 text-[#0066FF] border-r-2 border-[#0066FF]"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      }`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <path d={item.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Upsell card */}
              <div className="m-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-xs font-bold text-slate-800 mb-1">Want Your Full Report?</p>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  Get a complete visibility analysis with exact locations, traffic data, demographics, and recommendations.
                </p>
                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#0066FF] text-white text-xs font-bold hover:bg-[#0052CC] transition-colors"
                >
                  Get My Report
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Map area */}
            <div className="flex-1 relative flex flex-col min-w-0">

              {/* Map tabs */}
              <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-100 bg-white shrink-0">
                {(["heatmap","traffic","satellite"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setMapTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                      mapTab === tab
                        ? "bg-slate-100 text-slate-800"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {tab === "heatmap" ? "Heat Map" : tab === "traffic" ? "Traffic" : "Satellite"}
                  </button>
                ))}
              </div>

              {/* Map */}
              <div className="flex-1 relative">
                {mapTab === "heatmap" ? (
                  <MapLeaflet
                    locations={ranked}
                    activeId={activeId}
                    flyTarget={flyTarget}
                    onPinClick={(id) => setActiveId((prev) => prev === id ? null : id)}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50 gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-700">Available in your full report</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {mapTab === "traffic" ? "Traffic flow analysis" : "Satellite imagery overlay"} included with every plan
                      </p>
                    </div>
                    <Link href="/pricing" className="text-xs font-semibold text-[#0066FF] hover:underline">
                      View pricing →
                    </Link>
                  </div>
                )}

                {/* Visibility Opportunity legend */}
                {mapTab === "heatmap" && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 shadow-lg p-3 z-[500]">
                    <p className="text-[11px] font-bold text-slate-700 mb-2">Visibility Opportunity</p>
                    {[
                      { color: "#16a34a", label: "High (80–100)" },
                      { color: "#d97706", label: "Moderate (50–79)" },
                      { color: "#dc2626", label: "Low (0–49)" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                        <span className="text-[11px] text-slate-600">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Area Summary overlay */}
                {mapTab === "heatmap" && (
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 shadow-lg p-3 z-[500] min-w-[180px]">
                    <p className="text-[11px] font-bold text-slate-700 mb-2">Area Summary</p>
                    {[
                      { color: "#16a34a", label: "High Opportunity Areas", pct: `${highPct}%` },
                      { color: "#d97706", label: "Moderate Opportunity Areas", pct: `${medPct}%` },
                      { color: "#dc2626", label: "Low Opportunity Areas", pct: `${lowPct}%` },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-4 mb-1.5 last:mb-0">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: row.color }} />
                          <span className="text-[10px] text-slate-500">{row.label}</span>
                        </div>
                        <span className="text-[11px] font-bold" style={{ color: row.color }}>{row.pct}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-100 mt-2 pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">Total Analyzed Area</span>
                      <span className="text-[11px] font-bold text-slate-700">234 sq mi</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right sidebar — Top 10 */}
            <div className="hidden xl:flex flex-col w-72 border-l border-slate-100 bg-white shrink-0">
              <div className="px-4 py-3 border-b border-slate-50 shrink-0">
                <p className="text-sm font-bold text-slate-900">Top {ranked.length} Locations</p>
              </div>
              <div className="overflow-y-auto flex-1">
                {ranked.map((loc, i) => {
                  const isActive = activeId === loc.id;
                  const scoreColor = loc.zone === "high" ? "#16a34a" : loc.zone === "medium" ? "#d97706" : "#dc2626";
                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleLocationClick(loc)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-b border-slate-50 last:border-0 ${
                        isActive ? "bg-blue-50" : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Rank badge */}
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
                        style={{ background: scoreColor }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-xs font-bold text-slate-800 leading-tight">{loc.name}</span>
                          <span className="text-xs font-black shrink-0 ml-1" style={{ color: scoreColor }}>
                            {loc.score}<span className="font-normal text-slate-400">/100</span>
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          High Traffic &bull; {loc.routeType}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="p-3 border-t border-slate-100 shrink-0">
                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0066FF] hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  View Full List
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Stats bar ─────────────────────────────────────────────── */}
          <div className="border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4">
            {[
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                label: "Population Reached",
                value: "412,000+",
              },
              {
                icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4m11 10V6a2 2 0 00-2-2H4m7 12H4m7 0a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1",
                label: "Total Daily Traffic",
                value: `${(totalTraffic / 1000000).toFixed(1)}M+`,
              },
              {
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                label: "Avg. Visibility Score",
                value: `${avgScore}/100`,
              },
              {
                icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
                label: "Best Sign Type",
                value: SIGN_TYPES[businessType] ?? "Yard Signs & Banners",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-4 ${i < 3 ? "border-r border-slate-100" : ""}`}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d={stat.icon} stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">{stat.label}</p>
                  <p className="text-sm font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Sample data for Clark County, WA. Your report is generated for your exact service area and business type.
        </p>
      </div>
    </section>
  );
}
