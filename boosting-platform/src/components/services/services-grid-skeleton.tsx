import { ServiceCardSkeleton } from "./service-card-skeleton"

export function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  )
} 