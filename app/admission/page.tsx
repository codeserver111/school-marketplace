"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, CheckCircle, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AdmissionTimeline from "@/components/admission/AdmissionTimeline";
import AdmissionChat from "@/components/admission/AdmissionChat";
import SchoolMatching from "@/components/admission/SchoolMatching";
import { AdmissionChatSkeleton, SchoolMatchingSkeleton } from "@/components/ui/skeleton";
import { ChildProfile, ApplicationData } from "@/types/admission";
import { toast } from "@/hooks/use-toast";

export default function AdmissionFlow() {
  const router = useRouter();
  const [childProfile, setChildProfile] = useState<Partial<ChildProfile>>({});
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'chat' | 'school_matching'>('chat');
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMatchingLoading, setIsMatchingLoading] = useState(false);

  const handleProfileUpdate = (profile: Partial<ChildProfile>) => {
    setChildProfile(prev => ({ ...prev, ...profile }));
  };

  const handleComplete = (profile: ChildProfile) => {
    setChildProfile(profile);
    setIsMatchingLoading(true);

    // Simulate matching algorithm processing
    setTimeout(() => {
      setIsMatchingLoading(false);
      setCurrentPhase('school_matching');
    }, 2000); // Show loading for 2 seconds

    console.log("Profile completed:", profile);
  };

  const handleSchoolsSelected = (schoolIds: string[]) => {
    setSelectedSchools(schoolIds);
    console.log("Schools selected:", schoolIds);
  };

  const handleContinueToDocuments = () => {
    // For now, just navigate back to home or show a success message
    // In a real app, this would navigate to document upload
    router.push('/');
    toast({
      title: "Schools Selected!",
      description: `You've selected ${selectedSchools.length} school${selectedSchools.length !== 1 ? "s" : ""} for application.`,
    });
  };

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Show skeletons for 0.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const steps = [
    { id: 1, title: "Profile Setup", completed: currentPhase === 'school_matching', current: currentPhase === 'chat' },
    { id: 2, title: "School Matching", completed: selectedSchools.length > 0, current: currentPhase === 'school_matching' },
    { id: 3, title: "Document Prep", completed: false, current: false },
    { id: 4, title: "Application", completed: false, current: false },
    { id: 5, title: "Interview", completed: false, current: false },
    { id: 6, title: "Admission", completed: false, current: false }
  ];

  const currentStep = steps.find(step => step.current) || steps[0];

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header Skeleton */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border safe-top shadow-sm animate-pulse">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="w-5 h-5 bg-muted rounded" />
            <div className="h-5 bg-muted rounded w-32" />
            <div className="w-10" />
          </div>
        </div>

        <div className="pt-14 px-4 py-6">
          {/* Progress Skeleton */}
          <div className="mb-6 animate-pulse">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-4 bg-muted rounded w-16" />
            </div>
            <div className="h-2 bg-muted rounded-full" />
          </div>

          {/* Content Skeleton */}
          <AdmissionChatSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border safe-top"
      >
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Admission Guide
          </h1>
          <div className="w-10" />
        </div>
      </motion.header>

      <div className="pt-14 px-4 py-6">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Admission Progress</span>
            <span className="text-sm text-muted-foreground">Step {currentStep.id} of {steps.length}</span>
          </div>
          <Progress value={(currentStep.id / steps.length) * 100} className="h-2" />
        </motion.div>

        {/* Current Step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-6 shadow-card mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{currentStep.title}</h2>
              <p className="text-sm text-muted-foreground">Let's get your documents ready</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success shrink-0" />
              <span className="text-sm text-foreground">School preferences selected</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-foreground">Document checklist ready</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <Users className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">Application forms pending</span>
            </div>
          </div>
        </motion.div>

        {/* Phase Content */}
        {currentPhase === 'chat' ? (
          <AdmissionChat
            onComplete={handleComplete}
            onProfileUpdate={handleProfileUpdate}
          />
        ) : isMatchingLoading ? (
          <SchoolMatchingSkeleton />
        ) : (
          <SchoolMatching
            childProfile={childProfile as ChildProfile}
            selectedSchools={selectedSchools}
            onSchoolsSelected={handleSchoolsSelected}
            onContinue={handleContinueToDocuments}
          />
        )}

        {/* Timeline */}
        {application && (
          <AdmissionTimeline
            application={application}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
