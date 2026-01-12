import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StarRating from "./StarRating";
import { addReview } from "@/data/mockReviews";
import { toast } from "sonner";

interface WriteReviewFormProps {
  schoolId: string;
  schoolName: string;
  onClose: () => void;
  onReviewAdded: () => void;
}

const WriteReviewForm = ({
  schoolId,
  schoolName,
  onClose,
  onReviewAdded
}: WriteReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [parentName, setParentName] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const grades = [
    "Nursery", "LKG", "UKG",
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
    "Grade 11", "Grade 12"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a  Rating");
      return;
    }

    if (comment.trim().length < 20) {
      toast.error("Review must be at least 20 characters");
      return;
    }

    if (!parentName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    addReview({
      schoolId,
      parentName: parentName.trim(),
      rating,
      comment: comment.trim(),
      verified: true,
      childGrade: childGrade || undefined
    });

    toast.success("Review submitted successfully!");
    onReviewAdded();
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-card rounded-xl shadow-card overflow-hidden mb-4"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Write a Review</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Share your experience with <span className="font-medium text-foreground">{schoolName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Your Rating *
            </label>
            <StarRating rating={rating} onRatingChange={setRating} size="lg" />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Your Name *
            </label>
            <Input
              placeholder="Enter your name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              maxLength={50}
            />
          </div>

          {/* Child's Grade */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Child's Grade (Optional)
            </label>
            <Select value={childGrade} onValueChange={setChildGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Your Review *
            </label>
            <Textarea
              placeholder="Share your experience with this school (min 20 characters)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {comment.length}/500
            </div>
          </div>

          {/* Verified Badge Info */}
          <div className="flex items-center gap-2 bg-success/10 rounded-lg p-3">
            <BadgeCheck className="w-5 h-5 text-success" />
            <span className="text-sm text-success">
              Your review will be marked as verified parent
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default WriteReviewForm;
