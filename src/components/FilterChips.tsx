import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Building2, Bus, Home, IndianRupee, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterChipsProps {
  selectedBoard: string;
  selectedFee: string;
  selectedClass: string;
  hasHostel: boolean;
  hasTransport: boolean;
  onBoardChange: (board: string) => void;
  onFeeChange: (fee: string) => void;
  onClassChange: (classLevel: string) => void;
  onHostelToggle: () => void;
  onTransportToggle: () => void;
  boards: string[];
  feeRanges: string[];
  classLevels: string[];
}

const FilterChips = ({
  selectedBoard,
  selectedFee,
  selectedClass,
  hasHostel,
  hasTransport,
  onBoardChange,
  onFeeChange,
  onClassChange,
  onHostelToggle,
  onTransportToggle,
  boards,
  feeRanges,
  classLevels,
}: FilterChipsProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="px-4 pb-6 space-y-5"
    >
      {/* Class Level filters */}
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Curriculum & Grade</p>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => onClassChange("All")}
            className={cn(
              "shrink-0 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border uppercase tracking-wider",
              selectedClass === "All"
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "glass text-foreground border-white/20 hover:border-primary/50"
            )}
          >
            All Classes
          </button>
          {classLevels.map((level) => (
            <button
              key={level}
              onClick={() => onClassChange(level)}
              className={cn(
                "shrink-0 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border uppercase tracking-wider",
                selectedClass === level
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "glass text-foreground border-white/20 hover:border-primary/50"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Board & Fee filters */}
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Academic Board</p>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {boards.map((board) => (
            <button
              key={board}
              onClick={() => onBoardChange(board)}
              className={cn(
                "shrink-0 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border uppercase tracking-wider",
                selectedBoard === board
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "glass text-foreground border-white/20 hover:border-primary/50"
              )}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                {board}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fee and amenity filters */}
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Budget & Facilities</p>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {feeRanges.slice(0, 3).map((fee) => (
            <button
              key={fee}
              onClick={() => onFeeChange(fee)}
              className={cn(
                "shrink-0 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border uppercase tracking-wider",
                selectedFee === fee
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "glass text-foreground border-white/20 hover:border-primary/50"
              )}
            >
              <div className="flex items-center gap-2">
                <IndianRupee className="w-3.5 h-3.5" />
                {fee}
              </div>
            </button>
          ))}
          <button
            onClick={onHostelToggle}
            className={cn(
              "shrink-0 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border uppercase tracking-wider",
              hasHostel
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "glass text-foreground border-white/20 hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-2">
              <Home className="w-3.5 h-3.5" />
              Hostel
            </div>
          </button>
          <button
            onClick={onTransportToggle}
            className={cn(
              "shrink-0 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border uppercase tracking-wider",
              hasTransport
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "glass text-foreground border-white/20 hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-2">
              <Bus className="w-3.5 h-3.5" />
              Transport
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterChips;
