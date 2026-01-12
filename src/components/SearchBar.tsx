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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 px-4 py-4"
    >
      <div className="relative flex-1 group">
        <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-all duration-500 opacity-0 group-focus-within:opacity-100" />
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-primary group-focus-within:text-primary transition-colors duration-300" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pl-12 pr-4 h-14 bg-card/50 backdrop-blur-md border border-white/20 rounded-2xl focus-visible:ring-primary/50 focus-visible:ring-offset-0 shadow-lg shadow-black/5 placeholder:text-muted-foreground/50 font-medium"
          />
        </div>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={onFilterClick}
          className="h-14 w-14 shrink-0 rounded-2xl border-white/20 bg-card/50 backdrop-blur-md shadow-lg shadow-black/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
        >
          <SlidersHorizontal className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
