"use client"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { PageHeaderSkeleton } from "@/components/ui/page-header-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

const steps = [
  {
    title: "Choose Your Service",
    description: "Browse our range of boosting services and select the one that matches your goals."
  },
  {
    title: "Customize Your Order",
    description: "Select your current and desired ranks, choose additional options, and review the price."
  },
  {
    title: "Place Your Order",
    description: "Complete your purchase securely. You'll receive confirmation and instructions immediately."
  },
  {
    title: "Track Progress",
    description: "Monitor your order's progress in real-time through our dashboard."
  }
]

const features = [
  "Professional boosters",
  "24/7 Customer support",
  "Secure payments",
  "Progress tracking",
  "Satisfaction guarantee",
  "Competitive prices"
]

function HowItWorksSkeleton() {
  return (
    <div className="space-y-12">
      <PageHeaderSkeleton />
      
      {/* Steps Skeleton */}
      <div className="space-y-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-none">
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Features Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <HowItWorksSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">How It Works</h1>
          <p className="text-muted-foreground">
            Get started with our boosting service in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-none">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 