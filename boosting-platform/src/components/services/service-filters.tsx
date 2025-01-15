"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RankTier } from "@/types/calculator"

interface ServiceFiltersProps {
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  onSearchChange: (search: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onRankChange: (rank: RankTier) => void
}

const categories = [
  { value: "all", label: "All Services" },
  { value: "ranked", label: "Rank Boost" },
  { value: "coaching", label: "Coaching" },
  { value: "training", label: "Character Training" },
]

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popularity", label: "Most Popular" },
  { value: "newest", label: "Newest" },
]

const rankTiers: RankTier[] = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Grandmaster",
  "Celestial",
  "Eternity",
  "One Above All"
]

export function ServiceFilters({
  onCategoryChange,
  onSortChange,
  onSearchChange,
  onPriceRangeChange,
  onRankChange,
}: ServiceFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearchChange(value)
  }

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]]
    setPriceRange(range)
    onPriceRangeChange(range)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Search</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Category</h3>
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Sort By</h3>
        <Select onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Price Range</h3>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={100}
          step={5}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="w-full"
        />
      </div>

      {/* Rank Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Minimum Rank Required</h3>
        <Select onValueChange={(value) => onRankChange(value as RankTier)}>
          <SelectTrigger>
            <SelectValue placeholder="Select rank" />
          </SelectTrigger>
          <SelectContent>
            {rankTiers.map((rank) => (
              <SelectItem key={rank} value={rank}>
                {rank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSearchQuery("")
          setPriceRange([0, 100])
          onSearchChange("")
          onCategoryChange("all")
          onSortChange("popularity")
          onPriceRangeChange([0, 100])
          onRankChange("Bronze")
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
} 