import { X, GitCompare } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ComparisonBar = () => {
  const { selectedSchools, removeSchool, clearAll } = useComparison();
  const navigate = useNavigate();

  if (selectedSchools.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-0 right-0 z-40 px-4"
      >
        <div className="bg-card border border-border shadow-lg rounded-2xl p-4 mx-auto max-w-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Compare ({selectedSchools.length}/3)
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-auto py-1"
              onClick={clearAll}
            >
              Clear all
            </Button>
          </div>

          <div className="flex gap-2 mb-3">
            {selectedSchools.map((school) => (
              <div
                key={school.id}
                className="relative flex-1 bg-secondary rounded-lg p-2"
              >
                <img
                  src={school.images[0]}
                  alt={school.name}
                  className="w-full h-12 object-cover rounded"
                />
                <button
                  onClick={() => removeSchool(school.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
                <p className="text-xs text-foreground mt-1 truncate">
                  {school.name}
                </p>
              </div>
            ))}
            {Array.from({ length: 3 - selectedSchools.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex-1 border-2 border-dashed border-border rounded-lg h-20 flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground">Add school</span>
              </div>
            ))}
          </div>

          <Button
            className="w-full"
            onClick={() => navigate("/compare")}
            disabled={selectedSchools.length < 2}
          >
            <GitCompare className="w-4 h-4 mr-2" />
            Compare {selectedSchools.length >= 2 ? "Now" : "(Select 2+)"}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonBar;
