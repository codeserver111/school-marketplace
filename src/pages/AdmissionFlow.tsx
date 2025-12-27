import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MessageSquare, 
  School, 
  FileText, 
  ClipboardCheck,
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import AdmissionChat from "@/components/admission/AdmissionChat";
import SchoolMatching from "@/components/admission/SchoolMatching";
import DocumentUpload from "@/components/admission/DocumentUpload";
import ApplicationReview from "@/components/admission/ApplicationReview";
import AdmissionTimeline from "@/components/admission/AdmissionTimeline";
import { 
  ChildProfile, 
  AdmissionStep, 
  DocumentUpload as DocumentUploadType,
  ApplicationData,
  SchoolMatch
} from "@/types/admission";
import { saveApplication, getMatchedSchools } from "@/services/admissionApi";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const steps: { id: AdmissionStep; label: string; icon: React.ReactNode }[] = [
  { id: "chat", label: "Profile", icon: <MessageSquare className="w-4 h-4" /> },
  { id: "school_matching", label: "Schools", icon: <School className="w-4 h-4" /> },
  { id: "documents", label: "Documents", icon: <FileText className="w-4 h-4" /> },
  { id: "review", label: "Review", icon: <ClipboardCheck className="w-4 h-4" /> },
  { id: "timeline", label: "Track", icon: <Clock className="w-4 h-4" /> },
];

export default function AdmissionFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<AdmissionStep>("chat");
  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
  const [partialProfile, setPartialProfile] = useState<Partial<ChildProfile>>({});
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [schoolMatches, setSchoolMatches] = useState<SchoolMatch[]>([]);
  const [documents, setDocuments] = useState<DocumentUploadType[]>([]);
  const [application, setApplication] = useState<ApplicationData | null>(null);

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleChatComplete = async (profile: ChildProfile) => {
    setChildProfile(profile);
    
    // Pre-fetch school matches
    const matches = await getMatchedSchools(profile);
    setSchoolMatches(matches);
    
    // Auto-select top 3 high-chance schools
    const topSchools = matches
      .filter(m => m.chance === "High" || m.chance === "Medium")
      .slice(0, 3)
      .map(m => m.schoolId);
    setSelectedSchools(topSchools);
    
    setCurrentStep("school_matching");
  };

  const handleSchoolsContinue = () => {
    setCurrentStep("documents");
  };

  const handleDocumentsContinue = () => {
    setCurrentStep("review");
  };

  const handleEditStep = (step: string) => {
    setCurrentStep(step as AdmissionStep);
  };

  const handleSubmitApplication = async () => {
    if (!childProfile) return;

    try {
      const savedApplication = await saveApplication({
        childProfile,
        selectedSchools,
        documents,
        status: "under_review",
      });
      
      setApplication(savedApplication);
      setCurrentStep("timeline");
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    } else {
      navigate(-1);
    }
  };

  const canNavigateToStep = (stepId: AdmissionStep) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    
    switch (stepId) {
      case "chat":
        return true;
      case "school_matching":
        return !!childProfile;
      case "documents":
        return !!childProfile && selectedSchools.length > 0;
      case "review":
        return !!childProfile && selectedSchools.length > 0 && documents.length > 0;
      case "timeline":
        return !!application;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b safe-top">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold">Admission Assistant</h1>
              <p className="text-xs text-muted-foreground">
                {steps[currentStepIndex]?.label} • Step {currentStepIndex + 1} of {steps.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI Powered</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              const canNavigate = canNavigateToStep(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => canNavigate && setCurrentStep(step.id)}
                  disabled={!canNavigate}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-primary/10 text-primary",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground",
                    !canNavigate && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {step.icon}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {currentStep === "chat" && (
              <AdmissionChat
                onComplete={handleChatComplete}
                onProfileUpdate={setPartialProfile}
              />
            )}

            {currentStep === "school_matching" && childProfile && (
              <SchoolMatching
                childProfile={childProfile}
                selectedSchools={selectedSchools}
                onSchoolsSelected={setSelectedSchools}
                onContinue={handleSchoolsContinue}
              />
            )}

            {currentStep === "documents" && childProfile && (
              <DocumentUpload
                childProfile={childProfile}
                documents={documents}
                onDocumentsChange={setDocuments}
                onContinue={handleDocumentsContinue}
              />
            )}

            {currentStep === "review" && childProfile && (
              <ApplicationReview
                childProfile={childProfile}
                documents={documents}
                selectedSchools={selectedSchools}
                schoolMatches={schoolMatches}
                onEdit={handleEditStep}
                onSubmit={handleSubmitApplication}
              />
            )}

            {currentStep === "timeline" && application && (
              <AdmissionTimeline
                application={application}
                onBack={() => setCurrentStep("review")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavigation />
    </div>
  );
}
