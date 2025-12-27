import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  Video,
  Camera,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TourLocation {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface VirtualTourProps {
  schoolName: string;
}

const tourLocations: TourLocation[] = [
  {
    id: "1",
    name: "Main Building",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    description: "Our state-of-the-art main building houses smart classrooms and administrative offices."
  },
  {
    id: "2",
    name: "Science Labs",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    description: "Fully equipped physics, chemistry, and biology labs with modern equipment."
  },
  {
    id: "3",
    name: "Sports Complex",
    image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800",
    description: "Olympic-size swimming pool, basketball courts, and indoor sports facilities."
  },
  {
    id: "4",
    name: "Library",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    description: "Digital library with 50,000+ books and dedicated reading spaces."
  },
  {
    id: "5",
    name: "Auditorium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description: "1000-seat auditorium for cultural events and presentations."
  },
  {
    id: "6",
    name: "Cafeteria",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800",
    description: "Hygienic cafeteria serving nutritious meals prepared in-house."
  },
];

const VirtualTour = ({ schoolName }: VirtualTourProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentLocation = tourLocations[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tourLocations.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tourLocations.length) % tourLocations.length);
  };

  // Auto-play functionality
  useState(() => {
    if (isPlaying) {
      const interval = setInterval(goToNext, 3000);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Video className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Virtual Campus Tour</h2>
        <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          360°
        </Badge>
      </div>

      {/* Tour Viewer */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <div className="relative rounded-xl overflow-hidden bg-card shadow-card">
          {/* Main Image */}
          <div className="relative aspect-video">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentLocation.id}
                src={currentLocation.image}
                alt={currentLocation.name}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30">
              {/* Top Controls */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <Badge className="bg-black/50 text-white border-0">
                  <MapPin className="w-3 h-3 mr-1" />
                  {currentLocation.name}
                </Badge>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm mb-3">{currentLocation.description}</p>
                
                {/* Play/Pause & Progress */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  
                  {/* Progress Dots */}
                  <div className="flex gap-1.5 flex-1">
                    {tourLocations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 rounded-full transition-all ${
                          index === currentIndex 
                            ? "bg-white flex-[2]" 
                            : "bg-white/40 flex-1 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <span className="text-white/70 text-xs">
                    {currentIndex + 1}/{tourLocations.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Dialog */}
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="relative aspect-video">
            <img
              src={currentLocation.image}
              alt={currentLocation.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-semibold mb-2">{currentLocation.name}</h3>
                <p className="text-white/80">{currentLocation.description}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={goToPrev}
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={goToNext}
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar pb-1">
        {tourLocations.map((location, index) => (
          <button
            key={location.id}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${
              index === currentIndex 
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualTour;
