"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { School } from "@/data/mockSchools";

interface UserContextType {
  isLoggedIn: boolean;
  isGuest: boolean;
  user: UserProfile | null;
  savedSchools: School[];
  recentSearches: string[];
  login: (phone: string) => void;
  logout: () => void;
  continueAsGuest: () => void;
  saveSchool: (school: School) => void;
  unsaveSchool: (schoolId: string) => void;
  isSaved: (schoolId: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

interface UserProfile {
  name: string;
  phone: string;
  email?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

const STORAGE_KEYS = {
  savedSchools: "schoolfinder_saved_schools",
  recentSearches: "schoolfinder_recent_searches",
  isGuest: "schoolfinder_is_guest",
  user: "schoolfinder_user",
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedSchools, setSavedSchools] = useState<School[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedSavedSchools = localStorage.getItem(STORAGE_KEYS.savedSchools);
    const storedRecentSearches = localStorage.getItem(STORAGE_KEYS.recentSearches);
    const storedIsGuest = localStorage.getItem(STORAGE_KEYS.isGuest);
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);

    if (storedSavedSchools) {
      setSavedSchools(JSON.parse(storedSavedSchools));
    }
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }
    if (storedIsGuest === "true") {
      setIsGuest(true);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Save to localStorage when savedSchools changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.savedSchools, JSON.stringify(savedSchools));
  }, [savedSchools]);

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.recentSearches, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const login = (phone: string) => {
    const userProfile: UserProfile = {
      name: "Rahul Sharma",
      phone: phone,
      email: "rahul.sharma@email.com",
    };
    setUser(userProfile);
    setIsLoggedIn(true);
    setIsGuest(false);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userProfile));
    localStorage.removeItem(STORAGE_KEYS.isGuest);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.user);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem(STORAGE_KEYS.isGuest, "true");
  };

  const saveSchool = (school: School) => {
    setSavedSchools((prev) => {
      if (prev.find((s) => s.id === school.id)) return prev;
      return [...prev, school];
    });
  };

  const unsaveSchool = (schoolId: string) => {
    setSavedSchools((prev) => prev.filter((s) => s.id !== schoolId));
  };

  const isSaved = (schoolId: string) => {
    return savedSchools.some((s) => s.id === schoolId);
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isGuest,
        user,
        savedSchools,
        recentSearches,
        login,
        logout,
        continueAsGuest,
        saveSchool,
        unsaveSchool,
        isSaved,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
