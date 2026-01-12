import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Circle,
  Bell,
  Calendar,
  MessageSquare,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Hourglass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ApplicationData,
  TimelineEvent,
} from "@/types/admission";
import { generateStatusUpdate, generateTimeline } from "@/services/admissionApi";
import { schools } from "@/data/mockSchools";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AdmissionTimelineProps {
  application: ApplicationData;
  onBack: () => void;
}

interface StatusUpdate {
  id: string;
  message: string;
  timestamp: string;
  isNew: boolean;
}

export default function AdmissionTimeline({ application, onBack }: AdmissionTimelineProps) {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setTimeline(generateTimeline(application.status));

    const initialUpdates: StatusUpdate[] = application.selectedSchools.slice(0, 3).map((schoolId, index) => {
      const school = schools.find(s => s.id === schoolId);
      return {
        id: `update_${index}`,
        message: generateStatusUpdate(application.status, school?.name),
        timestamp: new Date(Date.now() - index * 3600000).toISOString(),
        isNew: index === 0,
      };
    });
    setStatusUpdates(initialUpdates);
  }, [application]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const randomSchoolId = application.selectedSchools[Math.floor(Math.random() * application.selectedSchools.length)];
    const school = schools.find(s => s.id === randomSchoolId);
    const newUpdate: StatusUpdate = {
      id: `update_${Date.now()}`,
      message: generateStatusUpdate(application.status, school?.name),
      timestamp: new Date().toISOString(),
      isNew: true,
    };

    setStatusUpdates(prev => [newUpdate, ...prev.map(u => ({ ...u, isNew: false }))]);
    setIsRefreshing(false);
    toast.success("Status updated!");
  };

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border border-green-200 dark:border-green-800"><CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" /></div>;
      case "current":
        return <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 animate-pulse"><Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>;
      case "upcoming":
        return <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700"><Circle className="w-5 h-5 text-slate-400" /></div>;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short"
    });
  };

  return (
    <div className="flex flex-col h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="p-6 border-b border-indigo-100 dark:border-indigo-900/20 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Application Timeline</h2>
            <p className="text-sm text-muted-foreground">Tracking {application.selectedSchools.length} active applications</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="bg-white/80 dark:bg-black/20">
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900/20 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Est. Decision</p>
              <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100">June 15, 2026</p>
            </div>
          </div>
          <div className="flex-1 bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900/20 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Hourglass className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Current Status</p>
              <Badge variant="secondary" className="mt-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 pointer-events-none">
                In Progress
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative pl-4 space-y-8">
          {/* Timeline Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-indigo-100 dark:bg-indigo-900/30" />

          {timeline.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-4"
            >
              <div className="relative z-10 shrink-0">
                {getTimelineIcon(event.status)}
              </div>
              <div className={cn(
                "flex-1 p-4 rounded-xl border transition-all",
                event.status === "current"
                  ? "bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/10 scale-[1.02]"
                  : "bg-transparent border-transparent"
              )}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={cn("font-semibold text-lg", event.status === "upcoming" && "text-muted-foreground")}>{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                    {formatDate(event.date)}
                  </span>
                </div>

                {event.status === "current" && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 rounded-lg w-fit">
                    <Sparkles className="w-4 h-4" /> Action Required
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-dashed">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-500" /> Recent Updates
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Notifications</span>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
          </div>

          <div className="space-y-3">
            {statusUpdates.map((update) => (
              <div key={update.id} className="flex gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="mt-1">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{update.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
