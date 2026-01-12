import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, Users, Star, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Achievement {
  year: string;
  title: string;
  value: string;
  icon: "trophy" | "medal" | "trending" | "users" | "star";
  highlight?: boolean;
}

interface TopperInfo {
  name: string;
  score: string;
  stream: string;
  image: string;
}

interface SchoolAchievementsProps {
  schoolName: string;
}

const achievements: Achievement[] = [
  { year: "2024", title: "Board Pass Rate", value: "100%", icon: "trophy", highlight: true },
  { year: "2024", title: "Students Scored 90%+", value: "156", icon: "star", highlight: true },
  { year: "2024", title: "JEE Advanced Selections", value: "45", icon: "medal" },
  { year: "2024", title: "NEET Qualifiers", value: "62", icon: "medal" },
  { year: "2023", title: "National Olympiad Winners", value: "23", icon: "trophy" },
  { year: "2023", title: "Sports Championships", value: "12", icon: "users" },
];

const toppers: TopperInfo[] = [
  { name: "Ananya Sharma", score: "99.2%", stream: "Science", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { name: "Rahul Verma", score: "98.8%", stream: "Commerce", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { name: "Priya Singh", score: "98.4%", stream: "Humanities", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
];

const universityPlacements = [
  { name: "IIT Delhi", count: 12, logo: "🏛️" },
  { name: "AIIMS", count: 8, logo: "🏥" },
  { name: "Delhi University", count: 45, logo: "📚" },
  { name: "NIT", count: 18, logo: "🎓" },
  { name: "IIM", count: 6, logo: "💼" },
];

const IconMap = {
  trophy: Trophy,
  medal: Medal,
  trending: TrendingUp,
  users: Users,
  star: Star,
};

const SchoolAchievements = ({ schoolName }: SchoolAchievementsProps) => {
  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Trophy className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Distinguished Milestones</h2>
        <div className="ml-auto glass px-3 py-1 rounded-xl border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest">
          Academic Year 2024
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {achievements.slice(0, 4).map((achievement, index) => {
          const Icon = IconMap[achievement.icon];
          return (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-3xl p-6 border-white/10 shadow-card transition-all duration-300",
                achievement.highlight
                  ? "glass bg-gradient-to-br from-primary/10 to-transparent border-primary/20"
                  : "glass"
              )}
            >
              {achievement.highlight && (
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-primary/30 animate-pulse" />
              )}
              <div className="flex items-center gap-2 mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner",
                  achievement.highlight ? "bg-primary text-white" : "bg-muted/30 text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-foreground tracking-tighter mb-1">{achievement.value}</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">{achievement.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Toppers Section */}
      <div className="glass rounded-[2.5rem] p-8 border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent mb-8 shadow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -mr-10 -mt-10" />

        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Medal className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-sm font-black text-foreground uppercase tracking-widest">League of Extraordinary Scholars</h3>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 snap-x hide-scrollbar">
          {toppers.map((topper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="flex-shrink-0 text-center snap-center"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-200">
                  <img
                    src={topper.image}
                    alt={topper.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white dark:border-background"
                  />
                </div>
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 glass-dark rounded-full flex items-center justify-center text-sm shadow-lg border-white/10">
                    👑
                  </div>
                )}
              </div>
              <p className="font-black text-xs text-foreground tracking-tight mb-1 whitespace-nowrap">{topper.name}</p>
              <p className="text-amber-600 font-black text-xl tracking-tighter mb-1">{topper.score}</p>
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{topper.stream}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* University Placements */}
      <div className="glass rounded-[2.5rem] p-8 shadow-premium border-white/10 mb-8 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Elite Placements 2024</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {universityPlacements.map((uni, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 glass border-white/10 rounded-2xl px-4 py-2 hover:bg-white/10 transition-colors"
            >
              <span className="text-xl">{uni.logo}</span>
              <span className="text-xs font-black uppercase tracking-widest text-foreground/80">{uni.name}</span>
              <div className="w-8 h-8 glass-dark rounded-xl flex items-center justify-center text-[10px] font-black text-white ml-2">
                {uni.count}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Urgency Banner */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-red-600 to-orange-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-red-500/20"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center flex-shrink-0 shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight mb-1 uppercase">Limited Admissions</h3>
            <p className="text-sm font-medium opacity-90 leading-relaxed capitalize">
              Secure one of the <span className="font-black underline underline-offset-4 decoration-2">final 23 seats</span> for the 2025-26 academic term.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SchoolAchievements;
