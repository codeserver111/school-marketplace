"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Sparkles, CheckCircle, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AdmissionTimeline from "@/components/admission/AdmissionTimeline";
import AdmissionChat from "@/components/admission/AdmissionChat";
import { ChildProfile, ApplicationData } from "@/types/admission";

export default function AdmissionFlow() {
  const router = useRouter();
  const [childProfile, setChildProfile] = useState<Partial<ChildProfile>>({});
  const [application, setApplication] = useState<ApplicationData | null>(null);

  const handleProfileUpdate = (profile: Partial<ChildProfile>) => {
    setChildProfile(prev => ({ ...prev, ...profile }));
  };

  const handleComplete = (profile: ChildProfile) => {
    setChildProfile(profile);
    // Navigate to next step or save profile
    console.log("Profile completed:", profile);
  };

  const handleBack = () => {
    router.back();
  };

  const steps = [
    { id: 1, title: "School Matching", completed: true, current: false },
    { id: 2, title: "Document Prep", completed: false, current: true },
    { id: 3, title: "Application", completed: false, current: false },
    { id: 4, title: "Interview", completed: false, current: false },
    { id: 5, title: "Admission", completed: false, current: false }
  ];

  const currentStep = steps.find(step => step.current) || steps[0];

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

        {/* AI Chat */}
        <AdmissionChat
          onComplete={handleComplete}
          onProfileUpdate={handleProfileUpdate}
        />

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
