import { useState, useMemo } from "react";
import LocationHeader from "@/components/LocationHeader";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import SchoolList from "@/components/SchoolList";
import BottomNavigation from "@/components/BottomNavigation";
import { schools, boards, feeRanges, classLevels, filterSchools } from "@/data/mockSchools";
import { useUser } from "@/contexts/UserContext";

const Schools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("All");
  const [selectedFee, setSelectedFee] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [hasHostel, setHasHostel] = useState(false);
  const [hasTransport, setHasTransport] = useState(false);
  const { addRecentSearch } = useUser();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      addRecentSearch(query);
    }
  };

  const filteredSchools = useMemo(() => {
    return filterSchools({
      board: selectedBoard,
      feeRange: selectedFee,
      classLevel: selectedClass,
      hasHostel: hasHostel || undefined,
      hasTransport: hasTransport || undefined,
      searchQuery: searchQuery || undefined,
    });
  }, [searchQuery, selectedBoard, selectedFee, selectedClass, hasHostel, hasTransport]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <LocationHeader location="New Delhi" />
      
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search schools..."
      />

      <FilterChips
        selectedBoard={selectedBoard}
        selectedFee={selectedFee}
        selectedClass={selectedClass}
        hasHostel={hasHostel}
        hasTransport={hasTransport}
        onBoardChange={setSelectedBoard}
        onFeeChange={setSelectedFee}
        onClassChange={setSelectedClass}
        onHostelToggle={() => setHasHostel(!hasHostel)}
        onTransportToggle={() => setHasTransport(!hasTransport)}
        boards={boards}
        feeRanges={feeRanges}
        classLevels={classLevels}
      />

      <SchoolList schools={filteredSchools} />

      <BottomNavigation />
    </div>
  );
};

export default Schools;
