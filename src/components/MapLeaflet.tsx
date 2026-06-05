"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

delete (L.Icon.Default.prototype as any)._getIconUrl;

export type MapLocation = {
  id: number;
  rank: number;
  name: string;
  area: string;
  coords: [number, number];
  score: number;
  traffic: string;
  signType: string;
  customerFit: string;
  action: string;
  zone: "high" | "medium" | "low";
  routeType: string;
  categories: string[];
};

const HEAT_GRADIENT = {
  0.0: "#2563eb",
  0.25: "#06b6d4",
  0.45: "#22c55e",
  0.62: "#facc15",
  0.78: "#f97316",
  1.0: "#dc2626",
};

const ZONE_COLOR: Record<string, string> = {
  high: "#16a34a",
  medium: "#d97706",
  low: "#dc2626",
};

function makeNumberIcon(rank: number, color: string, active: boolean) {
  const size = active ? 32 : 28;
  return L.divIcon({
    className: "",
    html: `<div style="
      background:${color};color:white;font-weight:700;font-size:${active ? 13 : 12}px;
      font-family:Inter,system-ui,sans-serif;
      width:${size}px;height:${size}px;border-radius:50%;
      border:2.5px solid white;
      box-shadow:${active ? "0 0 0 3px " + color + "55, 0 4px 12px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.25)"};
      display:flex;align-items:center;justify-content:center;
    ">${rank}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)],
  });
}

function HeatmapLayer({ locations }: { locations: MapLocation[] }) {
  const map = useMap();
  useEffect(() => {
    const points: [number, number, number][] = [];
    locations.forEach((loc) => {
      const intensity = loc.score / 100;
      points.push([loc.coords[0], loc.coords[1], intensity]);
      // secondary spread points for natural blob shape
      const spread = 0.012;
      [
        [0.6, 0.5, 0], [0.6, -0.5, 0], [0.5, 0, 0.4],
        [0.4, 0.8, 0.2], [0.4, -0.8, 0.2],
      ].forEach(([frac, angle, latOff]) => {
        points.push([
          loc.coords[0] + latOff * spread + Math.sin(angle) * spread * 0.6,
          loc.coords[1] + Math.cos(angle) * spread,
          intensity * (frac as number),
        ]);
      });
    });

    const heat = L.heatLayer(points, {
      radius: 55,
      blur: 40,
      maxZoom: 13,
      minOpacity: 0.35,
      gradient: HEAT_GRADIENT,
    }).addTo(map);

    return () => { map.removeLayer(heat); };
  }, [locations, map]);

  return null;
}

function FlyTo({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 14, { duration: 1.1, easeLinearity: 0.3 });
  }, [target]);
  return null;
}

export default function MapLeaflet({
  locations,
  activeId,
  flyTarget,
  onPinClick,
}: {
  locations: MapLocation[];
  activeId: number | null;
  flyTarget: [number, number] | null;
  onPinClick: (id: number) => void;
}) {
  return (
    <MapContainer
      center={[45.65, -122.6]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      <ZoomControl position="topleft" />
      <HeatmapLayer locations={locations} />
      <FlyTo target={flyTarget} />

      {locations.map((loc) => {
        const active = activeId === loc.id;
        const color = ZONE_COLOR[loc.zone];
        return (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={makeNumberIcon(loc.rank, color, active)}
            zIndexOffset={active ? 1000 : 0}
            eventHandlers={{ click: () => onPinClick(loc.id) }}
          >
            <Popup minWidth={250} maxWidth={280}>
              <div style={{ fontFamily: "Inter,system-ui,sans-serif", padding: "2px 0" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:10, fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.06em" }}>
                    {loc.area}
                  </span>
                  <span style={{ background:color, color:"white", fontSize:11, fontWeight:800, padding:"2px 9px", borderRadius:20 }}>
                    {loc.score}/100
                  </span>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:"#111827", marginBottom:10 }}>{loc.name}</div>
                <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", rowGap:5, columnGap:10, fontSize:12, marginBottom:10 }}>
                  {([
                    ["Traffic", loc.traffic],
                    ["Best sign", loc.signType],
                    ["Customer fit", loc.customerFit],
                  ] as [string,string][]).map(([k,v]) => [
                    <span key={`k-${k}`} style={{ color:"#9ca3af", whiteSpace:"nowrap" }}>{k}</span>,
                    <span key={`v-${k}`} style={{ color:"#1f2937", fontWeight:500 }}>{v}</span>,
                  ])}
                </div>
                <div style={{ padding:"8px 10px", background:"#f0fdf4", borderRadius:8, borderLeft:"3px solid #16a34a" }}>
                  <div style={{ fontSize:10, fontWeight:600, color:"#15803d", marginBottom:3, textTransform:"uppercase", letterSpacing:"0.06em" }}>Recommended Action</div>
                  <div style={{ fontSize:12, color:"#1f2937", lineHeight:1.5 }}>{loc.action}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
