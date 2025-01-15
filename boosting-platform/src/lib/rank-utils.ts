import { Rank, getRankValue } from './ranks'

export const rankUtils = {
  /**
   * Compares two ranks and returns:
   * -1 if rank1 is lower than rank2
   * 0 if ranks are equal
   * 1 if rank1 is higher than rank2
   */
  compareRanks: (rank1: Rank, rank2: Rank): number => {
    const value1 = getRankValue(rank1)
    const value2 = getRankValue(rank2)
    
    if (value1 < value2) return -1
    if (value1 > value2) return 1
    return 0
  },

  /**
   * Calculates the number of rank steps between two ranks
   */
  getRankDistance: (fromRank: Rank, toRank: Rank): number => {
    return Math.abs(getRankValue(toRank) - getRankValue(fromRank))
  },

  /**
   * Validates if the rank progression is valid (from lower to higher rank)
   */
  isValidProgression: (fromRank: Rank, toRank: Rank): boolean => {
    return rankUtils.compareRanks(fromRank, toRank) === -1
  },

  /**
   * Estimates completion time based on rank distance
   * Returns estimated time in days
   */
  estimateCompletionTime: (fromRank: Rank, toRank: Rank): number => {
    const distance = rankUtils.getRankDistance(fromRank, toRank)
    // Base estimation: 1 day per 3 rank steps
    return Math.ceil(distance / 3)
  },

  /**
   * Calculates base price for rank boosting
   * Price increases exponentially with higher ranks
   */
  calculateBasePrice: (fromRank: Rank, toRank: Rank): number => {
    const distance = rankUtils.getRankDistance(fromRank, toRank)
    const fromValue = getRankValue(fromRank)
    
    // Base price: $10 per rank step, with 20% increase for higher ranks
    const basePrice = distance * 10
    const rankMultiplier = 1 + (fromValue * 0.2)
    
    return Math.round(basePrice * rankMultiplier)
  }
} 