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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Parent Perspectives</h2>
        </div>
        <Button
          variant="hero"
          size="sm"
          onClick={() => setShowWriteReview(true)}
          className="rounded-2xl h-11 px-6 text-[10px] font-black uppercase tracking-widest"
        >
          Share Experience
        </Button>
      </div>

      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] p-8 border-white/20 shadow-premium mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-10 -mt-10" />

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Institutional Quality</span>
            <div className="text-6xl font-black text-foreground tracking-tighter mb-2">{average || "-"}</div>
            <div className="flex items-center gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(average)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/20"
                    }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-muted-foreground">Based on {count} verified reviews</span>
          </div>

          {/* Distribution */}
          <div className="flex-1 w-full space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-4">
                <span className="text-[10px] font-black text-muted-foreground w-4">{rating}</span>
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(distribution[rating] / maxCount) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary"
                  />
                </div>
                <span className="text-[10px] font-black text-muted-foreground w-6 text-right">
                  {distribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sort & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 glass p-4 rounded-[2rem] border-white/10">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="flex-1 sm:w-[180px] h-11 rounded-xl border-white/10 glass bg-transparent text-[10px] font-black uppercase tracking-widest">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass-dark border-white/10">
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3 ml-auto bg-muted/20 px-4 py-2 rounded-xl">
          <Label htmlFor="verified-filter" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-success" />
            Verified only
          </Label>
          <Switch
            id="verified-filter"
            checked={showVerifiedOnly}
            onCheckedChange={setShowVerifiedOnly}
            className="data-[state=checked]:bg-success"
          />
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
        <div className="space-y-6">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}

          {sortedAndFilteredReviews.length > 2 && (
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="w-full h-14 rounded-2xl glass border-white/10 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-white/5"
            >
              {showAllReviews ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Explore all {sortedAndFilteredReviews.length} Perspectives <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-[2rem] border-white/10">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-muted-foreground/30" />
          </div>
          <p className="text-sm font-bold text-muted-foreground">
            {showVerifiedOnly ? "No verified reviews yet." : "No reviews yet. Be the first to review!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
