"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

function CreateLabelPane() {
  const map = useMap();
  if (!map.getPane("labelsPane")) {
    const pane = map.createPane("labelsPane");
    pane.style.zIndex = "450";
    (pane as HTMLElement).style.pointerEvents = "none";
  }
  return null;
}

function FlyToLocation({ center }: { center: [number, number] | null; radiusMeters: number }) {
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    map.flyTo(center, 13, { duration: 1.2, easeLinearity: 0.25 });
  }, [center, map]);
  return null;
}

function PinMarker({ center }: { center: [number, number] }) {
  const icon = L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:20px;height:20px;">
        <div style="position:absolute;inset:-10px;border-radius:50%;background:rgba(255,102,0,0.15);animation:pm-pulse 2s ease-out infinite;pointer-events:none;"></div>
        <div style="
          position:absolute;inset:0;border-radius:50%;
          background:#ff6600;
          border:3px solid white;
          box-shadow:0 0 20px rgba(255,102,0,0.9),0 0 40px rgba(255,102,0,0.4),0 2px 8px rgba(0,0,0,0.6);
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
  return <Marker position={center} icon={icon} />;
}

export default function AnalyzeMap({
  center,
  radiusMeters,
}: {
  center: [number, number] | null;
  radiusMeters: number;
}) {
  const defaultCenter: [number, number] = [39.5, -98.35];

  return (
    <MapContainer
      center={center ?? defaultCenter}
      zoom={center ? 12 : 4}
      style={{ height: "100%", width: "100%" }}
      zoomControl
      className="pm-hero-map"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
        className="pm-base-tiles"
      />
      <CreateLabelPane />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
        attribution=""
        pane="labelsPane"
        className="pm-label-tiles"
      />
      <FlyToLocation center={center} radiusMeters={radiusMeters} />
      {center && (
        <>
          {/* Outer glow ring */}
          <Circle
            center={center}
            radius={radiusMeters}
            pathOptions={{
              color: "#ff6600",
              fillColor: "#ff6600",
              fillOpacity: 0.05,
              weight: 2,
              dashArray: "10 6",
              opacity: 0.7,
            }}
          />
          {/* Inner fill */}
          <Circle
            center={center}
            radius={radiusMeters * 0.08}
            pathOptions={{
              color: "transparent",
              fillColor: "#ff6600",
              fillOpacity: 0.12,
              weight: 0,
            }}
          />
          <PinMarker center={center} />
        </>
      )}
    </MapContainer>
  );
}
