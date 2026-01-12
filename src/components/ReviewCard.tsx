import { motion } from "framer-motion";
import { ThumbsUp, BadgeCheck, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import StarRating from "./StarRating";
import { Review } from "@/data/mockReviews";
import { useState } from "react";

interface ReviewCardProps {
  review: Review;
  index?: number;
}

const ReviewCard = ({ review, index = 0 }: ReviewCardProps) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      whileHover={{ x: 5 }}
      className="glass rounded-[2rem] p-6 border-white/10 shadow-card relative overflow-hidden group"
    >
      {/* Verification Badge */}
      {review.verified && (
        <div className="absolute top-0 right-0">
          <div className="bg-success text-white px-3 py-1 rounded-bl-2xl flex items-center gap-1.5 shadow-lg">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <span className="font-black text-xl tracking-tighter">
              {getInitials(review.parentName)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-foreground tracking-tight">{review.parentName}</span>
            </div>
            {review.childGrade && (
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Parent of {review.childGrade} student</span>
              </div>
            )}
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{formatDate(review.date)}</span>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={review.rating} readonly size="sm" />
      </div>

      {/* Comment */}
      <p className="text-sm font-medium text-foreground/80 leading-relaxed mb-6 italic">
        "{review.comment}"
      </p>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-5 border-t border-white/5">
        <button
          onClick={handleHelpful}
          disabled={hasVoted}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
            hasVoted
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
          )}
        >
          <ThumbsUp className={cn("w-3.5 h-3.5", hasVoted && "fill-current animate-bounce")} />
          Worthwhile ({helpfulCount})
        </button>

        <div className="flex items-center gap-1.5 opacity-40">
          <div className="w-1 h-1 bg-foreground rounded-full" />
          <div className="w-1 h-1 bg-foreground rounded-full" />
          <div className="w-1 h-1 bg-foreground rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
