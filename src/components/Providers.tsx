"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComparisonProvider } from "../contexts/ComparisonContext";
import { UserProvider } from "../contexts/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <ComparisonProvider>
            <Toaster />
            <Sonner position="top-center" />
            {children}
          </ComparisonProvider>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
