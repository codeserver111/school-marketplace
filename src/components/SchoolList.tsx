import { School } from "@/data/mockSchools";
import SchoolCard from "./SchoolCard";
import { motion } from "framer-motion";

interface SchoolListProps {
  schools: School[];
  isLoading?: boolean;
}

const SchoolList = ({ schools, isLoading }: SchoolListProps) => {
  if (isLoading) {
    return (
      <div className="px-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card">
            <div className="aspect-[16/10] animate-shimmer" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 animate-shimmer rounded" />
              <div className="h-4 w-1/2 animate-shimmer rounded" />
              <div className="h-4 w-1/3 animate-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 py-12 text-center"
      >
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🏫</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No schools found</h3>
        <p className="text-muted-foreground text-sm">
          Try adjusting your filters or search query
        </p>
      </motion.div>
    );
  }

  return (
    <div className="px-4 pb-24 space-y-4">
      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{schools.length}</span> schools found
        </p>
      </div>
      {schools.map((school, index) => (
        <SchoolCard key={school.id} school={school} index={index} />
      ))}
    </div>
  );
};

export default SchoolList;
