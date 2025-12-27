import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp, ArrowUpDown, Filter, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ReviewCard from "./ReviewCard";
import WriteReviewForm from "./WriteReviewForm";
import { 
  getReviewsBySchoolId, 
  getAverageRating, 
  getRatingDistribution 
} from "@/data/mockReviews";

interface ReviewSectionProps {
  schoolId: string;
  schoolName: string;
}

type SortOption = "recent" | "highest" | "lowest" | "helpful";

const ReviewSection = ({ schoolId, schoolName }: ReviewSectionProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviews, setReviews] = useState(getReviewsBySchoolId(schoolId));
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  const { average, count } = getAverageRating(schoolId);
  const distribution = getRatingDistribution(schoolId);
  
  const sortedAndFilteredReviews = useMemo(() => {
    let filtered = showVerifiedOnly 
      ? reviews.filter(r => r.verified) 
      : reviews;
    
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });
  }, [reviews, sortBy, showVerifiedOnly]);
  
  const displayedReviews = showAllReviews ? sortedAndFilteredReviews : sortedAndFilteredReviews.slice(0, 2);
  const maxCount = Math.max(...Object.values(distribution), 1);

  const handleReviewAdded = () => {
    setReviews(getReviewsBySchoolId(schoolId));
    setShowWriteReview(false);
  };

  const verifiedCount = reviews.filter(r => r.verified).length;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Reviews & Ratings</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowWriteReview(true)}
        >
          Write Review
        </Button>
      </div>

      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-4 shadow-card mb-4"
      >
        <div className="flex gap-6">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-foreground">{average || "-"}</div>
            <div className="flex items-center gap-1 my-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(average)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{count} reviews</span>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3">{rating}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <Progress 
                  value={(distribution[rating] / maxCount) * 100} 
                  className="h-2 flex-1"
                />
                <span className="text-xs text-muted-foreground w-4 text-right">
                  {distribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sort & Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Switch 
            id="verified-filter" 
            checked={showVerifiedOnly}
            onCheckedChange={setShowVerifiedOnly}
          />
          <Label htmlFor="verified-filter" className="text-sm flex items-center gap-1 cursor-pointer">
            <CheckCircle className="w-4 h-4 text-success" />
            Verified only ({verifiedCount})
          </Label>
        </div>
      </div>

      {/* Write Review Form */}
      <AnimatePresence>
        {showWriteReview && (
          <WriteReviewForm
            schoolId={schoolId}
            schoolName={schoolName}
            onClose={() => setShowWriteReview(false)}
            onReviewAdded={handleReviewAdded}
          />
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {sortedAndFilteredReviews.length > 0 ? (
        <div className="space-y-3">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
          
          {sortedAndFilteredReviews.length > 2 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="w-full gap-2 text-primary"
            >
              {showAllReviews ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All {sortedAndFilteredReviews.length} Reviews <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>{showVerifiedOnly ? "No verified reviews yet." : "No reviews yet. Be the first to review!"}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
