import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { School } from "@/data/mockSchools";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Vite
const defaultIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
    <svg class="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

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
  
  return (
    <div className="relative h-[400px] rounded-xl overflow-hidden border border-border shadow-sm">
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
              <div className="p-1 min-w-[200px]">
                <img
                  src={school.images[0]}
                  alt={school.name}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-1">
                  {school.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center gap-0.5 text-xs bg-success/10 text-success px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-current" />
                    {school.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">{school.board}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  <span className="line-clamp-1">{school.address}</span>
                </div>
                <Link to={`/school/${school.slug}`}>
                  <Button size="sm" className="w-full text-xs h-7">
                    View Details
                  </Button>
                </Link>
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
        .custom-marker > div {
          display: flex;
          align-items: center;
          justify-content: center;
          background: hsl(var(--primary));
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .custom-marker svg {
          color: hsl(var(--primary-foreground));
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 8px;
        }
        .school-popup .leaflet-popup-content-wrapper {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
        }
        .leaflet-popup-tip {
          background: hsl(var(--card));
        }
      `}</style>
    </div>
  );
};

export default SchoolMapView;
