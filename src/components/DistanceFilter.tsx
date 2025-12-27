import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      className="px-4 pb-3"
    >
      {/* Compact View */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Navigation className="w-4 h-4 text-primary" />
          <span>Distance:</span>
        </div>
        
        {/* Quick Preset Buttons */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
          {distancePresets.map((preset) => (
            <Button
              key={preset.value}
              variant={maxDistance === preset.value ? "filterActive" : "filter"}
              size="chip"
              onClick={(e) => {
                e.stopPropagation();
                onDistanceChange(preset.value);
              }}
              className="shrink-0"
            >
              <MapPin className="w-3 h-3" />
              {preset.label}
            </Button>
          ))}
        </div>
        
        <Badge variant="outline" className="ml-auto shrink-0">
          {filteredCount} schools
        </Badge>
      </div>

      {/* Expanded Slider View */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4 bg-card rounded-xl p-4 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">
              Within {maxDistance >= 50 ? "Any distance" : `${maxDistance} km`}
            </span>
            <span className="text-xs text-muted-foreground">
              {filteredCount} of {totalSchools} schools
            </span>
          </div>
          
          <Slider
            value={[maxDistance]}
            onValueChange={(value) => onDistanceChange(value[0])}
            max={50}
            min={1}
            step={1}
            className="mb-4"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 km</span>
            <span>10 km</span>
            <span>25 km</span>
            <span>50 km+</span>
          </div>

          {/* Visual Distance Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className="relative flex-1 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((maxDistance / 50) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Nearby Landmarks */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Nearby landmarks within range:</p>
            <div className="flex flex-wrap gap-1">
              {maxDistance >= 2 && (
                <Badge variant="secondary" className="text-xs">Vasant Kunj</Badge>
              )}
              {maxDistance >= 5 && (
                <Badge variant="secondary" className="text-xs">Hauz Khas</Badge>
              )}
              {maxDistance >= 8 && (
                <Badge variant="secondary" className="text-xs">Saket</Badge>
              )}
              {maxDistance >= 12 && (
                <Badge variant="secondary" className="text-xs">Noida</Badge>
              )}
              {maxDistance >= 15 && (
                <Badge variant="secondary" className="text-xs">Gurgaon</Badge>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DistanceFilter;
