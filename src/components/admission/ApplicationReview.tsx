import { motion } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  MapPin, 
  IndianRupee, 
  FileText,
  CheckCircle,
  School,
  Edit2,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChildProfile, 
  DocumentUpload as DocumentUploadType,
  SchoolMatch
} from "@/types/admission";
import { schools } from "@/data/mockSchools";
import { cn } from "@/lib/utils";

interface ApplicationReviewProps {
  childProfile: ChildProfile;
  documents: DocumentUploadType[];
  selectedSchools: string[];
  schoolMatches: SchoolMatch[];
  onEdit: (step: string) => void;
  onSubmit: () => void;
}

export default function ApplicationReview({
  childProfile,
  documents,
  selectedSchools,
  schoolMatches,
  onEdit,
  onSubmit,
}: ApplicationReviewProps) {
  const getMatchForSchool = (schoolId: string) => {
    return schoolMatches.find(m => m.schoolId === schoolId);
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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <h2 className="text-lg font-semibold">Review Application</h2>
        <p className="text-sm text-muted-foreground">
          Verify all details before submitting
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Child Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            <div className="p-4 bg-muted/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Child Profile</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit("chat")}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">{childProfile.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="font-medium">{childProfile.age} years</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Target Class</p>
                  <p className="font-medium">{childProfile.targetClass}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Preferred Board</p>
                  <p className="font-medium">{childProfile.board}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {childProfile.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {(childProfile.budget.min / 100000).toFixed(1)}L - {(childProfile.budget.max / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Academic Level</p>
                <Badge variant="secondary" className="mt-1">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {childProfile.academicLevel}
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Documents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="p-4 bg-muted/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Documents</h3>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  {documents.filter(d => d.status === "verified").length} Verified
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit("documents")}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg text-sm",
                      doc.status === "verified" && "bg-success/5",
                      doc.status === "mismatch" && "bg-accent/5"
                    )}
                  >
                    <CheckCircle className={cn(
                      "w-4 h-4",
                      doc.status === "verified" ? "text-success" : "text-accent"
                    )} />
                    <span className="line-clamp-1">
                      {doc.type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Selected Schools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="p-4 bg-muted/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Selected Schools</h3>
                <Badge variant="secondary">{selectedSchools.length}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit("school_matching")}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="p-4 space-y-3">
              {selectedSchools.map((schoolId) => {
                const school = schools.find(s => s.id === schoolId);
                const match = getMatchForSchool(schoolId);
                if (!school) return null;

                return (
                  <div
                    key={schoolId}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                  >
                    <img
                      src={school.images[0]}
                      alt={school.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{school.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {school.board} • {school.feeRange}
                      </p>
                    </div>
                    {match && (
                      <Badge className={cn("text-xs", getChanceColor(match.chance))}>
                        {match.chance}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Application JSON Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="p-4 bg-muted/50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Generated Application Data</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Auto-generated from your chat conversation
              </p>
            </div>
            <div className="p-4">
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                {JSON.stringify({
                  child: {
                    name: childProfile.name,
                    age: childProfile.age,
                    dob: childProfile.dateOfBirth,
                    targetClass: childProfile.targetClass,
                  },
                  preferences: {
                    board: childProfile.board,
                    location: childProfile.location,
                    budget: childProfile.budget,
                    academics: childProfile.academicLevel,
                  },
                  schools: selectedSchools,
                  documentsUploaded: documents.length,
                }, null, 2)}
              </pre>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t bg-card">
        <Button className="w-full" size="lg" onClick={onSubmit}>
          <Send className="w-4 h-4 mr-2" />
          Submit Application
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          By submitting, you agree to share this information with selected schools
        </p>
      </div>
    </div>
  );
}
