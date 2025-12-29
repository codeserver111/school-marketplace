import { motion } from "framer-motion";
import { Baby, Sun, Building2, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type SchoolType = "preschool" | "day-school" | "boarding" | "day-boarding" | null;

interface SchoolTypeInfo {
  id: SchoolType;
  name: string;
  icon: React.ElementType;
  description: string;
  ageGroup: string;
  color: string;
}

const schoolTypes: SchoolTypeInfo[] = [
  {
    id: "preschool",
    name: "Preschool",
    icon: Baby,
    description: "Early childhood education focusing on play-based learning and foundational development",
    ageGroup: "2-5 years",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: "day-school",
    name: "Day School",
    icon: Sun,
    description: "Full-day academic programs where students return home after school hours",
    ageGroup: "5-18 years",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "boarding",
    name: "Boarding School",
    icon: Building2,
    description: "Residential schools where students live on campus with 24/7 supervision and care",
    ageGroup: "8-18 years",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: "day-boarding",
    name: "Day-Boarding",
    icon: Home,
    description: "Flexible hybrid model offering both day and residential options for families",
    ageGroup: "6-18 years",
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

interface SchoolTypeSelectorProps {
  selectedType: SchoolType;
  onTypeSelect: (type: SchoolType) => void;
}

const SchoolTypeSelector = ({ selectedType, onTypeSelect }: SchoolTypeSelectorProps) => {
  return (
    <section className="px-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-1">Choose School Type</h2>
        <p className="text-sm text-muted-foreground mb-4">Select the type of school you're looking for</p>
        
        <div className="grid grid-cols-2 gap-3">
          {schoolTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => onTypeSelect(isSelected ? null : type.id)}
                className={cn(
                  "relative p-4 rounded-xl text-left transition-all duration-300",
                  "border-2 bg-card shadow-sm hover:shadow-md",
                  isSelected
                    ? "border-primary bg-gradient-to-br " + type.color
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-3",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <h3 className="font-semibold text-foreground text-sm mb-1">{type.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{type.description}</p>
                
                <span className={cn(
                  "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                  isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {type.ageGroup}
                </span>
                
                {isSelected && (
                  <motion.div
                    layoutId="selectedIndicator"
                    className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default SchoolTypeSelector;
export { schoolTypes };
