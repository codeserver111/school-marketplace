import { motion } from "framer-motion";
import { Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
          <Calendar className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Admission Roadmap</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Session 2025-26</span>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] shadow-premium border-white/10 overflow-hidden">
        <div className="divide-y divide-white/5">
          {deadlines.map((item, index) => (
            <motion.div
              key={item.grade}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
              className={cn(
                "p-6 flex items-center justify-between transition-colors",
                item.status === "closed" && "opacity-40 grayscale-[0.5]"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
                  item.status === "closed" ? "bg-muted/20" : "bg-primary/10 text-primary"
                )}>
                  <span className="font-black text-sm tracking-tighter">
                    {item.grade.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-black text-foreground tracking-tight mb-1 uppercase">{item.grade}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    <Clock className="w-3 h-3" />
                    <span>Closing {formatDate(item.deadline)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {item.status === "open" && (
                  <div className="bg-success/10 text-success px-4 py-1.5 rounded-xl border border-success/20 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                  </div>
                )}
                {item.status === "closing-soon" && (
                  <div className="bg-orange-500/10 text-orange-500 px-4 py-1.5 rounded-xl border border-orange-500/20 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">Ending Soon</span>
                  </div>
                )}
                {item.status === "closed" && (
                  <div className="bg-muted/20 text-muted-foreground px-4 py-1.5 rounded-xl flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Terminated</span>
                  </div>
                )}

                {item.seatsLeft !== undefined && item.status !== "closed" && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                      {item.seatsLeft} Inventory Left
                    </p>
                  </div>
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
