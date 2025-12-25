import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Building2, Bus, Home, IndianRupee, GraduationCap } from "lucide-react";

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
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="px-4 pb-3"
    >
      {/* Class Level filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
        <Button
          variant={selectedClass === "All" ? "filterActive" : "filter"}
          size="chip"
          onClick={() => onClassChange("All")}
          className="shrink-0"
        >
          <GraduationCap className="w-3 h-3" />
          All Classes
        </Button>
        {classLevels.map((level) => (
          <Button
            key={level}
            variant={selectedClass === level ? "filterActive" : "filter"}
            size="chip"
            onClick={() => onClassChange(level)}
            className="shrink-0"
          >
            <GraduationCap className="w-3 h-3" />
            {level}
          </Button>
        ))}
      </div>

      {/* Board filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
        {boards.map((board) => (
          <Button
            key={board}
            variant={selectedBoard === board ? "filterActive" : "filter"}
            size="chip"
            onClick={() => onBoardChange(board)}
            className="shrink-0"
          >
            <Building2 className="w-3 h-3" />
            {board}
          </Button>
        ))}
      </div>
      
      {/* Fee and amenity filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {feeRanges.slice(0, 3).map((fee) => (
          <Button
            key={fee}
            variant={selectedFee === fee ? "filterActive" : "filter"}
            size="chip"
            onClick={() => onFeeChange(fee)}
            className="shrink-0"
          >
            <IndianRupee className="w-3 h-3" />
            {fee}
          </Button>
        ))}
        <Button
          variant={hasHostel ? "filterActive" : "filter"}
          size="chip"
          onClick={onHostelToggle}
          className="shrink-0"
        >
          <Home className="w-3 h-3" />
          Hostel
        </Button>
        <Button
          variant={hasTransport ? "filterActive" : "filter"}
          size="chip"
          onClick={onTransportToggle}
          className="shrink-0"
        >
          <Bus className="w-3 h-3" />
          Transport
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterChips;
