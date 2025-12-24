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
    <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
      <Icon className="w-4 h-4 text-primary shrink-0" />
      <span className="text-sm text-foreground">{amenity}</span>
    </div>
  );
};

export default AmenityBadge;
