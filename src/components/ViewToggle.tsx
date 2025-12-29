import { List, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type ViewMode = "list" | "map";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const ViewToggle = ({ viewMode, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      <button
        onClick={() => onViewChange("list")}
        className={cn(
          "relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
          viewMode === "list"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {viewMode === "list" && (
          <motion.div
            layoutId="viewToggleBg"
            className="absolute inset-0 bg-primary rounded-md"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <List className="w-4 h-4 relative z-10" />
        <span className="relative z-10">List</span>
      </button>
      
      <button
        onClick={() => onViewChange("map")}
        className={cn(
          "relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
          viewMode === "map"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {viewMode === "map" && (
          <motion.div
            layoutId="viewToggleBg"
            className="absolute inset-0 bg-primary rounded-md"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <Map className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Map</span>
      </button>
    </div>
  );
};

export default ViewToggle;
