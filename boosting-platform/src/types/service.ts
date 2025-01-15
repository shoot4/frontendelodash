import { Rank } from "@/lib/ranks"

export type ServiceCategory = 'Ranking' | 'Leveling' | 'Achievements' | 'Coaching'
export type SortOption = 'price-asc' | 'price-desc' | 'popularity' | 'newest'

export interface Service {
  id: string
  title: string
  description: string
  price: string
  category: 'ranked' | 'unranked' | 'coaching' | 'other'
  image: string
} 