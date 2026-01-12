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
      const interval = setInterval(goToNext, 4000);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Video className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Immersive Exploration</h2>
        <div className="ml-auto glass px-3 py-1 rounded-xl border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
          360° Cinematic View
        </div>
      </div>

      {/* Tour Viewer */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <div className="relative rounded-[2.5rem] overflow-hidden bg-foreground shadow-premium border-white/5 group">
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
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40">
              {/* Top Controls */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="glass-dark px-4 py-2 rounded-2xl flex items-center gap-2 border-white/10">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">{currentLocation.name}</span>
                </div>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-10 h-10 glass-dark hover:bg-white/20 text-white rounded-xl border-white/10"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.p
                  key={currentLocation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/80 text-sm font-medium mb-6 max-w-xl leading-relaxed italic"
                >
                  "{currentLocation.description}"
                </motion.p>

                {/* Play/Pause & Progress */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 glass hover:bg-white/30 rounded-2xl flex items-center justify-center text-white transition-all duration-300 shadow-lg border-white/10"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                  </button>

                  {/* Progress Items */}
                  <div className="flex gap-2 flex-1 items-end h-8">
                    {tourLocations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 overflow-hidden relative ${index === currentIndex
                          ? "bg-blue-500 flex-[4]"
                          : "bg-white/20 flex-1 hover:bg-white/40"
                          }`}
                      >
                        {index === currentIndex && isPlaying && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4, ease: "linear" }}
                            className="absolute inset-0 bg-white/40"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <span className="text-white font-black text-[10px] uppercase tracking-widest opacity-60 min-w-[40px]">
                    {currentIndex + 1} / {tourLocations.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Dialog */}
        <DialogContent className="max-w-6xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden">
            <img
              src={currentLocation.image}
              alt={currentLocation.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h3 className="text-white text-3xl font-black tracking-tighter mb-4 uppercase">{currentLocation.name}</h3>
                <p className="text-white/80 text-lg max-w-2xl font-medium leading-relaxed italic">"{currentLocation.description}"</p>
                <div className="flex items-center gap-4 mt-8">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={goToPrev}
                    className="w-14 h-14 glass hover:bg-white/20 text-white rounded-2xl border-white/10"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={goToNext}
                    className="w-14 h-14 glass hover:bg-white/20 text-white rounded-2xl border-white/10"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnail Navigation */}
      <div className="flex gap-3 mt-6 overflow-x-auto hide-scrollbar pb-2 px-1">
        {tourLocations.map((location, index) => (
          <button
            key={location.id}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-24 h-16 rounded-2xl overflow-hidden transition-all duration-500 border-2 ${index === currentIndex
              ? "border-blue-500 scale-105 shadow-lg shadow-blue-500/20"
              : "border-white/5 opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
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
