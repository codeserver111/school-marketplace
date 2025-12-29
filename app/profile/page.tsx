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
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import LocationHeader from "@/components/LocationHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function Profile() {
  const { isLoggedIn, isGuest, user, login, logout, continueAsGuest, savedSchools } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      <div className="min-h-screen bg-background pb-20">
        <LocationHeader location="New Delhi" />

        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to SchoolFinder</h1>
            <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
              Sign in to save schools, track enquiries, and get personalized recommendations
            </p>

            <div className="space-y-3 max-w-xs mx-auto">
              <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <SheetTrigger asChild>
                  <Button className="w-full" size="lg">
                    Sign In
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl">
                  <div className="py-6">
                    <h2 className="text-xl font-semibold text-center mb-6">Sign In</h2>
                    <div className="space-y-4">
                      <Input placeholder="Email or Phone" />
                      <Input type="password" placeholder="Password" />
                      <Button
                        className="w-full"
                        onClick={() => {
                          login("+919876543210"); // Demo phone number
                          setIsLoginOpen(false);
                          toast.success("Welcome back!");
                        }}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => {
                  continueAsGuest();
                  toast.success("Continuing as guest");
                }}
              >
                Continue as Guest
              </Button>
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
