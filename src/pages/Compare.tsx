import { useComparison } from "@/contexts/ComparisonContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Bus, Home, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getAverageRating, getRatingDistribution } from "@/data/mockReviews";
import BottomNavigation from "@/components/BottomNavigation";

const Compare = () => {
  const { selectedSchools, removeSchool } = useComparison();
  const navigate = useNavigate();

  if (selectedSchools.length < 2) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Select at least 2 schools
        </h2>
        <p className="text-muted-foreground text-center mb-4">
          Go back to the schools list and add schools to compare
        </p>
        <Button onClick={() => navigate("/schools")}>Browse Schools</Button>
      </div>
    );
  }

  const comparisonFields = [
    { 
      label: "Rating", 
      getValue: (s: typeof selectedSchools[0]) => {
        const ratingData = getAverageRating(s.id);
        return (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="font-semibold">{ratingData.average.toFixed(1)}</span>
          </div>
        );
      }
    },
    { 
      label: "Reviews",
      getValue: (s: typeof selectedSchools[0]) => {
        const dist = getRatingDistribution(s.id);
        const total = Object.values(dist).reduce((a, b) => a + b, 0);
        return `${total} reviews`;
      }
    },
    { label: "Annual Fee", getValue: (s: typeof selectedSchools[0]) => s.feeRange },
    { label: "Board", getValue: (s: typeof selectedSchools[0]) => s.board },
    { label: "Grades", getValue: (s: typeof selectedSchools[0]) => s.grades },
    { label: "Established", getValue: (s: typeof selectedSchools[0]) => s.established },
    { label: "Students", getValue: (s: typeof selectedSchools[0]) => s.studentCount.toLocaleString() },
    { label: "Teacher Ratio", getValue: (s: typeof selectedSchools[0]) => s.teacherRatio },
    { label: "Distance", getValue: (s: typeof selectedSchools[0]) => `${s.distance} km` },
    { 
      label: "Transport", 
      getValue: (s: typeof selectedSchools[0]) => s.hasTransport ? (
        <Check className="w-5 h-5 text-success" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground" />
      )
    },
    { 
      label: "Hostel", 
      getValue: (s: typeof selectedSchools[0]) => s.hasHostel ? (
        <Check className="w-5 h-5 text-success" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground" />
      )
    },
    { label: "Timings", getValue: (s: typeof selectedSchools[0]) => s.timings },
  ];

  // Collect all unique amenities
  const allAmenities = [...new Set(selectedSchools.flatMap(s => s.amenities))].sort();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">
            Compare Schools
          </h1>
        </div>

        {/* School headers */}
        <div className="grid gap-2 px-4 pb-4" style={{ gridTemplateColumns: `100px repeat(${selectedSchools.length}, 1fr)` }}>
          <div />
          {selectedSchools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative mx-auto w-16 h-16 mb-2">
                <img
                  src={school.images[0]}
                  alt={school.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => removeSchool(school.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs font-medium text-foreground leading-tight line-clamp-2">
                {school.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="p-4 space-y-0">
        {comparisonFields.map((field, index) => (
          <div
            key={field.label}
            className={`grid gap-2 py-3 ${index !== comparisonFields.length - 1 ? 'border-b border-border' : ''}`}
            style={{ gridTemplateColumns: `100px repeat(${selectedSchools.length}, 1fr)` }}
          >
            <div className="text-sm text-muted-foreground font-medium">
              {field.label}
            </div>
            {selectedSchools.map((school) => (
              <div key={school.id} className="text-sm text-foreground text-center">
                {field.getValue(school)}
              </div>
            ))}
          </div>
        ))}

        {/* Amenities Section */}
        <div className="pt-6">
          <h3 className="text-base font-semibold text-foreground mb-4">Amenities</h3>
          <div className="space-y-0">
            {allAmenities.map((amenity, index) => (
              <div
                key={amenity}
                className={`grid gap-2 py-3 ${index !== allAmenities.length - 1 ? 'border-b border-border' : ''}`}
                style={{ gridTemplateColumns: `100px repeat(${selectedSchools.length}, 1fr)` }}
              >
                <div className="text-sm text-muted-foreground">
                  {amenity}
                </div>
                {selectedSchools.map((school) => (
                  <div key={school.id} className="flex justify-center">
                    {school.amenities.includes(amenity) ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground opacity-30" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-6 grid gap-3" style={{ gridTemplateColumns: `repeat(${selectedSchools.length}, 1fr)` }}>
          {selectedSchools.map((school) => (
            <Button
              key={school.id}
              variant="outline"
              size="sm"
              onClick={() => navigate(`/school/${school.slug}`)}
              className="text-xs"
            >
              View Details
            </Button>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Compare;
