"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

delete (L.Icon.Default.prototype as any)._getIconUrl;

export type { BizType, LayerKey } from "@/data/heroLocations";
import type { BizType, LayerKey } from "@/data/heroLocations";
import { HERO_LOCATIONS } from "@/data/heroLocations";

// ── Layer gradients ────────────────────────────────────────────────────────────
// Roads must show through. Large zero-alpha dead zone, low alpha at mid-range,
// full intensity only at hotspot cores. Roads visible at all intensities below 0.5.
const GRADIENTS: Record<LayerKey, Record<number, string>> = {
  opportunity: {
    0:    "rgba(0,0,0,0)",
    0.28: "rgba(0,0,0,0)",
    0.40: "rgba(15,60,200,0.32)",
    0.52: "rgba(0,170,220,0.58)",
    0.64: "rgba(0,240,160,0.72)",
    0.76: "rgba(255,200,0,0.84)",
    0.88: "rgba(255,105,0,0.94)",
    1.0:  "rgba(255,20,0,1)",
  },
  traffic: {
    0:    "rgba(0,0,0,0)",
    0.28: "rgba(0,0,0,0)",
    0.40: "rgba(0,55,180,0.32)",
    0.56: "rgba(0,140,255,0.60)",
    0.76: "rgba(60,215,255,0.82)",
    1.0:  "rgba(200,245,255,1)",
  },
  competition: {
    0:    "rgba(0,0,0,0)",
    0.28: "rgba(0,0,0,0)",
    0.40: "rgba(95,0,180,0.32)",
    0.56: "rgba(175,0,220,0.60)",
    0.76: "rgba(225,95,255,0.82)",
    1.0:  "rgba(255,195,255,1)",
  },
  income: {
    0:    "rgba(0,0,0,0)",
    0.28: "rgba(0,0,0,0)",
    0.40: "rgba(0,85,40,0.32)",
    0.56: "rgba(0,175,80,0.60)",
    0.76: "rgba(155,235,75,0.82)",
    1.0:  "rgba(255,215,0,1)",
  },
  growth: {
    0:    "rgba(0,0,0,0)",
    0.28: "rgba(0,0,0,0)",
    0.40: "rgba(0,75,85,0.32)",
    0.56: "rgba(0,195,195,0.60)",
    0.76: "rgba(95,250,215,0.82)",
    1.0:  "rgba(220,255,255,1)",
  },
};

// Background scatter points
const SCATTER: [number, number, number][] = [
  [45.703, -122.644, 0.38], [45.682, -122.607, 0.42], [45.648, -122.622, 0.35],
  [45.723, -122.705, 0.28], [45.651, -122.515, 0.33], [45.752, -122.603, 0.31],
  [45.622, -122.651, 0.39], [45.771, -122.682, 0.20], [45.612, -122.582, 0.36],
  [45.697, -122.757, 0.17], [45.637, -122.696, 0.44], [45.661, -122.662, 0.40],
  [45.707, -122.567, 0.29], [45.628, -122.558, 0.46], [45.597, -122.623, 0.26],
  [45.743, -122.553, 0.33], [45.598, -122.451, 0.27], [45.770, -122.460, 0.16],
  [45.667, -122.726, 0.30], [45.630, -122.740, 0.21],
];

const ZONE_COLOR = { high: "#16a34a", medium: "#d97706", low: "#dc2626" } as const;

function getZone(score: number): "high" | "medium" | "low" {
  return score >= 80 ? "high" : score >= 60 ? "medium" : "low";
}

function makeGlowIcon(rank: number, score: number, active: boolean) {
  const zone = getZone(score);
  const color = ZONE_COLOR[zone];
  const s = active ? 48 : 38;
  const fontSize = active ? 15 : 12;
  const borderWidth = active ? 3 : 2.5;
  const glow = active
    ? `0 0 28px ${color}ee, 0 0 56px ${color}77, 0 0 90px ${color}33, inset 0 1px 0 rgba(255,255,255,0.35)`
    : `0 0 16px ${color}cc, 0 0 32px ${color}55, inset 0 1px 0 rgba(255,255,255,0.25)`;
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:${s}px;height:${s}px;filter:drop-shadow(0 4px 14px ${color}99);">
        <div style="position:absolute;inset:-16px;border-radius:50%;background:${color}12;animation:pm-pulse 2.4s ease-out infinite;pointer-events:none;"></div>
        <div style="position:absolute;inset:-8px;border-radius:50%;background:${color}22;animation:pm-pulse 2.4s ease-out 0.8s infinite;pointer-events:none;"></div>
        <div style="
          position:absolute;inset:0;border-radius:50%;
          background:linear-gradient(145deg,${color},${color}cc);
          border:${borderWidth}px solid rgba(255,255,255,0.95);
          box-shadow:${glow};
          display:flex;align-items:center;justify-content:center;
          font-weight:900;font-size:${fontSize}px;color:white;
          font-family:Inter,system-ui,sans-serif;
          letter-spacing:-0.5px;
          text-shadow:0 1px 4px rgba(0,0,0,0.9);
        ">${rank}</div>
      </div>
    `,
    iconSize:    [s, s],
    iconAnchor:  [s / 2, s / 2],
    popupAnchor: [0, -(s / 2 + 12)],
  });
}

// ── Create custom pane for labels (z-index 450 = above heatmap at 400) ─────────
function CreateLabelPane() {
  const map = useMap();
  if (!map.getPane("labelsPane")) {
    const pane = map.createPane("labelsPane");
    pane.style.zIndex = "450";
    (pane as HTMLElement).style.pointerEvents = "none";
  }
  return null;
}

// ── Heatmap layer ──────────────────────────────────────────────────────────────
function HeatmapLayer({
  bizType, layer, opacity,
}: {
  bizType: BizType; layer: LayerKey; opacity: number;
}) {
  const map = useMap();
  const heatRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    const pts: [number, number, number][] = [];

    HERO_LOCATIONS.forEach((loc) => {
      let w: number;
      switch (layer) {
        case "opportunity":  w = loc.weights[bizType]; break;
        case "traffic":      w = loc.trafficNorm; break;
        case "competition":  w = loc.competitionNorm; break;
        case "income":       w = loc.incomeNorm; break;
        case "growth":       w = loc.growthNorm; break;
        default:             w = 0.5;
      }
      pts.push([loc.coords[0], loc.coords[1], w]);
      [0, 60, 120, 180, 240, 300].forEach((deg) => {
        const rad = deg * Math.PI / 180;
        pts.push([
          loc.coords[0] + Math.sin(rad) * 0.007,
          loc.coords[1] + Math.cos(rad) * 0.007,
          w * 0.38,
        ]);
      });
    });

    const scatterMod: Record<LayerKey, number> = {
      opportunity: 0.38, traffic: 0.42, competition: 0.30, income: 0.35, growth: 0.35,
    };
    SCATTER.forEach(([lat, lng, base]) => {
      pts.push([lat, lng, base * scatterMod[layer]]);
    });

    if (heatRef.current) map.removeLayer(heatRef.current);
    const heat = L.heatLayer(pts, {
      radius: 50, blur: 32, maxZoom: 14,
      minOpacity: 0.08, max: 1.0,
      gradient: GRADIENTS[layer],
    }).addTo(map);
    heatRef.current = heat;

    // Apply initial opacity to the canvas element
    requestAnimationFrame(() => {
      const canvas = (heat as any)._canvas as HTMLCanvasElement | undefined;
      if (canvas) canvas.style.opacity = String(opacity);
    });

    return () => { if (heatRef.current) map.removeLayer(heatRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bizType, layer, map]);

  // Opacity updates without full layer rebuild
  useEffect(() => {
    if (!heatRef.current) return;
    const canvas = (heatRef.current as any)._canvas as HTMLCanvasElement | undefined;
    if (canvas) canvas.style.opacity = String(opacity);
  }, [opacity]);

  return null;
}

function FlyTo({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 14, { duration: 1.0, easeLinearity: 0.25 });
  }, [target]);
  return null;
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function HeroMapLeaflet({
  bizType,
  layer,
  showPins,
  activeId,
  flyTarget,
  onPinClick,
  heatmapOpacity,
}: {
  bizType: BizType;
  layer: LayerKey;
  showPins: boolean;
  activeId: number | null;
  flyTarget: [number, number] | null;
  onPinClick: (id: number) => void;
  heatmapOpacity: number;
}) {
  return (
    <MapContainer
      center={[45.66, -122.60]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      className="pm-hero-map"
    >
      {/* Voyager tiles: high-contrast road network, processed dark via CSS filter */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
        className="pm-base-tiles"
      />

      {/* Ensures label pane exists at z-index 450 before the TileLayer below mounts */}
      <CreateLabelPane />

      {/* Heatmap sits in overlayPane (z-index 400) */}
      <HeatmapLayer bizType={bizType} layer={layer} opacity={heatmapOpacity} />

      {/* Labels float above heatmap in custom pane — always legible */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
        attribution=""
        pane="labelsPane"
        className="pm-label-tiles"
      />

      <FlyTo target={flyTarget} />

      {showPins && HERO_LOCATIONS.map((loc) => {
        const active = activeId === loc.id;
        return (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={makeGlowIcon(loc.rank, loc.score, active)}
            zIndexOffset={active ? 1000 : 0}
            eventHandlers={{ click: () => onPinClick(loc.id) }}
          >
            <Popup minWidth={260} maxWidth={280}>
              <div style={{ fontFamily:"Inter,system-ui,sans-serif", background:"#0f172a", color:"#f1f5f9", padding:"16px", borderRadius:"12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div>
                    <div style={{ fontSize:10, color:"#64748b", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{loc.area}</div>
                    <div style={{ fontSize:14, fontWeight:700, lineHeight:1.3, color:"#f8fafc" }}>{loc.name}</div>
                  </div>
                  <div style={{
                    background: getZone(loc.score) === "high" ? "#16a34a" : getZone(loc.score) === "medium" ? "#d97706" : "#dc2626",
                    color:"white", fontWeight:800, fontSize:13, padding:"3px 10px", borderRadius:20, whiteSpace:"nowrap", marginLeft:8,
                  }}>
                    {loc.score}/100
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"4px 10px", fontSize:12, marginBottom:12 }}>
                  {([["Traffic", loc.traffic], ["Best sign", loc.signType], ["Customer fit", loc.customerFit]] as [string,string][]).map(([k,v]) => [
                    <span key={"k"+k} style={{ color:"#475569" }}>{k}</span>,
                    <span key={"v"+k} style={{ color:"#cbd5e1", fontWeight:500 }}>{v}</span>,
                  ])}
                </div>
                <div style={{ background:"rgba(22,163,74,0.15)", borderLeft:"3px solid #16a34a", borderRadius:"0 8px 8px 0", padding:"8px 10px" }}>
                  <div style={{ fontSize:10, fontWeight:600, color:"#4ade80", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>Recommended Action</div>
                  <div style={{ fontSize:12, color:"#e2e8f0", lineHeight:1.5 }}>{loc.action}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
