import { motion } from "framer-motion";
import { Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdmissionDeadline {
  grade: string;
  deadline: string;
  status: "open" | "closing-soon" | "closed";
  seatsLeft?: number;
}

interface AdmissionDeadlinesProps {
  schoolName: string;
}

const AdmissionDeadlines = ({ schoolName }: AdmissionDeadlinesProps) => {
  // Mock data - in real app would come from API
  const deadlines: AdmissionDeadline[] = [
    { grade: "Play School", deadline: "2025-03-15", status: "open", seatsLeft: 25 },
    { grade: "Nursery - UKG", deadline: "2025-02-28", status: "closing-soon", seatsLeft: 8 },
    { grade: "Grade 1-5", deadline: "2025-03-31", status: "open", seatsLeft: 42 },
    { grade: "Grade 6-8", deadline: "2025-02-15", status: "closing-soon", seatsLeft: 5 },
    { grade: "Grade 9-10", deadline: "2025-01-31", status: "closed" },
    { grade: "Grade 11-12", deadline: "2025-04-15", status: "open", seatsLeft: 30 },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: AdmissionDeadline['status']) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-success/20 text-success border-0">
            <CheckCircle className="w-3 h-3 mr-1" />
            Open
          </Badge>
        );
      case "closing-soon":
        return (
          <Badge className="bg-warning/20 text-warning border-0">
            <Clock className="w-3 h-3 mr-1" />
            Closing Soon
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-destructive/20 text-destructive border-0">
            <AlertCircle className="w-3 h-3 mr-1" />
            Closed
          </Badge>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Admission Deadlines</h2>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="divide-y divide-border">
          {deadlines.map((item, index) => (
            <motion.div
              key={item.grade}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 flex items-center justify-between ${
                item.status === "closed" ? "opacity-50" : ""
              }`}
            >
              <div>
                <p className="font-medium text-foreground">{item.grade}</p>
                <p className="text-sm text-muted-foreground">
                  Deadline: {formatDate(item.deadline)}
                </p>
              </div>
              <div className="text-right">
                {getStatusBadge(item.status)}
                {item.seatsLeft !== undefined && item.status !== "closed" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.seatsLeft} seats left
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdmissionDeadlines;
