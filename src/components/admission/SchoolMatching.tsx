import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
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
  Eye,
  Bookmark,
  Building2,
  ThumbsUp,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ChildProfile, SchoolMatch } from "@/types/admission";
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
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadMatches();
    const saved = localStorage.getItem('savedSchools');
    if (saved) {
      setSavedSchools(JSON.parse(saved));
    }
  }, [childProfile]);

  const handleSaveSchool = (schoolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = savedSchools.includes(schoolId)
      ? savedSchools.filter(id => id !== schoolId)
      : [...savedSchools, schoolId];

    setSavedSchools(newSaved);
    localStorage.setItem('savedSchools', JSON.stringify(newSaved));
  };

  const handleApplyToSchool = (schoolId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!appliedSchools.includes(schoolId)) {
      setAppliedSchools(prev => [...prev, schoolId]);
    }
  };

  const loadMatches = async () => {
    setLoading(true);
    // Simulate slight network delay for effect
    const results = await getMatchedSchools(childProfile);
    setTimeout(() => {
      setMatches(results);
      setLoading(false);
    }, 1500);
  };

  const toggleSchool = (schoolId: string) => {
    if (selectedSchools.includes(schoolId)) {
      onSchoolsSelected(selectedSchools.filter(id => id !== schoolId));
    } else {
      onSchoolsSelected([...selectedSchools, schoolId]);
    }
  };

  const getChanceConfig = (chance: string) => {
    switch (chance) {
      case "High":
        return { color: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20", icon: <TrendingUp className="w-3 h-3" /> };
      case "Medium":
        return { color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20", icon: <Minus className="w-3 h-3" /> };
      case "Low":
        return { color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20", icon: <TrendingUp className="w-3 h-3 rotate-180" /> };
      default:
        return { color: "text-gray-500 bg-gray-50", icon: <Minus className="w-3 h-3" /> };
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-indigo-100 dark:border-indigo-900/30 border-t-indigo-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-indigo-500/50" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Finding Perfect Matches</h3>
          <p className="text-muted-foreground mt-2 max-w-xs mx-auto">Analyzing academic programs, distance, and fee structures for {childProfile.name}...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50">
      {/* Header */}
      <div className="p-6 border-b border-white/20 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              School Matches
            </h2>
            <p className="text-sm text-muted-foreground">
              We found <span className="font-semibold text-foreground">{matches.length} schools</span> matching your criteria
            </p>
          </div>
          {selectedSchools.length > 0 && (
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 px-3 py-1 text-sm shadow-lg shadow-indigo-500/20">
              {selectedSchools.length} Selected
            </Badge>
          )}
        </div>

        {/* Profile Tags */}
        <div className="flex flex-wrap gap-2">
          {childProfile.targetClass && (
            <Badge variant="outline" className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/30">
              <GraduationCap className="w-3 h-3 mr-1.5 text-indigo-500" />
              {childProfile.targetClass}
            </Badge>
          )}
          {childProfile.location && (
            <Badge variant="outline" className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/30">
              <MapPin className="w-3 h-3 mr-1.5 text-rose-500" />
              {childProfile.location.split(',')[0]}
            </Badge>
          )}
          <Badge variant="outline" className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/30">
            <IndianRupee className="w-3 h-3 mr-1.5 text-green-500" />
            Max {(childProfile.budget.max / 100000).toFixed(0)}L
          </Badge>
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-slate-700">
        {matches.map((match, index) => {
          const school = schools.find(s => s.id === match.schoolId);
          if (!school) return null;
          const isSelected = selectedSchools.includes(match.schoolId);
          const isExpanded = expandedSchool === match.schoolId;
          const chanceConfig = getChanceConfig(match.chance);

          return (
            <motion.div
              key={match.schoolId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
              onClick={() => toggleSchool(match.schoolId)}
              className={cn(
                "group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer overflow-hidden",
                isSelected
                  ? "ring-2 ring-indigo-500 border-indigo-500 shadow-indigo-100 dark:shadow-indigo-900/20 scale-[1.01]"
                  : "border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md"
              )}
            >
              {/* Selection Checkmark */}
              <div className={cn(
                "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10",
                isSelected
                  ? "bg-indigo-500 border-indigo-500 text-white scale-110"
                  : "border-muted-foreground/30 bg-white/50 dark:bg-black/20 group-hover:border-indigo-400"
              )}>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>

              <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="sm:w-32 h-32 sm:h-auto relative">
                  <img
                    src={school.images[0]}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
                  <div className="absolute bottom-2 left-2 sm:hidden text-white font-bold text-lg">
                    <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-400" /> {match.score}% Match</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-[10px] px-1.5 h-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {school.board}
                        </Badge>
                        <div className="flex items-center text-[11px] font-medium text-amber-500">
                          <Star className="w-3 h-3 fill-current mr-0.5" />
                          {school.rating}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-indigo-600 transition-colors">
                        {school.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1" /> {school.address}, {school.city}
                      </p>
                    </div>

                    <div className="hidden sm:flex flex-col items-end gap-1">
                      <div className="text-2xl font-black text-indigo-600/20 dark:text-indigo-400/20 relative">
                        {match.score}%
                        <span className="absolute inset-0 text-indigo-600 dark:text-indigo-400 blur-sm opacity-50">{match.score}%</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Match Score</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg Fee</span>
                      <span className="font-semibold text-foreground">{formatMonthlyFee(school.annualFee)}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Admit Chance</span>
                      <div className={cn("flex items-center gap-1 font-semibold text-xs px-2 py-0.5 rounded-full w-fit mt-0.5", chanceConfig.color)}>
                        {chanceConfig.icon}
                        {match.chance}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-dashed space-y-2">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Why this matches</h4>
                          {match.factors.map((factor, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <div className={cn(
                                "mt-0.5 p-0.5 rounded-full bg-slate-100 dark:bg-slate-800",
                                factor.status === "positive" ? "text-green-500" :
                                  factor.status === "negative" ? "text-red-500" : "text-amber-500"
                              )}>
                                {factor.status === "positive" ? <Check className="w-3 h-3" /> : factor.status === "negative" ? <X className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                              </div>
                              <div>
                                <span className="font-medium text-foreground">{factor.name}:</span> <span className="text-muted-foreground">{factor.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4 pt-2">
                          <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); router.push(`/school/${match.schoolId}`); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </Button>
                          <Button
                            size="sm"
                            variant={savedSchools.includes(match.schoolId) ? "default" : "secondary"}
                            className={cn("flex-1", savedSchools.includes(match.schoolId) && "bg-indigo-600 text-white hover:bg-indigo-700")}
                            onClick={(e) => handleSaveSchool(match.schoolId, e)}
                          >
                            <Bookmark className={cn("w-4 h-4 mr-2", savedSchools.includes(match.schoolId) && "fill-current")} />
                            {savedSchools.includes(match.schoolId) ? "Saved" : "Save"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    className="w-full flex items-center justify-center mt-2 pt-2 text-xs text-muted-foreground hover:text-indigo-600 transition-colors"
                    onClick={(e) => { e.stopPropagation(); setExpandedSchool(isExpanded ? null : match.schoolId); }}
                  >
                    {isExpanded ? (
                      <>Hide Details <ChevronUp className="w-3 h-3 ml-1" /></>
                    ) : (
                      <>View Details & Factors <ChevronDown className="w-3 h-3 ml-1" /></>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer / Continue Section */}
      <div className="p-4 border-t border-white/20 dark:border-white/5 bg-white/60 dark:bg-black/40 backdrop-blur-md">
        {appliedSchools.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-500 font-medium p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <ThumbsUp className="w-5 h-5" />
              Applications Sent to {appliedSchools.length} Schools!
            </div>
            <Button className="w-full bg-slate-900 text-white" onClick={() => router.push('/profile')}>View Applications Status</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm px-1">
              <span className="text-muted-foreground">{selectedSchools.length} schools selected</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline" onClick={() => onSchoolsSelected(matches.map(m => m.schoolId).slice(0, 3))}>
                Select Top 3 Matches
              </span>
            </div>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98]"
              onClick={onContinue}
              disabled={selectedSchools.length === 0}
            >
              Continue & Apply <ChevronDown className="w-4 h-4 -rotate-90 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
