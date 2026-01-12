"use client";

import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { School } from "@/data/mockSchools";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

interface SchoolMapViewProps {
  schools: School[];
}

const MapController = ({ schools }: { schools: School[] }) => {
  const map = useMap();

  useEffect(() => {
    if (schools.length > 0) {
      const bounds = L.latLngBounds(schools.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [schools, map]);

  return null;
};

const SchoolMapView = ({ schools }: SchoolMapViewProps) => {
  const defaultCenter: [number, number] = [28.5728, 77.2090]; // Delhi center

  // Create the default icon only on the client side
  const defaultIcon = useMemo(() => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div class="marker-container">
        <div class="marker-glow"></div>
        <div class="marker-core">
          <svg class="marker-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  }, []);

  return (
    <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-premium group/map">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        className="h-full w-full z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController schools={schools} />

        {schools.map((school) => (
          <Marker
            key={school.id}
            position={[school.lat, school.lng]}
            icon={defaultIcon}
          >
            <Popup className="school-popup">
              <div className="p-0 min-w-[240px] overflow-hidden rounded-2xl">
                <div className="relative h-28">
                  <img
                    src={school.images[0]}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-success/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg text-[10px] font-black">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {school.rating}
                  </div>
                </div>

                <div className="p-4 bg-card/95 backdrop-blur-md">
                  <h3 className="font-black text-sm text-foreground mb-1 line-clamp-1 tracking-tight">
                    {school.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">
                    <MapPin className="w-3 h-3 text-primary/60" />
                    <span className="truncate">{school.address}</span>
                  </div>

                  <Link href={`/school/${school.slug}`} className="block">
                    <Button className="w-full text-[10px] font-black tracking-widest h-9 rounded-xl bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300">
                      EXPLORE PROFILE
                    </Button>
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .marker-container {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-glow {
          position: absolute;
          width: 32px;
          height: 32px;
          background: hsl(var(--primary));
          border-radius: 50%;
          filter: blur(8px);
          opacity: 0.4;
          animation: marker-pulse 2s infinite;
        }
        .marker-core {
          position: relative;
          width: 32px;
          height: 32px;
          background: hsl(var(--primary));
          border: 2px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 2;
        }
        .marker-icon {
          width: 16px;
          height: 16px;
          color: white;
        }
        @keyframes marker-pulse {
          0% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.4; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 1.5rem;
          padding: 0;
          overflow: hidden;
          background: transparent !important;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-popup-tip-container {
          margin-top: -1px;
        }
        .leaflet-popup-tip {
          background: hsl(var(--card)) !important;
        }
        .school-popup .leaflet-popup-close-button {
          color: white !important;
          padding: 8px !important;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default SchoolMapView;
