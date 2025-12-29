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
const SchoolMapView = dynamic(() => import("@/components/SchoolMapView"), {
  ssr: false,
  loading: () => <div className="h-[400px] rounded-xl bg-secondary animate-pulse flex items-center justify-center">Loading map...</div>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 mb-6"
      >
        <div className="relative bg-gradient-hero rounded-2xl p-6 overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">
              Discover the Best Schools
            </h1>
            <p className="text-primary-foreground/90 text-sm mb-4">
              Find, compare and apply to top schools near you
            </p>
            <Link href="/admission">
              <Button variant="secondary" size="sm" className="gap-2">
                <Sparkles className="w-4 h-4" />
                AI Admission Guide
              </Button>
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20">
            <GraduationCap className="w-32 h-32" />
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
        transition={{ delay: 0.25 }}
        className="px-4 mb-6"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">
              {selectedType ? filteredSchools.length : "500+"}
            </p>
            <p className="text-xs text-muted-foreground">Schools</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-accent" />
            </div>
            <p className="text-xl font-bold text-foreground">4.5★</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <p className="text-xl font-bold text-foreground">50K+</p>
            <p className="text-xs text-muted-foreground">Parents</p>
          </div>
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
            {/* Top Rated Carousel (when no filter) */}
            {!selectedType && (
              <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 mb-6">
                {topRated.map((school, index) => (
                  <Link
                    key={school.id}
                    href={`/school/${school.slug}`}
                    className="shrink-0 w-[260px]"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10]">
                        <img
                          src={school.images[0]}
                          alt={school.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-success text-success-foreground px-2 py-0.5 rounded text-xs font-semibold">
                          <Star className="w-3 h-3 fill-current" />
                          {school.rating}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
                          {school.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{school.address}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}

            {/* School List */}
            <div className="space-y-4">
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
