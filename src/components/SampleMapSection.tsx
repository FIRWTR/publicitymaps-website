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

const ALL_LOCATIONS: MapLocation[] = [
  {
    id: 1,
    name: "Mill Plain Blvd & Chkalov Dr",
    area: "Vancouver East",
    coords: [45.627, -122.58],
    score: 92,
    traffic: "28,400/day",
    signType: "Large-format banner",
    customerFit: "Excellent — high homeownership, median income $78K",
    action: "Place 4×8 banner facing westbound traffic on Mill Plain",
    zone: "high",
    categories: ["all", "home-services", "signs", "events"],
  },
  {
    id: 2,
    name: "NE 78th St & Highway 99",
    area: "Hazel Dell",
    coords: [45.68, -122.668],
    score: 87,
    traffic: "22,100/day",
    signType: "Yard signs + vehicle wrap",
    customerFit: "Strong — dense residential, 68% homeowners",
    action: "Deploy yard signs at 3 key intersections before weekend",
    zone: "high",
    categories: ["all", "home-services", "political", "signs"],
  },
  {
    id: 3,
    name: "SE 192nd Ave & SE Mill Plain",
    area: "Fisher's Landing",
    coords: [45.604, -122.504],
    score: 84,
    traffic: "19,800/day",
    signType: "A-frame + yard signs",
    customerFit: "Strong — newer development, growing families",
    action: "Target weekend traffic with A-frame signage near retail",
    zone: "high",
    categories: ["all", "home-services", "political", "events", "signs"],
  },
  {
    id: 4,
    name: "SR-14 & NW 38th Ave",
    area: "Camas",
    coords: [45.588, -122.406],
    score: 78,
    traffic: "14,200/day",
    signType: "Directional signs",
    customerFit: "Good — affluent suburb, avg household income $95K",
    action: "Use directional signs pointing toward your service area",
    zone: "medium",
    categories: ["all", "home-services", "signs", "events"],
  },
  {
    id: 5,
    name: "NE 112th Ave & SR-500",
    area: "Orchards",
    coords: [45.659, -122.573],
    score: 74,
    traffic: "12,900/day",
    signType: "Vehicle route wrap",
    customerFit: "Good — high-density residential corridor",
    action: "Brand service trucks — high repeat impressions per route",
    zone: "medium",
    categories: ["all", "vehicle-routes", "home-services"],
  },
  {
    id: 6,
    name: "E Main St & Broadway",
    area: "Downtown Vancouver",
    coords: [45.626, -122.672],
    score: 71,
    traffic: "11,400/day",
    signType: "Event banners",
    customerFit: "Moderate — mixed commercial/residential, foot traffic",
    action: "Book banner placements 2 weeks before events",
    zone: "medium",
    categories: ["all", "events", "political", "signs"],
  },
  {
    id: 7,
    name: "W Main St & NW 10th Ave",
    area: "Battle Ground",
    coords: [45.782, -122.532],
    score: 68,
    traffic: "8,700/day",
    signType: "Yard signs",
    customerFit: "Good — high homeownership rural community",
    action: "Yard sign blitz before weekend market traffic peaks",
    zone: "medium",
    categories: ["all", "political", "home-services", "signs"],
  },
  {
    id: 8,
    name: "NE Salmon Creek Ave & I-5",
    area: "Salmon Creek",
    coords: [45.726, -122.683],
    score: 63,
    traffic: "16,200/day",
    signType: "High-visibility roadside",
    customerFit: "Moderate — commuter corridor, high pass-through volume",
    action: "High-visibility placement timed for AM/PM commute windows",
    zone: "medium",
    categories: ["all", "vehicle-routes", "signs"],
  },
  {
    id: 9,
    name: "NE Andresen Rd & NE 4th Plain",
    area: "Andresen Corridor",
    coords: [45.651, -122.639],
    score: 58,
    traffic: "9,100/day",
    signType: "Temporary signs",
    customerFit: "Low-moderate — mixed zoning, lower conversion rate",
    action: "Test with temporary signage before committing budget",
    zone: "low",
    categories: ["all", "signs", "events"],
  },
  {
    id: 10,
    name: "Washougal River Rd & 3rd St",
    area: "Washougal",
    coords: [45.581, -122.353],
    score: 44,
    traffic: "5,200/day",
    signType: "Not recommended",
    customerFit: "Poor — low traffic density, limited residential reach",
    action: "Avoid — low ROI. Redirect this budget to Mill Plain.",
    zone: "low",
    categories: ["all", "signs"],
  },
];

const FILTERS = [
  { key: "all", label: "All Locations" },
  { key: "home-services", label: "Home Services" },
  { key: "signs", label: "Signs" },
  { key: "vehicle-routes", label: "Vehicle Routes" },
  { key: "political", label: "Political Campaign" },
  { key: "events", label: "Events" },
];

const ZONE_META = {
  high:   { color: "#00D084", bg: "#DCFCE7", label: "High opportunity" },
  medium: { color: "#F59E0B", bg: "#FEF9C3", label: "Moderate opportunity" },
  low:    { color: "#EF4444", bg: "#FEE2E2", label: "Low opportunity" },
};

export default function SampleMapSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);

  const visible = ALL_LOCATIONS.filter((l) => l.categories.includes(activeFilter));
  const ranked = [...visible].sort((a, b) => b.score - a.score);

  function handleSidebarClick(loc: MapLocation) {
    setActiveId(loc.id);
    setFlyTarget([...loc.coords] as [number, number]);
  }

  function handlePinClick(id: number) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="sample-map" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3.5 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-semibold text-[#0066FF] tracking-wide uppercase">
              Live Demo — Clark County, WA
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            See Your Market at a Glance
          </h2>
          <p className="text-lg text-slate-500">
            This is what your report looks like. Click any pin to see the full breakdown — then filter by business type.
          </p>
        </div>

        {/* Dashboard card */}
        <div className="rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden bg-white">

          {/* Control bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-white">

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setActiveFilter(f.key); setActiveId(null); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === f.key
                      ? "bg-[#0066FF] text-white shadow-sm shadow-blue-500/20"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Legend + CTA */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
                {(["high", "medium", "low"] as const).map((z) => (
                  <span key={z} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: ZONE_META[z].color }} />
                    {ZONE_META[z].label}
                  </span>
                ))}
              </div>
              <Link
                href="/pricing"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold hover:bg-[#0052CC] transition-colors shadow-sm shadow-blue-500/20"
              >
                Get My Custom PublicityMap
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Body */}
          <div className="flex" style={{ height: 560 }}>

            {/* Sidebar */}
            <div className="hidden lg:flex flex-col w-72 border-r border-slate-100 bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-50">
                <p className="text-xs font-bold text-slate-900">
                  Top Locations
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {visible.length} locations · click to zoom
                </p>
              </div>
              <div className="overflow-y-auto flex-1 py-2">
                {ranked.map((loc, rank) => {
                  const meta = ZONE_META[loc.zone];
                  const isActive = activeId === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleSidebarClick(loc)}
                      className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${
                        isActive ? "bg-blue-50 border-l-2 border-[#0066FF]" : "hover:bg-slate-50 border-l-2 border-transparent"
                      }`}
                    >
                      {/* Rank number */}
                      <span className="text-xs font-black text-slate-300 w-4 shrink-0 mt-0.5">
                        {rank + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-xs font-bold text-slate-800 truncate">{loc.name}</span>
                          <span
                            className="text-xs font-black shrink-0"
                            style={{ color: meta.color }}
                          >
                            {loc.score}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            {loc.area}
                          </span>
                          <span className="text-[10px] text-slate-400">{loc.traffic}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar CTA */}
              <div className="p-4 border-t border-slate-100">
                <Link
                  href="/pricing"
                  className="block w-full text-center py-2.5 rounded-xl bg-[#0066FF] text-white text-xs font-bold hover:bg-[#0052CC] transition-colors"
                >
                  Get My Custom PublicityMap →
                </Link>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Reports for your exact service area
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 relative">
              <MapLeaflet
                locations={visible}
                activeId={activeId}
                flyTarget={flyTarget}
                onPinClick={handlePinClick}
              />

              {/* Mobile filter hint */}
              <div className="absolute bottom-3 left-3 lg:hidden bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-slate-100 text-[11px] text-slate-500">
                Tap a pin to see details
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Sample data for Clark County, WA — your report uses data for your actual service area.
        </p>
      </div>
    </section>
  );
}
