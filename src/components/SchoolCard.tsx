import { Star, MapPin, Bus, Home, Heart, GitCompare, Eye, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { School } from "@/data/mockSchools";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useComparison } from "@/contexts/ComparisonContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";

// Utility function to format monthly fees
const formatMonthlyFee = (annualAmount: number): string => {
  const monthly = Math.round(annualAmount / 12);
  if (monthly >= 100000) { // 1L and above
    return `₹${(monthly / 100000).toFixed(1)}L`;
  } else if (monthly >= 1000) { // 1K and above
    return `₹${(monthly / 1000).toFixed(0)}K`;
  } else {
    return `₹${monthly.toLocaleString()}`;
  }
};

interface SchoolCardProps {
  school: School;
  index?: number;
}

const SchoolCard = ({ school, index = 0 }: SchoolCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addSchool, removeSchool, isSelected, canAdd } = useComparison();
  const { isSaved, saveSchool, unsaveSchool, isLoggedIn, isGuest } = useUser();

  const selected = isSelected(school.id);
  const saved = isSaved(school.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selected) {
      removeSchool(school.id);
    } else {
      if (!canAdd) {
        toast({
          title: "Maximum 3 schools",
          description: "Remove a school to add another",
          variant: "destructive",
        });
        return;
      }
      addSchool(school);
      toast({
        title: "Added to compare",
        description: `${school.name} added`,
      });
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoggedIn && !isGuest) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save schools to your list",
      });
      useUser().openAuthModal("login");
      return;
    }

    if (saved) {
      unsaveSchool(school.id);
      toast({
        title: "Removed from saved",
        description: `${school.name} removed`,
      });
    } else {
      saveSchool(school);
      toast({
        title: "Saved!",
        description: `${school.name} added to your list`,
      });
    }
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      <article className={cn(
        "group relative bg-card rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-premium transition-all duration-500 border border-white/10 flex flex-col h-full",
        selected && "ring-2 ring-primary shadow-primary/20 bg-primary/5"
      )}>
        {/* Image section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={school.images[0]}
            alt={school.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Top action buttons & Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="glass px-3 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg border-white/20 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {school.board}
                </div>
              </motion.div>
              {school.isPopular && (
                <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <div className="bg-accent/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSaveToggle}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center border-white/20 shadow-lg"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all duration-300",
                    saved ? "fill-primary text-primary drop-shadow-[0_0_8px_rgba(226,55,68,0.5)]" : "text-white"
                  )}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCompareToggle}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border-white/20 shadow-lg transition-all duration-300",
                  selected ? "bg-primary text-white" : "glass text-white"
                )}
              >
                <GitCompare className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Bottom Badge - Rating */}
          <div className="absolute bottom-4 left-4">
            <div className="glass px-3 py-2 rounded-2xl flex items-center gap-2 border-white/20 shadow-xl">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center shadow-inner">
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white leading-none tracking-tight">{school.rating}</span>
                <span className="text-[9px] font-bold text-white/60 leading-none mt-1 uppercase tracking-wider">{school.reviewCount} Reviews</span>
              </div>
            </div>
          </div>

          {/* Distance Badge */}
          <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-2xl flex items-center gap-1.5 border-white/20 shadow-xl">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-black text-white uppercase tracking-wider">{school.distance} km</span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-7 flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {school.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/80 font-bold text-[11px] uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              <span className="truncate">{school.address}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {school.classLevels.slice(0, 2).map((level) => (
              <span
                key={level}
                className="text-[9px] font-black uppercase tracking-widest bg-primary/5 text-primary px-3 py-1.5 rounded-lg border border-primary/10 shadow-sm"
              >
                {level}
              </span>
            ))}
            {school.classLevels.length > 2 && (
              <span className="text-[9px] font-black uppercase tracking-widest bg-secondary/50 text-muted-foreground px-3 py-1.5 rounded-lg border border-border/50">
                +{school.classLevels.length - 2} More
              </span>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-dashed border-border/50 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">Monthly Fee</p>
              <p className="text-2xl font-black text-success leading-none flex items-baseline">
                {formatMonthlyFee(school.annualFee)}
                <span className="text-[10px] font-bold text-muted-foreground/60 ml-1 uppercase tracking-wider">/mo</span>
              </p>
            </div>

            <Link href={`/school/${school.slug}`}>
              <Button className="rounded-2xl bg-foreground hover:bg-primary text-background hover:text-white font-black px-7 h-12 shadow-xl shadow-black/5 hover:shadow-primary/20 transition-all duration-300 gap-2 text-xs tracking-widest">
                EXPLORE
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default SchoolCard;
