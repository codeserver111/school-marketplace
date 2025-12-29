"use client";

import { useComparison } from "@/contexts/ComparisonContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, Bus, Home, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getAverageRating, getRatingDistribution } from "@/data/mockReviews";
import BottomNavigation from "@/components/BottomNavigation";

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

export default function Compare() {
  const { selectedSchools, removeSchool } = useComparison();
  const router = useRouter();

  if (selectedSchools.length < 2) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pb-20">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Select at least 2 schools
        </h2>
        <p className="text-muted-foreground text-center mb-4">
          Go back to the schools list and add schools to compare
        </p>
        <Link href="/schools">
          <Button>Browse Schools</Button>
        </Link>
        <BottomNavigation />
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
    { label: "Monthly Fee*", getValue: (s: typeof selectedSchools[0]) => `${formatMonthlyFee(s.annualFee)}/month` },
    { label: "Board", getValue: (s: typeof selectedSchools[0]) => s.board },
    { label: "Grades", getValue: (s: typeof selectedSchools[0]) => s.grades },
    { label: "Student Count", getValue: (s: typeof selectedSchools[0]) => s.studentCount.toLocaleString() },
    { label: "Established", getValue: (s: typeof selectedSchools[0]) => s.established },
    { label: "Teacher Ratio", getValue: (s: typeof selectedSchools[0]) => s.teacherRatio },
    {
      label: "Transport",
      getValue: (s: typeof selectedSchools[0]) => s.hasTransport ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-muted-foreground" />
    },
    {
      label: "Hostel",
      getValue: (s: typeof selectedSchools[0]) => s.hasHostel ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-muted-foreground" />
    }
  ];

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
          <h1 className="font-semibold text-foreground">
            Compare Schools ({selectedSchools.length})
          </h1>
          <div className="w-10" />
        </div>
      </motion.header>

      <div className="pt-14">
        {/* School Cards */}
        <div className="px-4 py-4 border-b border-border">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedSchools.length}, 1fr)` }}>
            {selectedSchools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-4 shadow-card"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-foreground text-sm leading-tight">
                    {school.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 shrink-0"
                    onClick={() => removeSchool(school.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <img
                    src={school.images[0]}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-semibold text-sm">{school.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{formatMonthlyFee(school.annualFee)}/month*</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Comparison Details</h2>
          <div className="space-y-4">
            {comparisonFields.map((field, fieldIndex) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + fieldIndex * 0.05 }}
                className="bg-card rounded-xl p-4 shadow-card"
              >
                <h3 className="font-medium text-foreground mb-3">{field.label}</h3>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedSchools.length}, 1fr)` }}>
                  {selectedSchools.map((school) => (
                    <div key={school.id} className="text-center">
                      <div className="text-sm text-muted-foreground">
                        {field.getValue(school)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
