"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, CheckCircle, Clock, Users, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdmissionTimeline from "@/components/admission/AdmissionTimeline";
import AdmissionChat from "@/components/admission/AdmissionChat";
import SchoolMatching from "@/components/admission/SchoolMatching";
import { AdmissionChatSkeleton, SchoolMatchingSkeleton } from "@/components/ui/skeleton";
import { ChildProfile, ApplicationData } from "@/types/admission";
import { toast } from "@/hooks/use-toast";
import "./animations.css";

export default function AdmissionFlow() {
  const router = useRouter();
  const [childProfile, setChildProfile] = useState<Partial<ChildProfile>>({});
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'chat' | 'school_matching'>('chat');
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMatchingLoading, setIsMatchingLoading] = useState(false);

  // Background blobs animation state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleProfileUpdate = (profile: Partial<ChildProfile>) => {
    setChildProfile(prev => ({ ...prev, ...profile }));
  };

  const handleComplete = (profile: ChildProfile) => {
    setChildProfile(profile);
    setIsMatchingLoading(true);

    // Simulate matching algorithm processing with a smoother transition
    setCurrentPhase('school_matching'); // Switch immediately to show loading state in the matching component if needed, or keep loading state here

    setTimeout(() => {
      setIsMatchingLoading(false);
    }, 2500);

    console.log("Profile completed:", profile);
  };

  const handleSchoolsSelected = (schoolIds: string[]) => {
    setSelectedSchools(schoolIds);
    console.log("Schools selected:", schoolIds);
  };

  const handleContinueToDocuments = () => {
    router.push('/');
    toast({
      title: "Applications Initiated! 🚀",
      description: `You've successfully started applications for ${selectedSchools.length} schools. Good luck!`,
      duration: 5000,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { id: 1, title: "Profile", icon: <Users className="w-4 h-4" />, completed: currentPhase === 'school_matching', current: currentPhase === 'chat' },
    { id: 2, title: "Matching", icon: <Sparkles className="w-4 h-4" />, completed: selectedSchools.length > 0, current: currentPhase === 'school_matching' },
    { id: 3, title: "Documents", icon: <BookOpen className="w-4 h-4" />, completed: false, current: false },
    { id: 4, title: "Apply", icon: <GraduationCap className="w-4 h-4" />, completed: false, current: false },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 animate-gradient-xy" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-primary animate-spin-slow" />
          </div>
          <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300">
            Initializing AI Guide...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <motion.div
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -0.05,
            y: mousePosition.y * -0.05,
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-pink-200/10 dark:bg-pink-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Glassmorphic Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-colors"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5 text-foreground/80" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300">
                AI Guide
              </span>
            </div>

            <div className="w-10" /> {/* Spacer for balance */}
          </div>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-24 pb-20 px-4 min-h-screen">
        <div className="max-w-3xl mx-auto">

          {/* 3D Step Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-x-auto pb-4 scrollbar-hide"
          >
            <div className="flex items-center justify-between min-w-[300px] bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/20 dark:border-white/5 shadow-sm">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative
                    ${step.current
                      ? "bg-white dark:bg-slate-800 shadow-md scale-105 z-10"
                      : step.completed
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground opacity-60"}
                  `}>
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className={step.current ? "text-indigo-600 dark:text-indigo-400" : ""}>
                        {step.icon}
                      </span>
                    )}
                    <span className={`text-sm font-medium ${step.current ? "text-foreground" : ""}`}>
                      {step.title}
                    </span>
                    {step.current && (
                      <motion.div
                        layoutId="active-step-glow"
                        className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 -z-10"
                      />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 rounded-full transition-colors duration-500 ${step.completed ? 'bg-green-500/50' : 'bg-input/20'}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dynamic Content Container */}
          <AnimatePresence mode="wait">
            {currentPhase === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-[600px] md:h-[700px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden relative"
              >
                <AdmissionChat
                  onComplete={handleComplete}
                  onProfileUpdate={handleProfileUpdate}
                />
              </motion.div>
            )}

            {currentPhase === 'school_matching' && (
              <motion.div
                key="matching"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="min-h-[600px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden relative"
              >
                {isMatchingLoading ? (
                  <SchoolMatchingSkeleton />
                ) : (
                  <SchoolMatching
                    childProfile={childProfile as ChildProfile}
                    selectedSchools={selectedSchools}
                    onSchoolsSelected={handleSchoolsSelected}
                    onContinue={handleContinueToDocuments}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

