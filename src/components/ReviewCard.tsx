import { motion } from "framer-motion";
import { ThumbsUp, BadgeCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl p-4 shadow-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {getInitials(review.parentName)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{review.parentName}</span>
              {review.verified && (
                <BadgeCheck className="w-4 h-4 text-success fill-success/20" />
              )}
            </div>
            {review.childGrade && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <GraduationCap className="w-3 h-3" />
                <span>Parent of {review.childGrade} student</span>
              </div>
            )}
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={review.rating} readonly size="sm" />
      </div>

      {/* Comment */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {review.comment}
      </p>

      {/* Helpful */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelpful}
          disabled={hasVoted}
          className={`gap-2 text-xs ${hasVoted ? "text-primary" : "text-muted-foreground"}`}
        >
          <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-primary" : ""}`} />
          Helpful ({helpfulCount})
        </Button>
        {review.verified && (
          <span className="text-xs text-success flex items-center gap-1">
            <BadgeCheck className="w-3 h-3" />
            Verified Parent
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;
