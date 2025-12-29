import { motion } from "framer-motion";
import { Check, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { SchoolType } from "./SchoolTypeSelector";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureRow {
  feature: string;
  description?: string;
  preschool: boolean | string;
  "day-school": boolean | string;
  boarding: boolean | string;
  "day-boarding": boolean | string;
}

const featureData: FeatureRow[] = [
  {
    feature: "Age Range",
    description: "Typical age group of students",
    preschool: "2-5 yrs",
    "day-school": "5-18 yrs",
    boarding: "8-18 yrs",
    "day-boarding": "6-18 yrs"
  },
  {
    feature: "Curriculum",
    description: "Educational framework offered",
    preschool: "Play-based",
    "day-school": "CBSE/ICSE/IB",
    boarding: "CBSE/ICSE/IB",
    "day-boarding": "CBSE/ICSE/IB"
  },
  {
    feature: "School Timings",
    description: "Typical operating hours",
    preschool: "3-4 hrs",
    "day-school": "6-8 hrs",
    boarding: "24/7",
    "day-boarding": "Flexible"
  },
  {
    feature: "Transport",
    description: "School bus facility available",
    preschool: true,
    "day-school": true,
    boarding: false,
    "day-boarding": true
  },
  {
    feature: "Hostel",
    description: "Residential accommodation",
    preschool: false,
    "day-school": false,
    boarding: true,
    "day-boarding": true
  },
  {
    feature: "Meals Provided",
    description: "In-school meal service",
    preschool: true,
    "day-school": true,
    boarding: true,
    "day-boarding": true
  },
  {
    feature: "Extracurriculars",
    description: "Sports, arts, and activities",
    preschool: "Basic",
    "day-school": "Extensive",
    boarding: "Extensive",
    "day-boarding": "Extensive"
  },
  {
    feature: "Fees Range",
    description: "Annual fee estimate",
    preschool: "₹50K-1L",
    "day-school": "₹1L-4L",
    boarding: "₹3L-8L",
    "day-boarding": "₹2L-5L"
  },
  {
    feature: "Safety & Security",
    description: "Security measures in place",
    preschool: true,
    "day-school": true,
    boarding: true,
    "day-boarding": true
  },
  {
    feature: "Bus Tracking",
    description: "GPS-enabled bus tracking",
    preschool: true,
    "day-school": true,
    boarding: false,
    "day-boarding": true
  },
  {
    feature: "Teacher Ratio",
    description: "Student to teacher ratio",
    preschool: "1:8",
    "day-school": "1:25",
    boarding: "1:15",
    "day-boarding": "1:20"
  }
];

const schoolTypeLabels: Record<Exclude<SchoolType, null>, string> = {
  preschool: "Preschool",
  "day-school": "Day School",
  boarding: "Boarding",
  "day-boarding": "Day-Boarding"
};

interface SchoolTypeComparisonTableProps {
  highlightType?: SchoolType;
}

const SchoolTypeComparisonTable = ({ highlightType }: SchoolTypeComparisonTableProps) => {
  const renderCell = (value: boolean | string, isHighlighted: boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <span className={cn(
          "inline-flex items-center justify-center w-6 h-6 rounded-full",
          isHighlighted ? "bg-success/20 text-success" : "bg-success/10 text-success"
        )}>
          <Check className="w-4 h-4" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
          <Minus className="w-4 h-4" />
        </span>
      );
    }
    return (
      <span className={cn(
        "text-xs font-medium",
        isHighlighted ? "text-primary" : "text-foreground"
      )}>
        {value}
      </span>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="px-4 mb-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-1">Compare School Types</h2>
      <p className="text-sm text-muted-foreground mb-4">Feature comparison across different school categories</p>
      
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="inline-block min-w-full">
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground min-w-[120px]">Feature</th>
                  {(Object.keys(schoolTypeLabels) as Exclude<SchoolType, null>[]).map((type) => (
                    <th
                      key={type}
                      className={cn(
                        "text-center p-3 font-semibold min-w-[90px]",
                        highlightType === type ? "bg-primary/10 text-primary" : "text-foreground"
                      )}
                    >
                      {schoolTypeLabels[type]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureData.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-border/50 last:border-0",
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    )}
                  >
                    <td className="p-3 font-medium text-foreground">
                      <div className="flex items-center gap-1.5">
                        {row.feature}
                        {row.description && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[200px]">
                              <p className="text-xs">{row.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    {(Object.keys(schoolTypeLabels) as Exclude<SchoolType, null>[]).map((type) => (
                      <td
                        key={type}
                        className={cn(
                          "p-3 text-center",
                          highlightType === type && "bg-primary/5"
                        )}
                      >
                        {renderCell(row[type], highlightType === type)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SchoolTypeComparisonTable;
