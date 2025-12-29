import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, GraduationCap, Star, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationHeader from "@/components/LocationHeader";
import SearchBar from "@/components/SearchBar";
import SchoolCard from "@/components/SchoolCard";
import BottomNavigation from "@/components/BottomNavigation";
import SchoolTypeSelector, { SchoolType } from "@/components/SchoolTypeSelector";
import SchoolTypeComparisonTable from "@/components/SchoolTypeComparisonTable";
import ViewToggle, { ViewMode } from "@/components/ViewToggle";
import SchoolMapView from "@/components/SchoolMapView";
import { schools, filterSchools } from "@/data/mockSchools";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SchoolType>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const filteredSchools = useMemo(() => {
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <LocationHeader location="New Delhi" />
      
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
            <Link to="/admission">
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

      {/* Comparison Table */}
      <SchoolTypeComparisonTable highlightType={selectedType} />

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
                    to={`/school/${school.slug}`}
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
              {featuredSchools.map((school, index) => (
                <SchoolCard key={school.id} school={school} index={index} />
              ))}
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
        <Link to="/schools">
          <Button variant="outline" className="w-full gap-2">
            View All Schools
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.section>

      <BottomNavigation />
    </div>
  );
};

export default Index;
