import { Rank } from "@/lib/ranks"

export type ServiceCategory = 'Ranking' | 'Leveling' | 'Achievements' | 'Coaching'
export type SortOption = 'price-asc' | 'price-desc' | 'popularity' | 'newest'

export interface Service {
  id: string
  title: string
  description: string
  category: ServiceCategory
  features: string[]
  image: string
  price: number
  isNew?: boolean
  isPopular?: boolean
  estimatedTime: string
  fromRank?: Rank
  toRank?: Rank
} 