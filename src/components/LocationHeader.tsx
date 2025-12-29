import { MapPin, ChevronDown, Bell, Sparkles } from "lucide-react";
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
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border/50 z-40 safe-top shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">SchoolFinder</h1>
          </div>
        </div>

        {/* Center Section - Location (Zomato/Swiggy style) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onLocationClick}
          className="flex-1 max-w-xs mx-4 bg-secondary/50 hover:bg-secondary/70 rounded-full px-4 py-2 transition-colors duration-200"
        >
          <div className="flex items-center gap-2 justify-center">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-xs text-muted-foreground leading-tight">Delivering to</span>
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">{location}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          </div>
        </motion.button>

        {/* Right Section - Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative w-9 h-9 rounded-full hover:bg-secondary/80"
        >
          <Bell className="w-4 h-4" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border border-background"
          />
        </Button>
      </div>
    </motion.header>
  );
};

export default LocationHeader;
