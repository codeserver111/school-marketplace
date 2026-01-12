"use client";

import { Home, Search, MapPin, User, Heart, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/schools" },
  { icon: FileText, label: "Applied", path: "/applied" },
  { icon: MapPin, label: "Map", path: "/map" },
  { icon: Heart, label: "Saved", path: "/saved" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNavigation = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // If scrolling down past 100px, collapse the nav
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsExpanded(false);
    }
    // If scrolling up significantly, expand the nav
    else if (lastScrollY - currentScrollY > 30) {
      setIsExpanded(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:px-0 pb-[env(safe-area-inset-bottom)]">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          // Expanded Navigation Bar
          <motion.nav
            key="expanded"
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="max-w-md mx-auto glass rounded-2xl shadow-premium border-white/20 px-2 py-2"
          >
            <div className="flex items-center justify-around h-14">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={item.path}
                      className="relative flex flex-col items-center justify-center min-w-[48px] transition-all duration-300"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-tab"
                          className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "flex flex-col items-center gap-0.5",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-5 h-5 transition-all duration-300",
                            isActive && "scale-110 drop-shadow-[0_0_8px_rgba(226,55,68,0.3)]"
                          )}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                        <span
                          className={cn(
                            "text-[9px] font-medium transition-all duration-300",
                            isActive ? "opacity-100 translate-y-0" : "opacity-70"
                          )}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(226,55,68,0.8)]"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        ) : (
          // Collapsed Floating Action Button
          <motion.div
            key="collapsed"
            className="flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
          >
            <motion.button
              onClick={toggleExpand}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30 flex items-center justify-center"
            >
              {/* Pulse ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Rotating border */}
              <motion.div
                className="absolute inset-[-2px] rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <Plus className="w-6 h-6 text-white relative z-10" strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BottomNavigation;
