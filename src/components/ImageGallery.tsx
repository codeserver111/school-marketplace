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
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
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
    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
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
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-card w-6"
                : "bg-card/50 hover:bg-card/70"
            )}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-foreground/70 text-card px-3 py-1 rounded-full text-sm font-medium z-10">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export default ImageGallery;
