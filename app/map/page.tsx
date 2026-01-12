"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, List, MapPin, Star, Navigation, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { schools, School } from "@/data/mockSchools";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
import { Spinner } from "@/components/ui/spinner";
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Utility function to format monthly fees
const formatMonthlyFee = (annualAmount: number): string => {
  const monthly = Math.round(annualAmount / 12);
  if (monthly >= 100000) {
    return `₹${(monthly / 100000).toFixed(1)}L`;
  } else if (monthly >= 1000) {
    return `₹${(monthly / 1000).toFixed(0)}K`;
  } else {
    return `₹${monthly.toLocaleString()}`;
  }
};

// Map controller component to handle bounds
const MapController = dynamic(
  () => import("react-leaflet").then((mod) => {
    const { useMap } = mod;
    return function MapControllerInner({ schools }: { schools: School[] }) {
      const map = useMap();
      useEffect(() => {
        if (schools.length > 0 && typeof window !== "undefined") {
          import("leaflet").then((L) => {
            const bounds = L.latLngBounds(schools.map((s) => [s.lat, s.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
          });
        }
      }, [schools, map]);
      return null;
    };
  }),
  { ssr: false }
);

export default function MapView() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [leafletIcon, setLeafletIcon] = useState<any>(null);

  const defaultCenter: [number, number] = [28.5494, 77.2090]; // Delhi center

  // Create custom marker icon on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        const icon = L.divIcon({
          className: "custom-school-marker",
          html: `<div class="marker-container">
            <div class="marker-glow"></div>
            <div class="marker-core">
              <svg class="marker-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </div>
          </div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 44],
          popupAnchor: [0, -44],
        });
        setLeafletIcon(icon);
        setIsMapLoaded(true);
      });

    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-[1000] bg-card/95 backdrop-blur-md border-b border-border safe-top"
      >
        <div className="flex items-center justify-between px-4 h-14">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <h1 className="font-semibold text-foreground">Schools Near You</h1>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/schools">
              <List className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </motion.header>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="fixed top-14 left-0 right-0 z-[999] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border-b border-border/50 px-4 py-2"
      >
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{schools.length}</span> schools found
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Navigation className="w-4 h-4" />
            Delhi NCR
          </div>
        </div>
      </motion.div>

      {/* Map Container */}
      <div className="pt-[104px] pb-24 h-screen">
        {isMapLoaded && leafletIcon ? (
          <MapContainer
            center={defaultCenter}
            zoom={11}
            className="w-full h-full z-0"
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController schools={schools} />

            {schools.map((school) => (
              <Marker
                key={school.id}
                position={[school.lat, school.lng]}
                icon={leafletIcon}
                eventHandlers={{
                  click: () => setSelectedSchool(school),
                }}
              >
                <Popup className="school-popup">
                  <div className="p-0 min-w-[260px] overflow-hidden rounded-2xl">
                    <div className="relative h-32">
                      <img
                        src={school.images[0]}
                        alt={school.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-success/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {school.rating}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="font-bold text-white text-sm line-clamp-1">
                          {school.name}
                        </h3>
                        <p className="text-white/80 text-xs line-clamp-1">
                          {school.address}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded">
                            {school.board}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {school.distance} km
                          </span>
                        </div>
                        <span className="text-primary font-bold text-sm">
                          {formatMonthlyFee(school.annualFee)}/mo
                        </span>
                      </div>
                      <Link href={`/school/${school.slug}`}>
                        <Button className="w-full h-9 text-xs font-bold rounded-xl">
                          View School
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Spinner size={48} />
          </div>
        )}
      </div>

      {/* Selected School Card (Mobile bottom sheet style) */}
      <AnimatePresence>
        {selectedSchool && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-28 left-4 right-4 z-[1000]"
          >
            <div className="relative bg-card/95 backdrop-blur-md rounded-2xl shadow-premium border border-white/10 p-4">
              <button
                onClick={() => setSelectedSchool(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <Link href={`/school/${selectedSchool.slug}`}>
                <div className="flex gap-4">
                  <img
                    src={selectedSchool.images[0]}
                    alt={selectedSchool.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-foreground truncate pr-6">
                        {selectedSchool.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded text-xs font-semibold">
                        <Star className="w-3 h-3 fill-current" />
                        {selectedSchool.rating}
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-muted rounded font-medium">
                        {selectedSchool.board}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold text-sm">
                        {formatMonthlyFee(selectedSchool.annualFee)}/month
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {selectedSchool.distance} km away
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNavigation />

      <style>{`
        .custom-school-marker {
          background: transparent;
          border: none;
        }
        .marker-container {
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-glow {
          position: absolute;
          width: 36px;
          height: 36px;
          background: hsl(var(--primary));
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.4;
          animation: marker-pulse 2s infinite;
        }
        .marker-core {
          position: relative;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2);
          z-index: 2;
          transition: transform 0.2s ease;
        }
        .marker-core:hover {
          transform: scale(1.1);
        }
        .marker-icon {
          width: 18px;
          height: 18px;
          color: white;
        }
        @keyframes marker-pulse {
          0% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.4; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          padding: 0;
          overflow: hidden;
          background: transparent !important;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2) !important;
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
          display: none !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-control-zoom a {
          background: hsl(var(--card)) !important;
          color: hsl(var(--foreground)) !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: hsl(var(--muted)) !important;
        }
      `}</style>
    </div>
  );
}
