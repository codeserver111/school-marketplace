import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

// School Card Skeleton
function SchoolCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-[16/10] bg-muted" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-5 bg-muted rounded w-3/4" />

        {/* Location skeleton */}
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>

        {/* Class levels skeleton */}
        <div className="flex gap-1">
          <div className="h-5 bg-muted rounded px-2 py-0.5 w-16" />
          <div className="h-5 bg-muted rounded px-2 py-0.5 w-20" />
          <div className="h-5 bg-muted rounded px-2 py-0.5 w-14" />
        </div>

        {/* Fee skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3 bg-muted rounded w-16 mb-1" />
            <div className="h-5 bg-muted rounded w-20" />
          </div>

          {/* Transport icons skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-muted rounded-full" />
            <div className="w-7 h-7 bg-muted rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Header Skeleton
function HeaderSkeleton() {
  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border/50 z-40 safe-top shadow-sm animate-pulse">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted rounded-lg" />
          <div className="hidden sm:block h-5 bg-muted rounded w-24" />
        </div>

        {/* Location skeleton */}
        <div className="flex-1 max-w-xs mx-4 bg-muted/50 rounded-full px-4 py-2">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="flex flex-col items-start flex-1">
              <div className="h-3 bg-muted rounded w-16 mb-1" />
              <div className="flex items-center gap-1">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="w-3 h-3 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Notification skeleton */}
        <div className="w-9 h-9 bg-muted rounded-full" />
      </div>
    </div>
  );
}

// Search Bar Skeleton
function SearchBarSkeleton() {
  return (
    <div className="px-4 mb-4 animate-pulse">
      <div className="h-12 bg-muted rounded-xl" />
    </div>
  );
}

// Stats Grid Skeleton
function StatsGridSkeleton() {
  return (
    <div className="px-4 mb-6 animate-pulse">
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-xl p-4 shadow-card">
            <div className="w-10 h-10 bg-muted rounded-full mx-auto mb-2" />
            <div className="h-6 bg-muted rounded w-12 mx-auto mb-1" />
            <div className="h-3 bg-muted rounded w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero Banner Skeleton
function HeroBannerSkeleton() {
  return (
    <div className="px-4 mb-6 animate-pulse">
      <div className="relative bg-muted rounded-2xl p-6 overflow-hidden">
        <div className="relative z-10">
          <div className="h-6 bg-muted/30 rounded w-48 mb-2" />
          <div className="h-4 bg-muted/30 rounded w-64 mb-4" />
          <div className="h-9 bg-muted/30 rounded w-32" />
        </div>
        <div className="absolute right-0 bottom-0 opacity-20">
          <div className="w-32 h-32 bg-muted/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// School List Skeleton
function SchoolListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="px-4 space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <SchoolCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Admission Chat Skeleton
function AdmissionChatSkeleton() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-primary/5 to-background animate-pulse">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-24 mb-1" />
            <div className="h-3 bg-muted rounded w-32" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Bot message */}
        <div className="flex gap-3 justify-start">
          <div className="w-8 h-8 rounded-full bg-primary/10" />
          <div className="bg-card border rounded-2xl px-4 py-3 max-w-[80%]">
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>

        {/* User message */}
        <div className="flex gap-3 justify-end">
          <div className="bg-primary rounded-2xl px-4 py-3 max-w-[80%]">
            <div className="h-4 bg-muted/30 rounded w-24" />
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary" />
        </div>

        {/* Bot message with options */}
        <div className="flex gap-3 justify-start">
          <div className="w-8 h-8 rounded-full bg-primary/10" />
          <div className="bg-card border rounded-2xl px-4 py-3 max-w-[80%]">
            <div className="h-4 bg-muted rounded w-48 mb-3" />
            <div className="flex flex-wrap gap-2">
              <div className="h-8 bg-muted rounded px-3 py-1 w-16" />
              <div className="h-8 bg-muted rounded px-3 py-1 w-20" />
              <div className="h-8 bg-muted rounded px-3 py-1 w-14" />
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-muted rounded-md" />
          <div className="w-10 h-10 bg-muted rounded-md" />
        </div>
      </div>
    </div>
  );
}

// School Matching Skeleton
function SchoolMatchingSkeleton() {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      {/* Header */}
      <div className="text-center">
        <div className="h-6 bg-muted rounded w-48 mx-auto mb-2" />
        <div className="h-4 bg-muted rounded w-32 mx-auto" />
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full" />

      {/* School cards */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-4 bg-muted rounded w-12" />
                </div>
              </div>
              <div className="w-20 h-8 bg-muted rounded-full" />
            </div>

            {/* Match factors */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-4 bg-muted rounded w-12" />
              </div>
              <div className="h-2 bg-muted rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-muted rounded-lg" />
        <div className="flex-1 h-12 bg-muted rounded-lg" />
      </div>
    </div>
  );
}

// Profile Template Skeleton
function ProfileTemplateSkeleton() {
  return (
    <div className="mt-4 space-y-3 animate-pulse">
      <div className="grid gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card rounded-xl p-4 border-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-full" />
              <div className="flex-1">
                <div className="h-5 bg-muted rounded w-32 mb-1" />
                <div className="h-4 bg-muted rounded w-48" />
              </div>
              <div className="w-5 h-5 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t">
        <div className="h-10 bg-muted rounded-lg w-full" />
      </div>
    </div>
  );
}

// School Detail Header Skeleton
function SchoolDetailHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Image */}
      <div className="relative h-64 bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-8 bg-muted/80 rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted/60 rounded w-1/2" />
        </div>
      </div>

      {/* School Info Cards */}
      <div className="px-6 -mt-8 relative z-10">
        <div className="bg-card rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div>
                <div className="h-4 bg-muted rounded w-16 mb-1" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div>
                <div className="h-4 bg-muted rounded w-20 mb-1" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 h-12 bg-muted rounded-lg" />
            <div className="flex-1 h-12 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// School Detail Content Skeleton
function SchoolDetailContentSkeleton() {
  return (
    <div className="px-6 py-6 space-y-8 animate-pulse">
      {/* About Section */}
      <div>
        <div className="h-6 bg-muted rounded w-24 mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-4/5" />
        </div>
      </div>

      {/* Key Details */}
      <div>
        <div className="h-6 bg-muted rounded w-32 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div>
        <div className="h-6 bg-muted rounded w-20 mb-4" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg" />
          ))}
        </div>
      </div>

      {/* Reviews Skeleton */}
      <div>
        <div className="h-6 bg-muted rounded w-16 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-24 mb-1" />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-4 h-4 bg-muted rounded" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export {
  Skeleton,
  SchoolCardSkeleton,
  HeaderSkeleton,
  SearchBarSkeleton,
  StatsGridSkeleton,
  HeroBannerSkeleton,
  SchoolListSkeleton,
  AdmissionChatSkeleton,
  SchoolMatchingSkeleton,
  ProfileTemplateSkeleton,
  SchoolDetailHeaderSkeleton,
  SchoolDetailContentSkeleton
};
