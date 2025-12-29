import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Check,
  X,
  AlertCircle,
  Star,
  MapPin,
  IndianRupee,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  Eye,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { SchoolCardSkeleton } from "@/components/ui/skeleton";
import { ChildProfile, SchoolMatch, MatchFactor } from "@/types/admission";
import { getMatchedSchools } from "@/services/admissionApi";
import { schools } from "@/data/mockSchools";
import { cn } from "@/lib/utils";

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

interface SchoolMatchingProps {
  childProfile: ChildProfile;
  selectedSchools: string[];
  onSchoolsSelected: (schoolIds: string[]) => void;
  onContinue: () => void;
}

export default function SchoolMatching({
  childProfile,
  selectedSchools,
  onSchoolsSelected,
  onContinue
}: SchoolMatchingProps) {
  const router = useRouter();
  const [matches, setMatches] = useState<SchoolMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [savedSchools, setSavedSchools] = useState<string[]>([]);
  const [appliedSchools, setAppliedSchools] = useState<string[]>([]);

  useEffect(() => {
    loadMatches();
    // Load saved schools from localStorage
    const saved = localStorage.getItem('savedSchools');
    if (saved) {
      setSavedSchools(JSON.parse(saved));
    }
  }, [childProfile]);

  const handleSaveSchool = (schoolId: string) => {
    const newSaved = savedSchools.includes(schoolId)
      ? savedSchools.filter(id => id !== schoolId)
      : [...savedSchools, schoolId];

    setSavedSchools(newSaved);
    localStorage.setItem('savedSchools', JSON.stringify(newSaved));
  };

  const handleViewDetails = (schoolId: string) => {
    router.push(`/school/${schoolId}`);
  };

  const handleApplyToSchool = (schoolId: string) => {
    if (!appliedSchools.includes(schoolId)) {
      setAppliedSchools(prev => [...prev, schoolId]);
      // Here you would typically make an API call to submit the application
      console.log(`Applied to school: ${schoolId}`);
    }
  };

  const loadMatches = async () => {
    setLoading(true);
    const results = await getMatchedSchools(childProfile);
    setMatches(results);
    setLoading(false);
  };

  const toggleSchool = (schoolId: string) => {
    if (selectedSchools.includes(schoolId)) {
      onSchoolsSelected(selectedSchools.filter(id => id !== schoolId));
    } else {
      onSchoolsSelected([...selectedSchools, schoolId]);
    }
  };

  const getChanceColor = (chance: string) => {
    switch (chance) {
      case "High":
        return "bg-success/10 text-success border-success/30";
      case "Medium":
        return "bg-accent/10 text-accent border-accent/30";
      case "Low":
        return "bg-destructive/10 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getChanceIcon = (chance: string) => {
    switch (chance) {
      case "High":
        return <TrendingUp className="w-4 h-4" />;
      case "Medium":
        return <Minus className="w-4 h-4" />;
      case "Low":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getFactorIcon = (status: string) => {
    switch (status) {
      case "positive":
        return <Check className="w-3 h-3 text-success" />;
      case "negative":
        return <X className="w-3 h-3 text-destructive" />;
      default:
        return <AlertCircle className="w-3 h-3 text-accent" />;
    }
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <div>
            <h2 className="text-lg font-semibold">Finding Best Matches...</h2>
            <p className="text-sm text-muted-foreground">Analyzing {schools.length} schools for {childProfile.name}</p>
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex gap-4">
              <Skeleton className="w-20 h-20 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">School Matches</h2>
            <p className="text-sm text-muted-foreground">
              Found {matches.length} schools for {childProfile.name}
            </p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            {selectedSchools.length} selected
          </Badge>
        </div>

        {/* Profile Summary */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            <GraduationCap className="w-3 h-3 mr-1" />
            {childProfile.targetClass}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {childProfile.board}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            {childProfile.location}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <IndianRupee className="w-3 h-3 mr-1" />
            {(childProfile.budget.max / 100000).toFixed(1)}L max
          </Badge>
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {matches.map((match, index) => {
          const school = schools.find(s => s.id === match.schoolId);
          if (!school) return null;

          const isExpanded = expandedSchool === match.schoolId;
          const isSelected = selectedSchools.includes(match.schoolId);

          return (
            <motion.div
              key={match.schoolId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={cn(
                  "overflow-hidden transition-all",
                  isSelected && "ring-2 ring-primary"
                )}
              >
                <div className="p-4">
                  <div className="flex gap-3">
                    {/* Checkbox */}
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSchool(match.schoolId)}
                      className="mt-1"
                    />

                    {/* School Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={school.images[0]}
                        alt={school.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* School Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                            {school.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs py-0">
                              {school.board}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Star className="w-3 h-3 text-accent fill-accent mr-0.5" />
                              {school.rating}
                            </span>
                          </div>
                        </div>

                        {/* Chance Badge */}
                        <Badge 
                          className={cn(
                            "flex items-center gap-1 text-xs font-medium",
                            getChanceColor(match.chance)
                          )}
                        >
                          {getChanceIcon(match.chance)}
                          {match.chance}
                        </Badge>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {school.distance} km
                        </span>
                        <span className="flex items-center">
                          <IndianRupee className="w-3 h-3 mr-0.5" />
                          {formatMonthlyFee(school.annualFee)}/month*
                        </span>
                      </div>

                      {/* Score Bar */}
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Match Score</span>
                          <span className="font-medium">{match.score}%</span>
                        </div>
                        <Progress value={match.score} className="h-1.5" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleViewDetails(match.schoolId)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>

                      <Button
                        variant={savedSchools.includes(match.schoolId) ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => handleSaveSchool(match.schoolId)}
                      >
                        <Bookmark className={cn(
                          "w-3 h-3",
                          savedSchools.includes(match.schoolId) && "fill-current"
                        )} />
                      </Button>

                      {appliedSchools.includes(match.schoolId) ? (
                        <Badge variant="secondary" className="text-xs px-2 py-1">
                          <Check className="w-3 h-3 mr-1" />
                          Applied
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleApplyToSchool(match.schoolId)}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedSchool(isExpanded ? null : match.schoolId)}
                    className="w-full mt-3 pt-3 border-t flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        View Match Factors
                      </>
                    )}
                  </button>

                  {/* Expanded Factors */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t space-y-2"
                    >
                      {match.factors.map((factor, i) => (
                        <div 
                          key={i}
                          className={cn(
                            "flex items-start gap-2 p-2 rounded-lg text-sm",
                            factor.status === "positive" && "bg-success/5",
                            factor.status === "negative" && "bg-destructive/5",
                            factor.status === "neutral" && "bg-muted/50"
                          )}
                        >
                          <div className="mt-0.5">
                            {getFactorIcon(factor.status)}
                          </div>
                          <div>
                            <span className="font-medium">{factor.name}:</span>{" "}
                            <span className="text-muted-foreground">{factor.detail}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t bg-card">
        {appliedSchools.length > 0 ? (
          <div className="space-y-3">
            <div className="text-center">
              <Check className="w-8 h-8 text-success mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Applications Submitted!</h3>
              <p className="text-sm text-muted-foreground">
                You've applied to {appliedSchools.length} school{appliedSchools.length !== 1 ? "s" : ""}.
                We'll notify you of any updates.
              </p>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => router.push('/profile')}
            >
              View Application Status
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            size="lg"
            onClick={onContinue}
            disabled={selectedSchools.length === 0}
          >
            Continue with {selectedSchools.length} School{selectedSchools.length !== 1 ? "s" : ""}
          </Button>
        )}
      </div>
    </div>
  );
}
