import { useParams, useNavigate } from "react-router-dom";
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
  CalendarCheck
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
import { getSchoolBySlug } from "@/data/mockSchools";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SchoolDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isVisitSheetOpen, setIsVisitSheetOpen] = useState(false);

  const school = getSchoolBySlug(slug || "");

  if (!school) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">School not found</h1>
          <Button onClick={() => navigate("/schools")}>Browse Schools</Button>
        </div>
      </div>
    );
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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 safe-top"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className="bg-card/80 backdrop-blur-sm hover:bg-card"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  isSaved && "fill-primary text-primary"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="bg-card/80 backdrop-blur-sm hover:bg-card"
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
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 pt-6"
      >
        {/* Title Section */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{school.name}</h1>
            <div className="flex items-center gap-1 bg-success text-success-foreground px-2.5 py-1 rounded-lg text-sm font-semibold shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span>{school.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{school.tagline}</p>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-3">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{school.address}, {school.city}</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Board</span>
            </div>
            <p className="font-semibold text-foreground">{school.board}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">Students</span>
            </div>
            <p className="font-semibold text-foreground">{school.studentCount.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-success" />
              </div>
              <span className="text-xs text-muted-foreground">Established</span>
            </div>
            <p className="font-semibold text-foreground">{school.established}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Teacher Ratio</span>
            </div>
            <p className="font-semibold text-foreground">{school.teacherRatio}</p>
          </div>
        </div>

        {/* Fee & Facilities */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Annual Fee</p>
              <p className="text-xl font-bold text-primary">{school.feeRange}</p>
            </div>
            <div className="flex gap-3">
              {school.hasTransport && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Bus className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Transport</span>
                </div>
              )}
              {school.hasHostel && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Hostel</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{school.timings}</span>
            </div>
            <span>•</span>
            <span>{school.grades}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {school.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-primary-light text-primary px-3 py-2 rounded-lg"
              >
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed">{school.description}</p>
        </div>

        {/* Achievements & Results */}
        <SchoolAchievements schoolName={school.name} />

        {/* Fee Calculator */}
        <FeeCalculator 
          baseFee={school.annualFee} 
          hasTransport={school.hasTransport} 
          hasHostel={school.hasHostel} 
        />

        {/* Admission Deadlines */}
        <AdmissionDeadlines schoolName={school.name} />

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {school.amenities.map((amenity, index) => (
              <AmenityBadge key={index} amenity={amenity} />
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection schoolId={school.id} schoolName={school.name} />

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
          <div className="space-y-3">
            <a
              href={`tel:${school.contactPhone}`}
              className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{school.contactPhone}</p>
              </div>
            </a>
            <a
              href={`mailto:${school.contactEmail}`}
              className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{school.contactEmail}</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Fixed CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom z-40"
      >
        <div className="flex gap-2 max-w-lg mx-auto">
          <Sheet open={isVisitSheetOpen} onOpenChange={setIsVisitSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 gap-2">
                <CalendarCheck className="w-4 h-4" />
                Book Visit
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <VisitBookingForm 
                schoolName={school.name} 
                onClose={() => setIsVisitSheetOpen(false)} 
              />
            </SheetContent>
          </Sheet>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="hero" className="flex-1 gap-2">
                Request Callback
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
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
};

export default SchoolDetail;
