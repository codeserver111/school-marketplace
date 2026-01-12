"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, GraduationCap, Star, TrendingUp, Sparkles, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  HeaderSkeleton,
  SearchBarSkeleton,
  HeroBannerSkeleton,
  StatsGridSkeleton,
  SchoolListSkeleton
} from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import LocationHeader from "@/components/LocationHeader";
import SearchBar from "@/components/SearchBar";
// Import SchoolCard directly
import SchoolCard from "@/components/SchoolCard";
import BottomNavigation from "@/components/BottomNavigation";
import SchoolTypeSelector, { SchoolType } from "@/components/SchoolTypeSelector";
import ViewToggle, { ViewMode } from "@/components/ViewToggle";
import { schools, filterSchools } from "@/data/mockSchools";

// Dynamically import SchoolMapView to avoid SSR issues with Leaflet
import { Spinner } from "@/components/ui/spinner";
const SchoolMapView = dynamic(() => import("@/components/SchoolMapView"), {
  ssr: false,
  loading: () => <div className="h-[400px] rounded-xl bg-secondary animate-pulse flex items-center justify-center"><Spinner /></div>
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SchoolType>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [currentLocation, setCurrentLocation] = useState("New Delhi");
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Show instructional toast on page load
  useEffect(() => {
    const hasSeenCompareHint = localStorage.getItem('hasSeenCompareHint');
    if (!hasSeenCompareHint) {
      setTimeout(() => {
        toast({
          title: "💡 How to Compare Schools",
          description: "Click the compare icon (⚖️) on school cards to add up to 3 schools. Then tap 'Compare Now' to see them side-by-side!",
          duration: 8000,
        });
        localStorage.setItem('hasSeenCompareHint', 'true');
      }, 2000); // Show after 2 seconds
    }
  }, []);

  // Show scroll hint when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hasSeenScrollHint = localStorage.getItem('hasSeenScrollCompareHint');

      // Show hint when scrolled down about 300px (past the hero section)
      if (scrollPosition > 300 && !hasSeenScrollHint) {
        toast({
          title: "🔍 Explore & Compare",
          description: "Browse different schools and use the compare feature to make the best choice for your child!",
          duration: 6000,
        });
        localStorage.setItem('hasSeenScrollCompareHint', 'true');

        // Remove scroll listener after showing hint
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSchools = useMemo(() => {
    // Simulate search loading
    if (searchQuery) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 800);
    }

    return filterSchools({
      schoolType: selectedType,
      searchQuery: searchQuery || undefined,
    });
  }, [selectedType, searchQuery]);

  const topRated = useMemo(() => {
    const baseSchools = selectedType
      ? filteredSchools
      : schools;
    return baseSchools.filter(s => s.rating >= 4.3).slice(0, 4);
  }, [selectedType, filteredSchools]);

  const featuredSchools = useMemo(() => {
    return filteredSchools.slice(0, 5);
  }, [filteredSchools]);

  // Popular locations in Delhi NCR
  const popularLocations = [
    "New Delhi", "Delhi Cantonment", "Karol Bagh", "Connaught Place",
    "Lajpat Nagar", "South Extension", "Greater Kailash", "Vasant Kunj",
    "Dwarka", "Rohini", "Pitampura", "Janakpuri", "Rajouri Garden",
    "Punjabi Bagh", "Shalimar Bagh", "Patel Nagar", "Malviya Nagar",
    "Hauz Khas", "Saket", "Defence Colony", "Noida", "Gurgaon",
    "Ghaziabad", "Faridabad"
  ];

  const filteredLocations = popularLocations.filter(location =>
    location.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    setIsLocationPickerOpen(false);
    setLocationSearchQuery("");
    toast({
      title: "Location Updated",
      description: `Showing schools near ${location}`,
    });
  };

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeletons for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeletons for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle page refresh - show loading state briefly
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <HeaderSkeleton />
        <SearchBarSkeleton />
        <HeroBannerSkeleton />
        <StatsGridSkeleton />
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-muted rounded w-48 animate-pulse" />
            <div className="h-8 bg-muted rounded w-20 animate-pulse" />
          </div>
        </div>
        <SchoolListSkeleton count={5} />
        <BottomNavigation />
      </div>
    );
  }

  // Show skeletons during loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <HeaderSkeleton />
        <SearchBarSkeleton />
        <HeroBannerSkeleton />
        <StatsGridSkeleton />
        <SchoolListSkeleton count={5} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <LocationHeader
        location={currentLocation}
        onLocationClick={() => setIsLocationPickerOpen(true)}
      />

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Find the perfect school..."
      />

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="px-4 mb-8"
      >
        <div className="relative min-h-[280px] bg-gradient-hero-mesh rounded-[2.5rem] p-6 md:p-8 overflow-hidden shadow-premium group border border-violet-500/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

          {/* Animated Glow Orbs */}
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-violet-500/30 blur-[80px] rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-blue-500/30 blur-[60px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-500/20 blur-[70px] rounded-full animate-pulse-slow" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md w-fit px-4 py-1.5 rounded-full mb-6 border border-white/30 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Platform of the Future 2026</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-[1.1] tracking-tight drop-shadow-lg">
                Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">Child's Future</span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md font-medium leading-relaxed">
                Find, compare and apply to elite schools with our AI-powered guide.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <Link href="/admission">
                  <Button variant="secondary" size="lg" className="rounded-xl h-12 px-6 gap-2 shadow-xl hover:shadow-violet-500/30 transition-all duration-500 font-bold text-sm bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 hover:scale-105">
                    <Sparkles className="w-5 h-5" />
                    AI Admission Guide
                  </Button>
                </Link>

                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white/50 bg-accent flex items-center justify-center text-[10px] font-bold text-white">
                    50K+
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative z-10"
              >
                <img
                  src="/hero-illustration.png"
                  alt="Premium Education AI"
                  className="w-full h-auto rounded-3xl shadow-2xl border border-white/10"
                />
              </motion.div>

              {/* Floating Insight Bubbles */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/10 z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placement Rate</p>
                  <p className="text-xl font-black text-emerald-400">98.5%</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/10 z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Accuracy</p>
                  <p className="text-xl font-black text-amber-400">4.9/5</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Illustration (Subtle Background) */}
          <div className="absolute inset-0 lg:hidden opacity-30 pointer-events-none">
            <img
              src="/hero-illustration.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* School Type Selector */}
      <SchoolTypeSelector
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
      />

      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="px-4 mb-10"
      >
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-5 shadow-card text-center border-white/10"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-black text-foreground tracking-tight">
              {selectedType ? filteredSchools.length : "500+"}
            </p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Schools</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-5 shadow-card text-center border-white/10"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <p className="text-2xl font-black text-foreground tracking-tight">4.5★</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Avg Rating</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-5 shadow-card text-center border-white/10"
          >
            <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-black text-foreground tracking-tight">50K+</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Parents</p>
          </motion.div>
        </div>
      </motion.section>

      {/* View Toggle & Schools Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {selectedType
                ? `${selectedType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Schools`
                : "Top Rated Schools"
              }
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedType
                ? `${filteredSchools.length} schools found`
                : "Highly recommended by parents"
              }
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1 flex items-center gap-1">
              <span>💡</span>
              Click compare icon (⚖️) to add schools for comparison
            </p>
          </div>
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        {viewMode === "map" ? (
          <SchoolMapView schools={selectedType ? filteredSchools : topRated} />
        ) : (
          <>
            {/* Top Rated Schools Grid */}
            {!selectedType && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-1">
                {topRated.map((school, index) => (
                  <Link
                    key={school.id}
                    href={`/school/${school.slug}`}
                    className="block group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="glass rounded-[2rem] overflow-hidden shadow-card hover:shadow-premium transition-all duration-500 border border-white/10 h-full flex flex-col group/card"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={school.images[0]}
                          alt={school.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

                        {/* Status Badges */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          <div className="flex flex-col gap-1.5">
                            <div className="glass px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest shadow-lg border-white/20 flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                              {school.board}
                            </div>
                            {school.isPopular && (
                              <div className="bg-accent/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest shadow-lg flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                Featured
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-success/90 backdrop-blur-md text-success-foreground px-2.5 py-1.5 rounded-xl text-[10px] font-black shadow-lg border border-white/10">
                          <Star className="w-3 h-3 fill-current" />
                          {school.rating}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-black text-foreground text-base mb-2 group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
                          {school.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-auto mb-4">
                          <MapPin className="w-3 h-3 text-primary/60" />
                          <span className="truncate">{school.address}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-dashed border-border/50">
                          <p className="text-sm font-black text-success leading-none">
                            {Math.round(school.annualFee / 12000)}K<span className="text-[8px] font-bold text-muted-foreground/60 ml-0.5 uppercase">/mo</span>
                          </p>
                          <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-white transition-colors duration-300 shadow-lg shadow-black/5">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}

            {/* School List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isSearching ? (
                <SchoolListSkeleton count={featuredSchools.length} />
              ) : (
                featuredSchools.map((school, index) => (
                  <SchoolCard key={school.id} school={school} index={index} />
                ))
              )}
            </div>

            {filteredSchools.length === 0 && selectedType && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏫</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No schools found</h3>
                <p className="text-muted-foreground text-sm">
                  Try selecting a different school type
                </p>
              </div>
            )}
          </>
        )}
      </motion.section>

      {/* View All Button */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="px-4"
      >
        <Link href="/schools">
          <Button variant="outline" className="w-full gap-2">
            View All Schools
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.section>

      <BottomNavigation />

      {/* Location Picker Dialog */}
      <Dialog open={isLocationPickerOpen} onOpenChange={setIsLocationPickerOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Select Your Location
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Current Location Option */}
            <div className="p-3 border rounded-lg">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto p-3"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const { latitude, longitude } = position.coords;
                        handleLocationSelect(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
                      },
                      (error) => {
                        console.error("Geolocation error:", error);
                        toast({
                          title: "Location Access Denied",
                          description: "Please select a location manually",
                          variant: "destructive",
                        });
                      }
                    );
                  } else {
                    toast({
                      title: "Geolocation Not Supported",
                      description: "Please select a location manually",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Use Current Location</p>
                  <p className="text-sm text-muted-foreground">Find schools near you</p>
                </div>
              </Button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for a location..."
                value={locationSearchQuery}
                onChange={(e) => setLocationSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Popular Locations */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">POPULAR LOCATIONS</h4>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <Button
                    key={location}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm truncate">{location}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
