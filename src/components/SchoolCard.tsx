import { Star, MapPin, Bus, Home, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { School } from "@/data/mockSchools";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SchoolCardProps {
  school: School;
  index?: number;
}

const SchoolCard = ({ school, index = 0 }: SchoolCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/school/${school.slug}`} className="block">
        <article className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
          {/* Image section */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-shimmer" />
            )}
            <img
              src={school.images[0]}
              alt={school.name}
              className={cn(
                "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-overlay opacity-40" />
            
            {/* Save button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                setIsSaved(!isSaved);
              }}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  isSaved ? "fill-primary text-primary" : "text-foreground"
                )}
              />
            </Button>

            {/* Rating badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-success text-success-foreground px-2 py-1 rounded-md text-sm font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{school.rating}</span>
            </div>

            {/* Board badge */}
            <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-xs font-medium">
              {school.board}
            </div>
          </div>

          {/* Content section */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              {school.name}
            </h3>
            
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{school.address}</span>
              <span className="shrink-0">• {school.distance} km</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">Annual Fee</span>
                <p className="text-primary font-semibold">{school.feeRange}</p>
              </div>

              <div className="flex items-center gap-2">
                {school.hasTransport && (
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center" title="Transport Available">
                    <Bus className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                )}
                {school.hasHostel && (
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center" title="Hostel Available">
                    <Home className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default SchoolCard;
