"use client"

import { useState, useEffect } from "react"
import ServiceFilters from "@/components/services/service-filters"
import ServiceGrid from "@/components/services/service-grid"
import { Service, ServiceCategory, SortOption } from "@/types/service"
import { Rank, getRankIndex } from "@/lib/ranks"

// Mock data with rank information
const services: Service[] = [
  {
    id: "1",
    title: "Bronze to Silver Boost",
    description: "Boost your competitive rank from Bronze to Silver",
    category: "Ranking",
    features: [
      "Professional players",
      "24/7 Support",
      "Secure boosting",
      "Progress tracking"
    ],
    image: "/rank-boost.jpg",
    price: 49.99,
    isPopular: true,
    estimatedTime: "2-3 days",
    fromRank: { tier: 'Bronze', division: 'III' },
    toRank: { tier: 'Silver', division: 'I' }
  },
  {
    id: "2",
    title: "Gold to Platinum Boost",
    description: "Advance your rank from Gold to Platinum",
    category: "Ranking",
    features: [
      "Expert boosters",
      "Priority queue",
      "Discrete service",
      "Regular updates"
    ],
    image: "/rank-boost-gold.jpg",
    price: 89.99,
    isNew: true,
    estimatedTime: "3-4 days",
    fromRank: { tier: 'Gold', division: 'III' },
    toRank: { tier: 'Platinum', division: 'I' }
  },
  // Add more services as needed
]

export default function ServicesPage() {
  const [filteredServices, setFilteredServices] = useState(services)
  const [filters, setFilters] = useState({
    category: 'all' as ServiceCategory | 'all',
    search: '',
    priceRange: [0, 500] as [number, number],
    fromRank: { tier: 'Bronze', division: 'III' } as Rank,
    toRank: { tier: 'One Above All' } as Rank
  })

  const applyFilters = () => {
    let result = [...services]

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(service => service.category === filters.category)
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(service => 
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
      )
    }

    // Price range filter
    result = result.filter(service => 
      service.price >= filters.priceRange[0] &&
      service.price <= filters.priceRange[1]
    )

    // Rank filter (only for ranking services)
    if (filters.fromRank && filters.toRank) {
      result = result.filter(service => {
        if (service.category !== 'Ranking' || !service.fromRank || !service.toRank) {
          return true
        }
        
        const fromRankIndex = getRankIndex(service.fromRank)
        const toRankIndex = getRankIndex(service.toRank)
        const filterFromIndex = getRankIndex(filters.fromRank)
        const filterToIndex = getRankIndex(filters.toRank)

        return fromRankIndex >= filterFromIndex && toRankIndex <= filterToIndex
      })
    }

    setFilteredServices(result)
  }

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters()
  }, [filters])

  const handleSort = (sort: SortOption) => {
    const sorted = [...filteredServices]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'popularity':
        sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
        break
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }
    setFilteredServices(sorted)
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Our Services</h1>
        <p className="text-lg text-muted-foreground">
          Browse our range of professional boosting services for Marvel Rivals
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <ServiceFilters 
            onCategoryChange={(category) => setFilters(prev => ({ ...prev, category }))}
            onSortChange={handleSort}
            onSearchChange={(search) => setFilters(prev => ({ ...prev, search }))}
            onPriceRangeChange={(range) => setFilters(prev => ({ ...prev, priceRange: range }))}
            onRankChange={(from, to) => setFilters(prev => ({ ...prev, fromRank: from, toRank: to }))}
          />
        </aside>

        <main>
          <ServiceGrid services={filteredServices} />
        </main>
      </div>
    </div>
  )
} 