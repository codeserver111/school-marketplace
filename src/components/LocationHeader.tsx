import { MapPin, ChevronDown, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface LocationHeaderProps {
  location: string;
  onLocationClick?: () => void;
}

const LocationHeader = ({ location, onLocationClick }: LocationHeaderProps) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border z-40 safe-top"
    >
      <div className="flex items-center justify-between px-4 h-14">
        <button 
          onClick={onLocationClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Location</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">{location}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
      </div>
    </motion.header>
  );
};

export default LocationHeader;
