"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit2,
  Heart,
  MessageSquare,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationHeader from "@/components/LocationHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import AuthModal from "@/components/AuthModal";

export default function Profile() {
  const { isLoggedIn, isGuest, user, logout, savedSchools, openAuthModal } = useUser();

  const menuItems = [
    {
      icon: Heart,
      label: "Saved Schools",
      value: savedSchools.length.toString(),
      href: "/saved"
    },
    {
      icon: MessageSquare,
      label: "My Enquiries",
      value: "3",
      href: "/profile"
    },
    {
      icon: Calendar,
      label: "Visit Bookings",
      value: "2",
      href: "/profile"
    }
  ];

  const settingsItems = [
    {
      icon: Bell,
      label: "Notifications",
      value: "On",
      href: "/profile"
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      href: "/profile"
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/profile"
    }
  ];

  if (!isLoggedIn && !isGuest) {
    return (
      <div className="min-h-screen bg-background pb-20 overflow-hidden relative">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse-slow" />

        <LocationHeader location="New Delhi" />

        <div className="px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-primary rounded-[2rem] opacity-20 blur-xl"
              />
              <div className="relative w-full h-full glass rounded-[2rem] flex items-center justify-center border border-white/20 shadow-premium">
                <User className="w-10 h-10 text-primary" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-8 h-8 glass rounded-full flex items-center justify-center border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-accent" />
              </motion.div>
            </div>

            <h1 className="text-4xl font-black text-foreground mb-4 tracking-tight leading-none">
              Your Journey <br /> <span className="text-primary italic">Starts Here</span>
            </h1>
            <p className="text-muted-foreground mb-12 max-w-[280px] mx-auto font-medium text-lg leading-relaxed">
              Unlock elite school comparisons, saved favorites, and AI-powered recommendations.
            </p>

            <div className="space-y-4 max-w-xs mx-auto">
              <Button
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-lg shadow-xl shadow-primary/20 group"
                onClick={() => {
                  openAuthModal("login");
                }}
              >
                Sign In
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/10 glass hover:bg-white/5 font-bold"
                  onClick={() => {
                    openAuthModal("signup");
                  }}
                >
                  Join Us
                </Button>
                <Button
                  variant="ghost"
                  className="h-12 rounded-xl text-muted-foreground hover:text-foreground font-bold"
                  onClick={() => {
                    useUser().continueAsGuest();
                    toast.success("Welcome, Guest!");
                  }}
                >
                  As Guest
                </Button>
              </div>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 grayscale opacity-40">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">AI Guided</span>
              </div>
            </div>
          </motion.div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <LocationHeader location="New Delhi" />

      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">
              {user?.name || "Guest User"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {user?.email || "guest@example.com"}
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <Edit2 className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2 mb-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-muted-foreground text-sm">{item.value}</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-2 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-4">
            Settings
          </h2>
          {settingsItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (menuItems.length + index) * 0.05 }}
            >
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-muted-foreground text-sm">{item.value}</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => {
              logout();
              toast.success("Logged out successfully");
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
}
