"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { School } from "@/data/mockSchools";

interface ComparisonContextType {
  selectedSchools: School[];
  addSchool: (school: School) => boolean;
  removeSchool: (schoolId: string) => void;
  clearAll: () => void;
  isSelected: (schoolId: string) => boolean;
  canAdd: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_SCHOOLS = 3;

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);

  const addSchool = (school: School): boolean => {
    if (selectedSchools.length >= MAX_SCHOOLS) return false;
    if (selectedSchools.find(s => s.id === school.id)) return false;
    setSelectedSchools(prev => [...prev, school]);
    return true;
  };

  const removeSchool = (schoolId: string) => {
    setSelectedSchools(prev => prev.filter(s => s.id !== schoolId));
  };

  const clearAll = () => {
    setSelectedSchools([]);
  };

  const isSelected = (schoolId: string): boolean => {
    return selectedSchools.some(s => s.id === schoolId);
  };

  const canAdd = selectedSchools.length < MAX_SCHOOLS;

  return (
    <ComparisonContext.Provider value={{ 
      selectedSchools, 
      addSchool, 
      removeSchool, 
      clearAll, 
      isSelected,
      canAdd 
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
