import { Skeleton } from "@/components/ui/skeleton"

export function FAQSkeleton() {
  return (
    <div className="space-y-6">
      {/* FAQ Header */}
      <div className="space-y-4 text-center">
        <Skeleton className="h-10 w-[200px] mx-auto" /> {/* Title */}
        <Skeleton className="h-4 w-[300px] mx-auto" /> {/* Description */}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-12 w-full" /> {/* Question bar */}
            <Skeleton className="h-24 w-full" /> {/* Answer content */}
          </div>
        ))}
      </div>
    </div>
  )
} 