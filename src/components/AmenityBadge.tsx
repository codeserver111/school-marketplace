import {
  Droplets,
  Dumbbell,
  FlaskConical,
  BookOpen,
  Theater,
  MonitorPlay,
  UtensilsCrossed,
  Stethoscope,
  Palette,
  Music,
  PersonStanding,
  Trees,
  Wifi,
  Bus,
  Home,
  Award,
  Globe,
  Laptop
} from "lucide-react";

interface AmenityBadgeProps {
  amenity: string;
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Swimming Pool": Droplets,
  "Sports Complex": Dumbbell,
  "Science Labs": FlaskConical,
  "Library": BookOpen,
  "Auditorium": Theater,
  "Smart Classrooms": MonitorPlay,
  "Cafeteria": UtensilsCrossed,
  "Medical Room": Stethoscope,
  "Art Gallery": Palette,
  "Art Studios": Palette,
  "Music Room": Music,
  "Dance Studio": PersonStanding,
  "Organic Garden": Trees,
  "Playground": Dumbbell,
  "Gymnasium": Dumbbell,
  "Basketball Court": Dumbbell,
  "Tennis Courts": Dumbbell,
  "Sports Academy": Award,
  "Computer Labs": Laptop,
  "Language Lab": Globe,
  "Robotics Lab": Laptop,
  "Innovation Lab": Laptop,
  "3D Printing": Laptop,
  "Research Labs": FlaskConical,
  "Recording Studio": Music,
  "Digital Library": BookOpen,
  "Amphitheatre": Theater,
  "Theatre": Theater,
  "Olympic Pool": Droplets,
  "Counseling Center": Stethoscope,
  "Yoga Hall": PersonStanding,
  "Meditation Center": PersonStanding,
  "Sports Fields": Dumbbell,
};

const AmenityBadge = ({ amenity }: AmenityBadgeProps) => {
  const Icon = amenityIcons[amenity] || Award;

  return (
    <div className="flex items-center gap-3 glass border-white/20 rounded-2xl px-5 py-3 shadow-card hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-foreground/80">{amenity}</span>
    </div>
  );
};

export default AmenityBadge;
