"use client"

import { useEffect, useState } from "react"
import { ServiceCard } from "@/components/services/service-card"
import { ServiceFilters } from "@/components/services/service-filters"
import { ServiceFiltersSkeleton } from "@/components/services/service-filters-skeleton"
import { ServicesGridSkeleton } from "@/components/services/services-grid-skeleton"
import { PageHeaderSkeleton } from "@/components/ui/page-header-skeleton"
import { RankTier } from "@/types/calculator"

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <PageHeaderSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <ServiceFiltersSkeleton />
            <ServicesGridSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
          <p className="text-muted-foreground">
            Choose from our range of professional Marvel Rivals boosting services
          </p>
        </div>

        {/* Filters and Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <aside className="md:sticky md:top-20 h-fit">
            <ServiceFilters
              onCategoryChange={() => {}}
              onSortChange={() => {}}
              onSearchChange={() => {}}
              onPriceRangeChange={() => {}}
              onRankChange={() => {}}
            />
          </aside>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ServiceCard
              title="Rank Boost"
              description="Fast and reliable rank boosting service. Our professional players will help you reach your desired rank quickly and safely."
              price="From $10"
              image="/rank-boost.jpg"
              href="/services/rank-boost"
            />
            <ServiceCard
              title="Coaching"
              description="One-on-one coaching sessions with top players. Learn advanced strategies, improve your mechanics, and master the meta."
              price="From $25/hour"
              image="/coaching.jpg"
              href="/services/coaching"
            />
            <ServiceCard
              title="Character Training"
              description="Specialized training for your favorite characters. Perfect your combos, learn matchups, and dominate with your main."
              price="From $20/hour"
              image="/character-training.jpg"
              href="/services/character-training"
            />
            <ServiceCard
              title="Placement Matches"
              description="Get the best start in your competitive journey with our placement matches service."
              price="From $15/match"
              image="/placement-matches.jpg"
              href="/services/placement-matches"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 