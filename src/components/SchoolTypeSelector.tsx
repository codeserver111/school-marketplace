import { motion } from "framer-motion";
import { Baby, Sun, Building2, Home, ChevronRight, Sparkles, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

export type SchoolType = "preschool" | "day-school" | "boarding" | "day-boarding" | null;

interface SchoolTypeInfo {
  id: SchoolType;
  name: string;
  icon: React.ElementType;
  description: string;
  ageGroup: string;
  gradient: string;
  iconBg: string;
  accentColor: string;
}

const schoolTypes: SchoolTypeInfo[] = [
  {
    id: "preschool",
    name: "Preschool",
    icon: Baby,
    description: "Play-based learning for early childhood development",
    ageGroup: "2-5 years",
    gradient: "from-pink-500 to-rose-600",
    iconBg: "bg-gradient-to-br from-pink-400 to-rose-500",
    accentColor: "pink"
  },
  {
    id: "day-school",
    name: "Day School",
    icon: Sun,
    description: "Full-day academic programs with daily commute",
    ageGroup: "5-18 years",
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    accentColor: "amber"
  },
  {
    id: "boarding",
    name: "Boarding School",
    icon: Building2,
    description: "Residential schools with 24/7 campus living",
    ageGroup: "8-18 years",
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
    accentColor: "blue"
  },
  {
    id: "day-boarding",
    name: "Day-Boarding",
    icon: Home,
    description: "Flexible hybrid of day and residential options",
    ageGroup: "6-18 years",
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    accentColor: "emerald"
  }
];

interface SchoolTypeSelectorProps {
  selectedType: SchoolType;
  onTypeSelect: (type: SchoolType) => void;
}

const SchoolTypeSelector = ({ selectedType, onTypeSelect }: SchoolTypeSelectorProps) => {
  return (
    <section className="px-4 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {/* Enhanced Header with Interactive Hint */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight">Browse by Category</h2>
            </div>
            <p className="text-sm font-medium text-muted-foreground ml-[52px]">
              Find the perfect environment for your child
            </p>
          </div>

          {/* Click Hint Badge */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <MousePointerClick className="w-4 h-4 text-primary animate-bounce" />
            <span className="text-xs font-bold text-primary">Tap to Explore</span>
          </motion.div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {schoolTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onTypeSelect(isSelected ? null : type.id)}
                className={cn(
                  "relative p-5 rounded-[1.75rem] text-left transition-all duration-300 group overflow-hidden cursor-pointer",
                  isSelected
                    ? `bg-gradient-to-br ${type.gradient} border-2 border-white/30 shadow-2xl shadow-${type.accentColor}-500/30`
                    : "bg-card/80 backdrop-blur-xl border-2 border-border/50 shadow-lg hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                )}
              >
                {/* Animated Background Pattern */}
                <div className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-500",
                  isSelected ? "opacity-30" : "group-hover:opacity-10"
                )}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
                </div>

                {/* Hover Glow Effect */}
                <div className={cn(
                  "absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl transition-all duration-500",
                  isSelected
                    ? "bg-white/40 opacity-100"
                    : "bg-primary/20 opacity-0 group-hover:opacity-60"
                )} />

                {/* Floating Particles on Hover */}
                <div className={cn(
                  "absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500",
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={cn(
                        "absolute w-1.5 h-1.5 rounded-full",
                        isSelected ? "bg-white/60" : "bg-primary/40"
                      )}
                      style={{
                        left: `${20 + i * 30}%`,
                        bottom: "10%",
                      }}
                      animate={{
                        y: [-20, -60, -20],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Icon with Enhanced Styling */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <motion.div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300",
                      isSelected
                        ? "bg-white/20 backdrop-blur-sm shadow-white/20"
                        : `${type.iconBg} shadow-lg group-hover:shadow-xl group-hover:scale-110`
                    )}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className={cn(
                      "w-7 h-7 transition-all duration-300",
                      isSelected ? "text-white" : "text-white"
                    )} />
                  </motion.div>

                  {/* Arrow Indicator - Shows it's clickable */}
                  <motion.div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      isSelected
                        ? "bg-white/20"
                        : "bg-primary/10 group-hover:bg-primary group-hover:shadow-lg"
                    )}
                    animate={isSelected ? {} : { x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-colors duration-300",
                      isSelected ? "text-white" : "text-primary group-hover:text-white"
                    )} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={cn(
                    "font-black text-lg mb-1.5 tracking-tight transition-colors duration-300",
                    isSelected ? "text-white" : "text-foreground"
                  )}>
                    {type.name}
                  </h3>

                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 transition-all duration-300",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isSelected ? "bg-white animate-pulse" : `bg-${type.accentColor}-500`
                    )} />
                    {type.ageGroup}
                  </div>

                  <p className={cn(
                    "text-xs font-medium leading-relaxed line-clamp-2 transition-colors duration-300",
                    isSelected ? "text-white/90" : "text-muted-foreground"
                  )}>
                    {type.description}
                  </p>
                </div>

                {/* Selected State Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/25 backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-pulse" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">Active</span>
                  </motion.div>
                )}

                {/* Bottom Shimmer Effect on Hover */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 rounded-b-[1.75rem] transition-opacity duration-300 overflow-hidden",
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  <div className={cn(
                    "h-full animate-shimmer",
                    isSelected
                      ? "bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      : "bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  )} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile Click Hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="sm:hidden flex items-center justify-center gap-2 mt-4 text-muted-foreground"
        >
          <MousePointerClick className="w-4 h-4 text-primary animate-bounce" />
          <span className="text-xs font-medium">Tap any category to explore schools</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SchoolTypeSelector;
export { schoolTypes };
