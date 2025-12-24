import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import ComparisonBar from "./components/ComparisonBar";
import Index from "./pages/Index";
import Schools from "./pages/Schools";
import SchoolDetail from "./pages/SchoolDetail";
import MapView from "./pages/MapView";
import SavedSchools from "./pages/SavedSchools";
import Profile from "./pages/Profile";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ComparisonProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/school/:slug" element={<SchoolDetail />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/saved" element={<SavedSchools />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ComparisonBar />
        </BrowserRouter>
      </ComparisonProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
