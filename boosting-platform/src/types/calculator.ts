export type RankTier = 
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Grandmaster"
  | "Celestial"
  | "Eternity"
  | "One Above All"

export type RankDivision = "III" | "II" | "I"

// All ranks have divisions, but Eternity and OneAboveAll only have "I"
export interface Rank {
  tier: RankTier
  division: RankDivision
} 