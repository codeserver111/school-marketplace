import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  placeholder?: string;
}

const SearchBar = ({ 
  value, 
  onChange, 
  onFilterClick,
  placeholder = "Search schools, boards..." 
}: SearchBarProps) => {
  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex items-center gap-3 px-4 py-3"
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-4 h-12 bg-secondary border-0 focus-visible:ring-primary"
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={onFilterClick}
        className="h-12 w-12 shrink-0 border-border"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </Button>
    </motion.div>
  );
};

export default SearchBar;
