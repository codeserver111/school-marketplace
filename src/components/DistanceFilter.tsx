import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DistanceFilterProps {
  maxDistance: number;
  onDistanceChange: (distance: number) => void;
  totalSchools: number;
  filteredCount: number;
}

const distancePresets = [
  { label: "2 km", value: 2 },
  { label: "5 km", value: 5 },
  { label: "10 km", value: 10 },
  { label: "Any", value: 50 },
];

const DistanceFilter = ({
  maxDistance,
  onDistanceChange,
  totalSchools,
  filteredCount
}: DistanceFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="px-4 pb-4"
    >
      {/* Compact View */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="glass rounded-2xl p-4 flex items-center justify-between cursor-pointer border-white/20 shadow-lg shadow-black/5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Navigation className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground leading-none mb-1">Search Radius</p>
            <p className="text-sm font-bold text-foreground">
              Within {maxDistance >= 50 ? "Any distance" : `${maxDistance} km`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-success/10 px-2 py-1 rounded-lg">
            <span className="text-[10px] font-black text-success uppercase">{filteredCount} Schools</span>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <Navigation className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded Slider View */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-3 glass rounded-2xl p-6 shadow-premium border-white/20 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Set Maximum Distance
            </span>
            <div className="flex gap-2">
              {distancePresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDistanceChange(preset.value);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-300",
                    maxDistance === preset.value
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-12 flex items-center mb-4">
            <Slider
              value={[maxDistance]}
              onValueChange={(value) => onDistanceChange(value[0])}
              max={50}
              min={1}
              step={1}
              className="relative z-10"
            />
          </div>

          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
            <span>1 km</span>
            <span>25 km</span>
            <span>50 km+</span>
          </div>

          {/* Nearby Landmarks */}
          <div className="mt-6 pt-6 border-t border-dashed border-border">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Popular Locations in Range</p>
            <div className="flex flex-wrap gap-1.5">
              {maxDistance >= 2 && (
                <span className="bg-white/50 px-3 py-1.5 rounded-lg text-[10px] font-bold text-foreground border border-white">Vasant Kunj</span>
              )}
              {maxDistance >= 5 && (
                <span className="bg-white/50 px-3 py-1.5 rounded-lg text-[10px] font-bold text-foreground border border-white">Hauz Khas</span>
              )}
              {maxDistance >= 8 && (
                <span className="bg-white/50 px-3 py-1.5 rounded-lg text-[10px] font-bold text-foreground border border-white">Saket</span>
              )}
              {maxDistance >= 12 && (
                <span className="bg-white/50 px-3 py-1.5 rounded-lg text-[10px] font-bold text-foreground border border-white">Noida</span>
              )}
              {maxDistance >= 15 && (
                <span className="bg-white/50 px-3 py-1.5 rounded-lg text-[10px] font-bold text-foreground border border-white">Gurgaon</span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DistanceFilter;
