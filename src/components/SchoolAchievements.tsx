import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, Users, Star, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Achievements & Results</h2>
        <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          2024
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {achievements.slice(0, 4).map((achievement, index) => {
          const Icon = IconMap[achievement.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl p-4 ${
                achievement.highlight 
                  ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20" 
                  : "bg-card shadow-card"
              }`}
            >
              {achievement.highlight && (
                <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary/40" />
              )}
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  achievement.highlight ? "bg-primary/20" : "bg-secondary"
                }`}>
                  <Icon className={`w-4 h-4 ${achievement.highlight ? "text-primary" : "text-muted-foreground"}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{achievement.value}</p>
              <p className="text-xs text-muted-foreground">{achievement.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Toppers Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Medal className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-foreground">2024 Board Toppers</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {toppers.map((topper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="flex-shrink-0 text-center"
            >
              <div className="relative mb-2">
                <img
                  src={topper.image}
                  alt={topper.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                />
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs">
                    👑
                  </div>
                )}
              </div>
              <p className="font-semibold text-sm text-foreground whitespace-nowrap">{topper.name}</p>
              <p className="text-primary font-bold text-lg">{topper.score}</p>
              <p className="text-xs text-muted-foreground">{topper.stream}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* University Placements */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-success" />
          <h3 className="font-semibold text-foreground">University Placements 2024</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {universityPlacements.map((uni, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1.5"
            >
              <span>{uni.logo}</span>
              <span className="text-sm font-medium text-foreground">{uni.name}</span>
              <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                {uni.count}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Preview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Annual Day & Events</h3>
          <span className="text-xs text-primary font-medium">View all →</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300",
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=300",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300",
          ].map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <img src={img} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
              {index === 2 && (
                <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+15</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Urgency Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-white"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold mb-1">Limited Seats Available!</h3>
            <p className="text-sm opacity-90">
              Only <span className="font-bold">23 seats</span> remaining for 2025-26 admissions. 
              Book a campus visit today!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SchoolAchievements;
