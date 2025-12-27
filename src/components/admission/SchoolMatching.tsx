import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ChildProfile, SchoolMatch, MatchFactor } from "@/types/admission";
import { getMatchedSchools } from "@/services/admissionApi";
import { schools } from "@/data/mockSchools";
import { cn } from "@/lib/utils";

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
  const [matches, setMatches] = useState<SchoolMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);

  useEffect(() => {
    loadMatches();
  }, [childProfile]);

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
                          {school.feeRange}
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
        <Button 
          className="w-full" 
          size="lg"
          onClick={onContinue}
          disabled={selectedSchools.length === 0}
        >
          Continue with {selectedSchools.length} School{selectedSchools.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
}
