"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, Bell, Sparkles, X, Clock, Heart, Star, MessageCircle, CalendarCheck } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LocationHeaderProps {
  location: string;
  onLocationClick?: () => void;
}

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "admission",
    title: "Admission Deadline Approaching",
    message: "DPS Vasant Kunj applications close in 3 days",
    time: "2 hours ago",
    unread: true,
    icon: CalendarCheck,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 2,
    type: "favorite",
    title: "New Review on Saved School",
    message: "Someone reviewed Modern School, Barakhamba",
    time: "5 hours ago",
    unread: true,
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    id: 3,
    type: "rating",
    title: "School Rating Updated",
    message: "Springdales School rating increased to 4.8★",
    time: "1 day ago",
    unread: false,
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: 4,
    type: "message",
    title: "Response from School",
    message: "Delhi Public School replied to your inquiry",
    time: "2 days ago",
    unread: false,
    icon: MessageCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const LocationHeader = ({ location, onLocationClick }: LocationHeaderProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 safe-top"
      >
        {/* Premium Glassmorphic Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="relative flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Left Section - Premium Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center shadow-xl shadow-primary/30 border border-white/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-size-200 animate-gradient">
                SchoolFinder
              </h1>
              <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] -mt-0.5">Find • Compare • Apply</p>
            </div>
          </div>

          {/* Center Section - Premium Location Picker */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLocationClick}
            className="group flex-1 max-w-md mx-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-muted/40 via-muted/20 to-muted/40 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="absolute inset-[1px] bg-background/60 backdrop-blur-xl rounded-2xl" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/20 transition-colors" />

            <div className="relative flex items-center gap-3 px-4 py-2.5">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 shadow-inner"
              >
                <MapPin className="w-4 h-4 text-primary" />
              </motion.div>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-muted-foreground/60 leading-none mb-0.5">
                  Explore Schools In
                </span>
                <div className="flex items-center gap-1.5 min-w-0 w-full">
                  <span className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {location}
                  </span>
                  <ChevronDown className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors group-hover:translate-y-0.5" />
                </div>
              </div>
            </div>
          </motion.button>

          {/* Right Section - Premium Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300" />
              <div className="absolute inset-[1px] bg-background/80 backdrop-blur-xl rounded-xl" />
              <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-primary/20 transition-colors" />

              <div className="relative w-11 h-11 flex items-center justify-center">
                <Bell className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />

                {/* Notification Badge */}
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"
                    />
                    <div className="relative min-w-[18px] h-[18px] bg-gradient-to-br from-primary to-rose-500 rounded-full flex items-center justify-center px-1 border-2 border-background shadow-lg">
                      <span className="text-[10px] font-black text-white">{unreadCount}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Notification Dropdown Panel */}
      <AnimatePresence>
        {isNotificationOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Notification Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-16 right-4 w-[360px] max-w-[calc(100vw-32px)] z-50"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="absolute inset-0 backdrop-blur-2xl" />
                <div className="absolute inset-0 border border-white/10 rounded-3xl" />

                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">Notifications</h3>
                        <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsNotificationOpen(false)}
                      className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Notification List */}
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification, index) => {
                      const IconComponent = notification.icon;
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group px-5 py-4 border-b border-white/5 hover:bg-muted/30 transition-colors cursor-pointer ${notification.unread ? "bg-primary/5" : ""
                            }`}
                        >
                          <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-xl ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                              <IconComponent className={`w-5 h-5 ${notification.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className={`text-sm font-semibold truncate ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}>
                                  {notification.title}
                                </h4>
                                {notification.unread && (
                                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-1.5 mt-2">
                                <Clock className="w-3 h-3 text-muted-foreground/60" />
                                <span className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4 border-t border-white/10 bg-muted/20">
                    <Link href="/notifications" onClick={() => setIsNotificationOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full h-10 text-sm font-semibold text-primary hover:text-primary/80 hover:bg-primary/10 rounded-xl transition-colors"
                      >
                        View All Notifications
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LocationHeader;
