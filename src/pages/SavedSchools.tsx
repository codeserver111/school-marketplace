import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LocationHeader from "@/components/LocationHeader";
import BottomNavigation from "@/components/BottomNavigation";
import SchoolCard from "@/components/SchoolCard";
import { useUser } from "@/contexts/UserContext";

const SavedSchools = () => {
  const { savedSchools } = useUser();

  return (
    <div className="min-h-screen bg-background pb-20">
      <LocationHeader location="New Delhi" />

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Saved Schools</h1>
        <p className="text-muted-foreground">
          {savedSchools.length > 0 
            ? `${savedSchools.length} school${savedSchools.length > 1 ? 's' : ''} saved`
            : "Schools you've bookmarked for later"
          }
        </p>
      </div>

      {savedSchools.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-12 text-center"
        >
          <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No saved schools yet
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
            Tap the heart icon on any school to save it here for quick access
          </p>
          <Link to="/schools">
            <Button variant="hero">Browse Schools</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="px-4 space-y-4">
          {savedSchools.map((school, index) => (
            <SchoolCard key={school.id} school={school} index={index} />
          ))}
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default SavedSchools;
