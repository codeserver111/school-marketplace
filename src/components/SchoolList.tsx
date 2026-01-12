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
      <div className="px-4 space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass rounded-[2rem] overflow-hidden shadow-card border-white/10">
            <div className="aspect-[16/10] animate-shimmer" />
            <div className="p-6 space-y-4">
              <div className="h-6 w-3/4 animate-shimmer rounded-xl" />
              <div className="h-4 w-1/2 animate-shimmer rounded-lg" />
              <div className="h-12 w-full animate-shimmer rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-4 py-20 text-center"
      >
        <div className="w-24 h-24 bg-secondary/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
          <span className="text-5xl">🏫</span>
        </div>
        <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">No Schools Found</h3>
        <p className="text-muted-foreground/80 font-medium max-w-[240px] mx-auto text-sm leading-relaxed">
          We couldn't find any schools matching your current filters. Try broadening your search.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 text-primary font-black uppercase tracking-widest text-xs hover:underline"
        >
          Reset All Filters
        </button>
      </motion.div>
    );
  }

  return (
    <div className="px-4 pb-32 space-y-6">
      <div className="flex items-center justify-between py-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <span className="text-foreground">{schools.length}</span> Elite Institutions Found
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schools.map((school, index) => (
          <SchoolCard key={school.id} school={school} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SchoolList;
