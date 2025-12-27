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
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  ApplicationData, 
  TimelineEvent, 
  ApplicationStatus 
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
    // Generate initial timeline
    setTimeline(generateTimeline(application.status));

    // Generate initial status updates
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
    
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add a new mock update
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
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "current":
        return <Clock className="w-5 h-5 text-primary animate-pulse" />;
      case "upcoming":
        return <Circle className="w-5 h-5 text-muted-foreground" />;
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

  const formatUpdateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getEstimatedDecisionDate = () => {
    const decisionEvent = timeline.find(e => e.title === "Final Decision");
    if (decisionEvent) {
      const date = new Date(decisionEvent.date);
      return date.toLocaleDateString("en-IN", { 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
      });
    }
    return "TBD";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold">Admission Timeline</h2>
            <p className="text-sm text-muted-foreground">
              Tracking {application.selectedSchools.length} application{application.selectedSchools.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Estimated Decision */}
        <Card className="p-3 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Estimated Decision</p>
                <p className="font-semibold text-primary">{getEstimatedDecisionDate()}</p>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/30">
              {application.status.replace(/_/g, " ").toUpperCase()}
            </Badge>
          </div>
        </Card>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Timeline Section */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Progress Timeline
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-border" />

            {/* Timeline Events */}
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-4"
                >
                  {/* Icon */}
                  <div className="relative z-10 bg-background">
                    {getTimelineIcon(event.status)}
                  </div>

                  {/* Content */}
                  <div className={cn(
                    "flex-1 pb-4",
                    event.status === "current" && "pb-6"
                  )}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={cn(
                          "font-medium",
                          event.status === "upcoming" && "text-muted-foreground"
                        )}>
                          {event.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {event.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          event.status === "current" && "bg-primary/10 text-primary border-primary/30"
                        )}
                      >
                        {formatDate(event.date)}
                      </Badge>
                    </div>

                    {/* Current step highlight */}
                    {event.status === "current" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-sm text-primary font-medium">
                            This is your current step
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Status Updates Section */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              AI Status Updates
            </h3>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>

          <div className="space-y-3">
            {statusUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={cn(
                    "p-3",
                    update.isNew && "ring-2 ring-primary/50 bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      update.isNew ? "bg-primary/10" : "bg-muted"
                    )}>
                      <MessageSquare className={cn(
                        "w-4 h-4",
                        update.isNew ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{update.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatUpdateTime(update.timestamp)}
                      </p>
                    </div>
                    {update.isNew && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Schools */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Applied Schools
          </h3>
          <div className="space-y-2">
            {application.selectedSchools.map((schoolId) => {
              const school = schools.find(s => s.id === schoolId);
              if (!school) return null;
              
              return (
                <Card key={schoolId} className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={school.images[0]}
                      alt={school.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{school.name}</p>
                      <p className="text-xs text-muted-foreground">{school.board} • {school.city}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-card">
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back to Application
        </Button>
      </div>
    </div>
  );
}
