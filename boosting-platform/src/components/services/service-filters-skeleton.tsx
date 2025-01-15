import { Skeleton } from "@/components/ui/skeleton"

export function ServiceFiltersSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      {/* Category Filter Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Select */}
      </div>

      {/* Sort Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Select */}
      </div>

      {/* Price Range Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-4 w-20" /> {/* Price display */}
        </div>
        <Skeleton className="h-2 w-full" /> {/* Slider */}
      </div>

      {/* Rank Filter Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Select */}
      </div>

      {/* Reset Button Skeleton */}
      <Skeleton className="h-10 w-full" />
    </div>
  )
} 