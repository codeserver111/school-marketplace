import { Star, MapPin, Bus, Home, Heart, GitCompare, Eye } from "lucide-react";
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
  const { isSaved, saveSchool, unsaveSchool } = useUser();

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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="w-full"
    >
      <article className={cn(
        "bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50",
        selected && "ring-2 ring-primary shadow-primary/20"
      )}>
        {/* Image section - More prominent like food delivery apps */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={school.images[0]}
            alt={school.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top action buttons - More subtle */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-3 backdrop-blur-md text-xs font-medium",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              )}
              onClick={handleCompareToggle}
            >
              <GitCompare className="w-3 h-3 mr-1" />
              Compare
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 backdrop-blur-md bg-white/90 hover:bg-white"
              onClick={handleSaveToggle}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  saved ? "fill-red-500 text-red-500" : "text-gray-700"
                )}
              />
            </Button>
          </div>

          {/* Rating badge - More prominent */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full shadow-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm">{school.rating}</span>
            <span className="text-xs text-gray-600">({school.reviewCount})</span>
          </div>

          {/* Board badge */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {school.board}
          </div>
        </div>

        {/* Content section - Cleaner, more modern layout */}
        <div className="p-4">
          {/* School name and tagline */}
          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
              {school.name}
            </h3>
            {school.tagline && (
              <p className="text-sm text-gray-600 line-clamp-1">{school.tagline}</p>
            )}
          </div>

          {/* Location and distance */}
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate flex-1">{school.address}</span>
            <span className="text-gray-400">•</span>
            <span className="font-medium">{school.distance} km</span>
          </div>

          {/* Class levels - Better design */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {school.classLevels.slice(0, 3).map((level) => (
              <span
                key={level}
                className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium"
              >
                {level}
              </span>
            ))}
            {school.classLevels.length > 3 && (
              <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                +{school.classLevels.length - 3} more
              </span>
            )}
          </div>

          {/* Fee and amenities - Side by side */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Monthly Fee</p>
              <p className="text-lg font-bold text-green-600">{formatMonthlyFee(school.annualFee)}*</p>
            </div>

            <div className="flex items-center gap-2">
              {school.hasTransport && (
                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                  <Bus className="w-3 h-3" />
                  <span>Transport</span>
                </div>
              )}
              {school.hasHostel && (
                <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">
                  <Home className="w-3 h-3" />
                  <span>Hostel</span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons - Prominent CTA */}
          <div className="flex gap-2">
            <Link href={`/school/${school.slug}`} className="flex-1">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default SchoolCard;
