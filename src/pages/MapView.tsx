import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import { ArrowLeft, List, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import { schools, School } from "@/data/mockSchools";

// Demo token - in production, this should be stored securely
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZWRlbW8iLCJhIjoiY2x4eGd6bnR2MDR1aDJqc2RzZ3Zja3B6MCJ9.demo";

const MapView = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [mapToken, setMapToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [77.2090, 28.5494], // Delhi center
        zoom: 11,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add markers for each school
      schools.forEach((school) => {
        const el = document.createElement("div");
        el.className = "school-marker";
        el.innerHTML = `
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
          </div>
        `;

        el.addEventListener("click", () => {
          setSelectedSchool(school);
          map.current?.flyTo({
            center: [school.lng, school.lat],
            zoom: 14,
          });
        });

        new mapboxgl.Marker(el)
          .setLngLat([school.lng, school.lat])
          .addTo(map.current!);
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error("Map initialization failed:", error);
      setShowTokenInput(true);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapToken]);

  const handleTokenSubmit = () => {
    if (mapToken.trim()) {
      // Token will trigger useEffect to initialize map
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border safe-top"
      >
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-foreground">Schools Near You</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/schools")}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </motion.header>

      {/* Map Container */}
      <div className="pt-14 pb-20 h-screen">
        {showTokenInput ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Map View</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Enter your Mapbox public token to view schools on the map. Get one free at{" "}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="w-full max-w-sm space-y-3">
              <Input
                type="text"
                value={mapToken}
                onChange={(e) => setMapToken(e.target.value)}
                placeholder="pk.eyJ1IjoieW91ci10b2tlbiI..."
              />
              <Button 
                onClick={handleTokenSubmit} 
                className="w-full"
                disabled={!mapToken.trim()}
              >
                Load Map
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Or continue browsing schools in{" "}
              <button 
                onClick={() => navigate("/schools")}
                className="text-primary underline"
              >
                list view
              </button>
            </p>
          </div>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
      </div>

      {/* Selected School Card */}
      {selectedSchool && !showTokenInput && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 right-4 z-40"
        >
          <button
            onClick={() => navigate(`/school/${selectedSchool.slug}`)}
            className="w-full bg-card rounded-xl shadow-card-hover p-4 text-left"
          >
            <div className="flex gap-4">
              <img
                src={selectedSchool.images[0]}
                alt={selectedSchool.name}
                className="w-20 h-20 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {selectedSchool.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-success text-success-foreground px-2 py-0.5 rounded text-xs font-semibold shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    {selectedSchool.rating}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {selectedSchool.address}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary font-semibold text-sm">
                    {selectedSchool.feeRange}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedSchool.distance} km away
                  </span>
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      )}

      <BottomNavigation />

      <style>{`
        .school-marker {
          cursor: pointer;
        }
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 12px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MapView;
