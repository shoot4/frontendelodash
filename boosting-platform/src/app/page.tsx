"use client"

import { useEffect, useState } from "react"
import { ServiceCard } from "@/components/services/service-card"
import { Button } from "@/components/ui/button"
import { ServicesGridSkeleton } from "@/components/services/services-grid-skeleton"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

function HomeHeroSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <Skeleton className="h-12 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]" />
      <Skeleton className="h-6 w-[250px] sm:w-[350px] md:w-[450px]" />
      <div className="space-x-4 pt-4">
        <Skeleton className="inline-block h-10 w-32" />
        <Skeleton className="inline-block h-10 w-32" />
      </div>
    </div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        {/* Hero Section Skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <HomeHeroSkeleton />
          </div>
        </section>

        {/* Featured Services Section Skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Skeleton className="h-10 w-48 mx-auto mb-12" />
            <ServicesGridSkeleton />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Marvel Rivals Boosting Service
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Professional boosting services to help you reach your desired rank. Trusted by thousands of players.
            </p>
            <div className="space-x-4">
              <Link href="/services">
                <Button size="lg">View Services</Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Rank Boost"
              description="Reach your desired rank with our professional boosters"
              price="From $10"
              image="/rank-boost.jpg"
              href="/services/rank-boost"
            />
            <ServiceCard
              title="Coaching"
              description="Learn from the best players and improve your skills"
              price="From $25/hour"
              image="/coaching.jpg"
              href="/services/coaching"
            />
            <ServiceCard
              title="Character Training"
              description="Master your favorite characters with personalized training"
              price="From $20/hour"
              image="/character-training.jpg"
              href="/services/character-training"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
