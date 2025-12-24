import { useState, useMemo } from "react";
import LocationHeader from "@/components/LocationHeader";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import SchoolList from "@/components/SchoolList";
import BottomNavigation from "@/components/BottomNavigation";
import { schools, boards, feeRanges, filterSchools } from "@/data/mockSchools";

const Schools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("All");
  const [selectedFee, setSelectedFee] = useState("All");
  const [hasHostel, setHasHostel] = useState(false);
  const [hasTransport, setHasTransport] = useState(false);

  const filteredSchools = useMemo(() => {
    return filterSchools({
      board: selectedBoard,
      feeRange: selectedFee,
      hasHostel: hasHostel || undefined,
      hasTransport: hasTransport || undefined,
      searchQuery: searchQuery || undefined,
    });
  }, [searchQuery, selectedBoard, selectedFee, hasHostel, hasTransport]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <LocationHeader location="New Delhi" />
      
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search schools..."
      />

      <FilterChips
        selectedBoard={selectedBoard}
        selectedFee={selectedFee}
        hasHostel={hasHostel}
        hasTransport={hasTransport}
        onBoardChange={setSelectedBoard}
        onFeeChange={setSelectedFee}
        onHostelToggle={() => setHasHostel(!hasHostel)}
        onTransportToggle={() => setHasTransport(!hasTransport)}
        boards={boards}
        feeRanges={feeRanges}
      />

      <SchoolList schools={filteredSchools} />

      <BottomNavigation />
    </div>
  );
};

export default Schools;
