import { Home, Search, MapPin, User, Heart, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 px-4 md:px-0 pb-[env(safe-area-inset-bottom)]">
      <nav className="max-w-md mx-auto glass rounded-2xl shadow-premium border-white/20 px-2 py-2">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative flex flex-col items-center justify-center min-w-[64px] transition-all duration-300"
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
                    "flex flex-col items-center gap-1",
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
                  <span className={cn(
                    "text-[10px] font-medium transition-all duration-300",
                    isActive ? "opacity-100 translate-y-0" : "opacity-70"
                  )}>
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
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BottomNavigation;
