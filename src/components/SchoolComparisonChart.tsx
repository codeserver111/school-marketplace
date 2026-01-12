import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ComparisonMetric {
  label: string;
  schoolValue: number;
  averageValue: number;
  maxValue: number;
  unit?: string;
  higherIsBetter?: boolean;
}

interface SchoolComparisonChartProps {
  schoolName: string;
  schoolRating: number;
  schoolFee: number;
  teacherRatio: string;
}

const SchoolComparisonChart = ({
  schoolName,
  schoolRating,
  schoolFee,
  teacherRatio
}: SchoolComparisonChartProps) => {
  // Parse teacher ratio (e.g., "1:25" -> 25)
  const ratioNumber = parseInt(teacherRatio.split(":")[1] || "25");

  const metrics: ComparisonMetric[] = [
    {
      label: "Overall Institution Rating",
      schoolValue: schoolRating,
      averageValue: 4.0,
      maxValue: 5,
      unit: "/5",
      higherIsBetter: true,
    },
    {
      label: "Academic Proficiency",
      schoolValue: 92,
      averageValue: 78,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Architectural Infrastructure",
      schoolValue: 88,
      averageValue: 72,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Holistic Development",
      schoolValue: 85,
      averageValue: 65,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Pedagogical Excellence",
      schoolValue: 90,
      averageValue: 75,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Pedagogical Density (Ratio)",
      schoolValue: ratioNumber,
      averageValue: 30,
      maxValue: 40,
      unit: " Students",
      higherIsBetter: false,
    },
  ];

  const getPerformanceLabel = (schoolVal: number, avgVal: number, higherIsBetter: boolean = true) => {
    const diff = higherIsBetter ? schoolVal - avgVal : avgVal - schoolVal;
    const percentDiff = Math.abs((diff / avgVal) * 100).toFixed(0);

    if (diff > 0) {
      return { text: `${percentDiff}% Above Threshold`, color: "text-emerald-500" };
    } else if (diff < 0) {
      return { text: `${Math.abs(parseInt(percentDiff))}% Below Threshold`, color: "text-red-500" };
    }
    return { text: "Regional Standard", color: "text-muted-foreground" };
  };

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <BarChart3 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Competitive Benchmarking</h2>
        <div className="ml-auto glass px-3 py-1 rounded-xl border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
          Regional Analysis
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: TrendingUp, val: "Elite 5%", label: "Regional Standing", color: "from-emerald-500 to-teal-500" },
          { icon: Award, val: "#2 Rank", label: "Premium Tier", color: "from-amber-500 to-orange-500" },
          { icon: Users, val: teacherRatio, label: "Teacher Proximity", color: "from-blue-500 to-indigo-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-6 border-white/10 shadow-card text-center relative overflow-hidden group"
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br", stat.color)} />
            <stat.icon className="w-6 h-6 mx-auto mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <p className="text-xl font-black text-foreground tracking-tighter mb-1">{stat.val}</p>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Comparison Bars */}
      <div className="glass rounded-[2.5rem] p-8 shadow-premium border-white/10 space-y-8">
        {metrics.map((metric, index) => {
          const performance = getPerformanceLabel(
            metric.schoolValue,
            metric.averageValue,
            metric.higherIsBetter
          );
          const schoolPercent = (metric.schoolValue / metric.maxValue) * 100;
          const avgPercent = (metric.averageValue / metric.maxValue) * 100;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">{metric.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-foreground tracking-tight">
                    {metric.schoolValue}{metric.unit}
                  </span>
                  <div className="w-1 h-1 bg-muted rounded-full" />
                  <span className={cn("text-[9px] font-black uppercase tracking-widest", performance.color)}>
                    {performance.text}
                  </span>
                </div>
              </div>

              {/* Visual Bar Comparison */}
              <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                {/* Average indicator line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground/10 z-20"
                  style={{ left: `${avgPercent}%` }}
                />
                {/* School value bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${schoolPercent}%` }}
                  transition={{ duration: 1, ease: "circOut", delay: index * 0.1 }}
                  className={cn(
                    "h-full rounded-full relative z-10",
                    (metric.higherIsBetter && metric.schoolValue >= metric.averageValue) ||
                      (!metric.higherIsBetter && metric.schoolValue <= metric.averageValue)
                      ? "bg-foreground"
                      : "bg-red-500/80"
                  )}
                />
              </div>

              {/* Legend for first item only */}
              {index === 0 && (
                <div className="flex items-center gap-6 mt-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1.5 bg-foreground rounded-full" />
                    <span>{schoolName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-0.5 h-3 bg-foreground/20" />
                    <span>Regional Average</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
        <div className="h-[1px] w-8 bg-muted/20" />
        <span>Data Aggregate: 75+ Peer Institutions (15km radius)</span>
        <div className="h-[1px] w-8 bg-muted/20" />
      </div>
    </div>
  );
};

export default SchoolComparisonChart;
