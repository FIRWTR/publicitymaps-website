"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// suppress webpack icon resolution warning
delete (L.Icon.Default.prototype as any)._getIconUrl;

export type MapLocation = {
  id: number;
  name: string;
  area: string;
  coords: [number, number];
  score: number;
  traffic: string;
  signType: string;
  customerFit: string;
  action: string;
  zone: "high" | "medium" | "low";
  categories: string[];
};

const ZONE_STYLE = {
  high:   { fill: "#00D084", opacity: 0.15, stroke: "#00D084", strokeOpacity: 0.4, radius: 1400 },
  medium: { fill: "#F59E0B", opacity: 0.14, stroke: "#F59E0B", strokeOpacity: 0.35, radius: 1050 },
  low:    { fill: "#EF4444", opacity: 0.12, stroke: "#EF4444", strokeOpacity: 0.3,  radius: 750  },
};

const SCORE_COLOR: Record<string, string> = {
  high: "#00D084",
  medium: "#F59E0B",
  low: "#EF4444",
};

function makeIcon(score: number, color: string, active: boolean) {
  const size = active ? 42 : 34;
  return L.divIcon({
    className: "",
    html: `<div style="
      background:${color};color:white;font-weight:800;font-size:11px;
      font-family:Inter,system-ui,sans-serif;
      width:${size}px;height:${size}px;
      border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      border:${active ? "3px" : "2px"} solid white;
      box-shadow:${active ? "0 4px 16px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.2)"};
      display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);display:block;line-height:1">${score}</span></div>`,
    iconSize:   [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size - 2],
  });
}

function FlyTo({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 14, { duration: 1.2, easeLinearity: 0.3 });
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
      center={[45.63, -122.6]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      <ZoomControl position="bottomright" />
      <FlyTo target={flyTarget} />

      {/* Heat zones */}
      {locations.map((loc) => {
        const s = ZONE_STYLE[loc.zone];
        return (
          <Circle
            key={`z${loc.id}`}
            center={loc.coords}
            radius={s.radius}
            pathOptions={{
              fillColor: s.fill,
              fillOpacity: s.opacity,
              color: s.stroke,
              weight: 1.5,
              opacity: s.strokeOpacity,
            }}
          />
        );
      })}

      {/* Pins */}
      {locations.map((loc) => {
        const active = activeId === loc.id;
        const color = SCORE_COLOR[loc.zone];
        return (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={makeIcon(loc.score, color, active)}
            zIndexOffset={active ? 1000 : 0}
            eventHandlers={{ click: () => onPinClick(loc.id) }}
          >
            <Popup minWidth={240}>
              <div style={{ fontFamily: "Inter,system-ui,sans-serif", padding: "2px 0" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:10, fontWeight:600, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.06em" }}>
                    {loc.area}
                  </span>
                  <span style={{ background:color, color:"white", fontSize:11, fontWeight:800, padding:"2px 9px", borderRadius:20 }}>
                    {loc.score} / 100
                  </span>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:"#0F172A", marginBottom:10 }}>{loc.name}</div>
                <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", rowGap:5, columnGap:10, fontSize:12 }}>
                  {([
                    ["Traffic", loc.traffic],
                    ["Best sign", loc.signType],
                    ["Customer fit", loc.customerFit],
                  ] as [string,string][]).map(([k,v]) => (
                    <>
                      <span key={`k${k}`} style={{ color:"#94A3B8", whiteSpace:"nowrap" }}>{k}</span>
                      <span key={`v${k}`} style={{ color:"#1E293B", fontWeight:500 }}>{v}</span>
                    </>
                  ))}
                </div>
                <div style={{ marginTop:10, padding:"8px 10px", background:"#F0FDF4", borderRadius:8, borderLeft:"3px solid #00D084" }}>
                  <div style={{ fontSize:10, fontWeight:600, color:"#15803D", marginBottom:3, textTransform:"uppercase", letterSpacing:"0.06em" }}>
                    Recommended Action
                  </div>
                  <div style={{ fontSize:12, color:"#1E293B", lineHeight:1.5 }}>{loc.action}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
