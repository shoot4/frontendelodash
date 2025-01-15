import { Skeleton } from "@/components/ui/skeleton"

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[200px]" /> {/* Title */}
      <Skeleton className="h-4 w-[300px]" /> {/* Description */}
    </div>
  )
} 