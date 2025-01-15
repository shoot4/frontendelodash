export type RankTier = 
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Diamond'
  | 'Grandmaster'
  | 'Celestial'
  | 'Eternity'
  | 'One Above All'

export type RankDivision = 'III' | 'II' | 'I'

export interface Rank {
  tier: RankTier
  division: RankDivision // Always required, Eternity and One Above All will use 'I'
}

export const RANKS: Rank[] = [
  { tier: 'Bronze', division: 'III' },
  { tier: 'Bronze', division: 'II' },
  { tier: 'Bronze', division: 'I' },
  { tier: 'Silver', division: 'III' },
  { tier: 'Silver', division: 'II' },
  { tier: 'Silver', division: 'I' },
  { tier: 'Gold', division: 'III' },
  { tier: 'Gold', division: 'II' },
  { tier: 'Gold', division: 'I' },
  { tier: 'Platinum', division: 'III' },
  { tier: 'Platinum', division: 'II' },
  { tier: 'Platinum', division: 'I' },
  { tier: 'Diamond', division: 'III' },
  { tier: 'Diamond', division: 'II' },
  { tier: 'Diamond', division: 'I' },
  { tier: 'Grandmaster', division: 'III' },
  { tier: 'Grandmaster', division: 'II' },
  { tier: 'Grandmaster', division: 'I' },
  { tier: 'Celestial', division: 'III' },
  { tier: 'Celestial', division: 'II' },
  { tier: 'Celestial', division: 'I' },
  { tier: 'Eternity', division: 'I' },
  { tier: 'One Above All', division: 'I' }
]

export const getRankValue = (rank: Rank): number => {
  const tierValues: Record<RankTier, number> = {
    'Bronze': 0,
    'Silver': 3,
    'Gold': 6,
    'Platinum': 9,
    'Diamond': 12,
    'Grandmaster': 15,
    'Celestial': 18,
    'Eternity': 21,
    'One Above All': 24
  }

  const baseValue = tierValues[rank.tier]
  const divisionValue = 2 - ['III', 'II', 'I'].indexOf(rank.division)
  
  return baseValue + divisionValue
}

export const formatRank = (rank: Rank): string => {
  if (rank.tier === 'Eternity' || rank.tier === 'One Above All') {
    return rank.tier
  }
  return `${rank.tier} ${rank.division}`
}

export const getRankIndex = (rank: Rank): number => {
  return RANKS.findIndex(r => 
    r.tier === rank.tier && r.division === rank.division
  )
} 