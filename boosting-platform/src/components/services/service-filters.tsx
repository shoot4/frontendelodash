"use client"

import { ServiceCategory, SortOption } from "@/types/service"
import { Button } from "../ui/button"
import { useState } from "react"
import { Rank, RANKS, formatRank } from "@/lib/ranks"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { rankUtils } from '@/lib/rank-utils'
import { toast } from 'react-hot-toast'

interface ServiceFiltersProps {
  onCategoryChange: (category: ServiceCategory | 'all') => void
  onSortChange: (sort: SortOption) => void
  onSearchChange: (search: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onRankChange: (from: Rank, to: Rank) => void
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  onCategoryChange,
  onSortChange,
  onSearchChange,
  onPriceRangeChange,
  onRankChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all')
  const [activeSort, setActiveSort] = useState<SortOption>('popularity')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [fromRank, setFromRank] = useState<Rank>(RANKS[0])
  const [toRank, setToRank] = useState<Rank>(RANKS[RANKS.length - 1])

  const categories: (ServiceCategory | 'all')[] = ['all', 'Ranking', 'Leveling', 'Achievements', 'Coaching']
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
  ]

  const handlePriceRangeChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]]
    setPriceRange(range)
    onPriceRangeChange(range)
  }

  const handleFromRankChange = (rankStr: string) => {
    const [tier, division] = rankStr.split(' ')
    const newFromRank: Rank = { 
      tier: tier as Rank['tier'], 
      division: division as Rank['division'] 
    }
    
    // Validate rank progression
    if (toRank && !rankUtils.isValidProgression(newFromRank, toRank)) {
      toast.error("Starting rank must be lower than target rank")
      return
    }

    setFromRank(newFromRank)
    onRankChange(newFromRank, toRank)
  }

  const handleToRankChange = (rankStr: string) => {
    const [tier, division] = rankStr.split(' ')
    const newToRank: Rank = { 
      tier: tier as Rank['tier'], 
      division: division as Rank['division'] 
    }
    
    // Validate rank progression
    if (fromRank && !rankUtils.isValidProgression(fromRank, newToRank)) {
      toast.error("Target rank must be higher than starting rank")
      return
    }

    setToRank(newToRank)
    onRankChange(fromRank, newToRank)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search services..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => {
              setActiveCategory(category)
              onCategoryChange(category)
            }}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Rank Selection */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">From Rank</label>
          <Select
            value={`${fromRank.tier}${fromRank.division ? ` ${fromRank.division}` : ''}`}
            onValueChange={handleFromRankChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANKS.map((rank) => (
                <SelectItem
                  key={formatRank(rank)}
                  value={formatRank(rank)}
                >
                  {formatRank(rank)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">To Rank</label>
          <Select
            value={`${toRank.tier}${toRank.division ? ` ${toRank.division}` : ''}`}
            onValueChange={handleToRankChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANKS.map((rank) => (
                <SelectItem
                  key={formatRank(rank)}
                  value={formatRank(rank)}
                >
                  {formatRank(rank)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <Slider
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={handlePriceRangeChange}
        />
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={activeSort === option.value ? "default" : "outline"}
            onClick={() => {
              setActiveSort(option.value)
              onSortChange(option.value)
            }}
            size="sm"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ServiceFilters 