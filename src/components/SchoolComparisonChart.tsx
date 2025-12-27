import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
      label: "Overall Rating",
      schoolValue: schoolRating,
      averageValue: 4.0,
      maxValue: 5,
      unit: "/5",
      higherIsBetter: true,
    },
    {
      label: "Academic Performance",
      schoolValue: 92,
      averageValue: 78,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Infrastructure",
      schoolValue: 88,
      averageValue: 72,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Extra-curricular",
      schoolValue: 85,
      averageValue: 65,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Teacher Quality",
      schoolValue: 90,
      averageValue: 75,
      maxValue: 100,
      unit: "%",
      higherIsBetter: true,
    },
    {
      label: "Student-Teacher Ratio",
      schoolValue: ratioNumber,
      averageValue: 30,
      maxValue: 40,
      unit: " students",
      higherIsBetter: false,
    },
  ];

  const getPerformanceLabel = (schoolVal: number, avgVal: number, higherIsBetter: boolean = true) => {
    const diff = higherIsBetter ? schoolVal - avgVal : avgVal - schoolVal;
    const percentDiff = Math.abs((diff / avgVal) * 100).toFixed(0);
    
    if (diff > 0) {
      return { text: `${percentDiff}% above avg`, color: "text-success" };
    } else if (diff < 0) {
      return { text: `${Math.abs(parseInt(percentDiff))}% below avg`, color: "text-destructive" };
    }
    return { text: "Average", color: "text-muted-foreground" };
  };

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">How We Compare</h2>
        <Badge variant="secondary" className="ml-auto">
          vs Area Schools
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-3 text-center"
        >
          <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">Top 10%</p>
          <p className="text-xs text-muted-foreground">in Delhi NCR</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-3 text-center"
        >
          <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">#3</p>
          <p className="text-xs text-muted-foreground">in {schoolFee > 200000 ? "Premium" : "Mid-range"}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-3 text-center"
        >
          <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{teacherRatio}</p>
          <p className="text-xs text-muted-foreground">Teacher Ratio</p>
        </motion.div>
      </div>

      {/* Comparison Bars */}
      <div className="bg-card rounded-xl p-4 shadow-card space-y-4">
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">
                    {metric.schoolValue}{metric.unit}
                  </span>
                  <span className={`text-xs ${performance.color}`}>
                    {performance.text}
                  </span>
                </div>
              </div>
              
              {/* Visual Bar Comparison */}
              <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                {/* Average indicator line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/50 z-10"
                  style={{ left: `${avgPercent}%` }}
                />
                {/* School value bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${schoolPercent}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    (metric.higherIsBetter && metric.schoolValue >= metric.averageValue) ||
                    (!metric.higherIsBetter && metric.schoolValue <= metric.averageValue)
                      ? "bg-gradient-to-r from-primary to-primary/70"
                      : "bg-gradient-to-r from-amber-500 to-amber-400"
                  }`}
                />
              </div>
              
              {/* Legend for first item only */}
              {index === 0 && (
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-2 bg-primary rounded-sm" />
                    <span>This school</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-0.5 h-3 bg-muted-foreground/50" />
                    <span>Area average</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Based on data from 50+ schools within 10km radius
      </p>
    </div>
  );
};

export default SchoolComparisonChart;
