"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  GraduationCap,
  Calendar,
  Bus,
  Home,
  Award,
  CalendarCheck,
  IndianRupee,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ImageGallery from "@/components/ImageGallery";
import AmenityBadge from "@/components/AmenityBadge";
import EnquiryForm from "@/components/EnquiryForm";
import ReviewSection from "@/components/ReviewSection";
import VisitBookingForm from "@/components/VisitBookingForm";
import AdmissionDeadlines from "@/components/AdmissionDeadlines";
import FeeCalculator from "@/components/FeeCalculator";
import SchoolAchievements from "@/components/SchoolAchievements";
import VirtualTour from "@/components/VirtualTour";
import SchoolComparisonChart from "@/components/SchoolComparisonChart";
import { getSchoolBySlug } from "@/data/mockSchools";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
import { SchoolDetailHeaderSkeleton, SchoolDetailContentSkeleton } from "@/components/ui/skeleton";

interface SchoolDetailPageProps {
  params: {
    slug: string;
  };
}

export default function SchoolDetailClient({ params }: SchoolDetailPageProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isVisitSheetOpen, setIsVisitSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const school = getSchoolBySlug(params.slug);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Show skeletons for 1.2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!school) {
    notFound();
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: school.name,
        text: school.tagline,
        url: window.location.href,
      });
    } catch {
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <SchoolDetailHeaderSkeleton />
        <SchoolDetailContentSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="w-12 h-12 glass rounded-2xl border-white/20 active:scale-90 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className="w-12 h-12 glass rounded-2xl border-white/20 active:scale-90 transition-transform"
            >
              <Heart
                className={cn(
                  "w-6 h-6 transition-all",
                  isSaved && "fill-primary text-primary scale-110"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="w-12 h-12 glass rounded-2xl border-white/20 active:scale-90 transition-transform"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Image Gallery */}
      <ImageGallery images={school.images} schoolName={school.name} />

      {/* Content */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative -mt-12 px-4 z-10"
      >
        {/* Title Section Card */}
        <div className="glass rounded-[2.5rem] p-8 shadow-premium border-white/20 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-10 -mt-10" />

          <div className="flex items-start justify-between gap-6 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-success/10 px-2 py-1 rounded-lg">
                  <span className="text-[10px] font-black text-success uppercase tracking-widest">Verified Institution</span>
                </div>
              </div>
              <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">{school.name}</h1>
              <p className="text-sm font-bold text-primary uppercase tracking-widest">{school.tagline}</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-success text-white px-4 py-3 rounded-3xl shadow-lg shadow-success/20 shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xl font-black">{school.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <span>{school.address}, {school.city}</span>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: "ACADEMIC BOARD", value: school.board, icon: GraduationCap, color: "bg-primary/10 text-primary" },
            { label: "TOTAL CAPACITY", value: `${school.studentCount.toLocaleString()}+`, icon: Users, color: "bg-blue-500/10 text-blue-500" },
            { label: "ESTABLISHED", value: school.established, icon: Calendar, color: "bg-indigo-500/10 text-indigo-500" },
            { label: "TEACHER RATIO", value: school.teacherRatio, icon: Users, color: "bg-emerald-500/10 text-emerald-500" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-5 border-white/10 shadow-card"
            >
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-4 shadow-inner", item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-lg font-black text-foreground tracking-tight">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Fee Highlight Section */}
        <div className="glass rounded-[2.5rem] p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-10 shadow-premium relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
            <IndianRupee className="w-32 h-32 text-primary" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Investment in Future</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-foreground tracking-tighter">{formatMonthlyFee(school.annualFee)}</span>
                <span className="text-sm font-bold text-muted-foreground">/ month*</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">*Inclusive of all laboratory & activity fees</p>
            </div>

            <div className="flex gap-4">
              {school.hasTransport && (
                <div className="group flex flex-col items-center gap-2">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shadow-card group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Bus className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Transport</span>
                </div>
              )}
              {school.hasHostel && (
                <div className="group flex flex-col items-center gap-2">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shadow-card group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Home className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Residential</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-xs font-bold text-foreground">{school.timings}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center">
                <Award className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-xs font-bold text-foreground">{school.grades}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Sections with Standardized Layout */}
        {[
          {
            title: "Exclusive Highlights", icon: Sparkles, content: (
              <div className="flex flex-wrap gap-2">
                {school.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 glass border-primary/10 text-foreground px-4 py-2.5 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-transform"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-xs font-black uppercase tracking-wider">{highlight}</span>
                  </div>
                ))}
              </div>
            )
          },
          {
            title: "Legacy & Mission", icon: Award, content: (
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                {school.description}
              </p>
            )
          },
        ].map((section, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
                <section.icon className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">{section.title}</h2>
            </div>
            {section.content}
          </div>
        ))}

        {/* Complex Components Section */}
        <div className="space-y-16">
          <section>
            <SchoolAchievements schoolName={school.name} />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Campus Experience</h2>
            </div>
            <VirtualTour schoolName={school.name} />
          </section>

          <section>
            <SchoolComparisonChart
              schoolName={school.name}
              schoolRating={school.rating}
              schoolFee={school.annualFee}
              teacherRatio={school.teacherRatio}
            />
          </section>

          <section>
            <FeeCalculator
              baseFee={school.annualFee}
              hasTransport={school.hasTransport}
              hasHostel={school.hasHostel}
            />
          </section>

          <section>
            <AdmissionDeadlines schoolName={school.name} />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Modern Amenities</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {school.amenities.map((amenity, index) => (
                <AmenityBadge key={index} amenity={amenity} />
              ))}
            </div>
          </section>

          <section>
            <ReviewSection schoolId={school.id} schoolName={school.name} />
          </section>

          <section className="pb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Connect with Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${school.contactPhone}`}
                className="group glass rounded-3xl p-6 border-white/10 shadow-card hover:shadow-premium transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="text-lg font-black text-foreground">{school.contactPhone}</p>
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${school.contactEmail}`}
                className="group glass rounded-3xl p-6 border-white/10 shadow-card hover:shadow-premium transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Official Inquiry</p>
                    <p className="text-lg font-black text-foreground truncate max-w-[180px]">{school.contactEmail}</p>
                  </div>
                </div>
              </a>
            </div>
          </section>
        </div>
      </motion.div>

      {/* Floating CTA Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-8 left-4 right-4 z-40"
      >
        <div className="max-w-xl mx-auto glass-dark p-3 rounded-[2.5rem] shadow-premium border-white/10 flex gap-3 backdrop-blur-2xl">
          <Sheet open={isVisitSheetOpen} onOpenChange={setIsVisitSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-[2rem] border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs font-black uppercase tracking-widest gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                Schedule Visit
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[3rem] glass-dark border-white/10 h-[80vh]">
              <VisitBookingForm
                schoolName={school.name}
                onClose={() => setIsVisitSheetOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="hero"
                className="flex-[1.5] h-14 rounded-[2rem] shadow-lg shadow-primary/30 text-xs font-black uppercase tracking-widest gap-2"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                Inquire Now
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[3rem] glass-dark border-white/10 h-[80vh]">
              <EnquiryForm
                schoolName={school.name}
                onClose={() => setIsSheetOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </div>
  );
}
