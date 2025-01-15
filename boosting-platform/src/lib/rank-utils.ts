import { Rank, getRankValue, RANKS } from './ranks'

export const rankUtils = {
  /**
   * Gets the distance between two ranks
   */
  getRankDistance: (fromRank: Rank, toRank: Rank): number => {
    const fromIndex = RANKS.findIndex(r => 
      r.tier === fromRank.tier && r.division === fromRank.division
    )
    const toIndex = RANKS.findIndex(r => 
      r.tier === toRank.tier && r.division === toRank.division
    )
    
    if (fromIndex === -1 || toIndex === -1) {
      throw new Error('Invalid rank')
    }

    return Math.max(0, toIndex - fromIndex)
  },

  /**
   * Validates if the rank progression is valid (can't go backwards)
   */
  isValidProgression: (fromRank: Rank, toRank: Rank): boolean => {
    const fromValue = getRankValue(fromRank)
    const toValue = getRankValue(toRank)
    return toValue > fromValue
  },

  /**
   * Gets the next rank in progression
   */
  getNextRank: (currentRank: Rank): Rank | null => {
    const currentIndex = RANKS.findIndex(r => 
      r.tier === currentRank.tier && r.division === currentRank.division
    )
    
    if (currentIndex === -1 || currentIndex === RANKS.length - 1) {
      return null
    }

    return RANKS[currentIndex + 1]
  },

  /**
   * Gets available divisions for a specific rank tier
   */
  getAvailableDivisions: (tier: string): string[] => {
    if (tier === 'Eternity' || tier === 'One Above All') {
      return ['I']
    }
    return ['III', 'II', 'I']
  },

  /**
   * Formats rank for display
   * Uses the formatRank function from ranks.ts
   */
  formatRankDisplay: (rank: Rank): string => {
    if (rank.tier === 'Eternity' || rank.tier === 'One Above All') {
      return rank.tier
    }
    return `${rank.tier} ${rank.division}`
  },

  /**
   * Gets rank color class for styling
   */
  getRankColorClass: (rank: Rank): string => {
    const colors: Record<string, string> = {
      'Bronze': 'text-amber-600',
      'Silver': 'text-slate-400',
      'Gold': 'text-yellow-400',
      'Platinum': 'text-cyan-400',
      'Diamond': 'text-blue-400',
      'Grandmaster': 'text-purple-400',
      'Celestial': 'text-red-400',
      'Eternity': 'text-orange-400',
      'One Above All': 'text-white'
    }
    return colors[rank.tier] || 'text-white'
  }
} 