import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  schoolName: string;
}

const ImageGallery = ({ images, schoolName }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "20%" : "-20%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "20%" : "-20%",
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative aspect-[4/3] bg-black overflow-hidden group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${schoolName} - Image ${currentIndex + 1}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Navigation buttons */}
      {images.length > 1 && (
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => paginate(-1)}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 border-white/20 active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 border-white/20 active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 px-4 py-2.5 glass-dark rounded-full border-white/10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "rounded-full transition-all duration-500",
              index === currentIndex
                ? "bg-white w-8 h-1.5"
                : "bg-white/30 w-1.5 h-1.5 hover:bg-white/50"
            )}
          />
        ))}
      </div>

      {/* High-end Badge */}
      <div className="absolute top-6 left-6 z-10">
        <div className="glass px-4 py-1.5 rounded-xl border-white/20 flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Virtual Tour Available</span>
        </div>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-6 right-6 glass px-3.5 py-1.5 rounded-xl border-white/20 text-white text-[10px] font-black tracking-widest z-10">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageGallery;
