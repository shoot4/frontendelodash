import { Rank, RankTier } from "@/types/calculator"
import { Character } from './characters'

const RANK_VALUES: Record<RankTier, number> = {
  "Bronze": 0,
  "Silver": 3,
  "Gold": 6,
  "Platinum": 9,
  "Diamond": 12,
  "Grandmaster": 15,
  "Celestial": 18,
  "Eternity": 21,
  "One Above All": 24
}

const DIVISION_VALUES = {
  "III": 0,
  "II": 1,
  "I": 2
}

export const calculateBasePrice = (currentRank: Rank, desiredRank: Rank): number => {
  // Validate ranks
  if ((currentRank.tier === "Eternity" || currentRank.tier === "One Above All") && 
      currentRank.division !== "I") {
    throw new Error(`${currentRank.tier} can only have division I`)
  }
  if ((desiredRank.tier === "Eternity" || desiredRank.tier === "One Above All") && 
      desiredRank.division !== "I") {
    throw new Error(`${desiredRank.tier} can only have division I`)
  }

  const currentValue = RANK_VALUES[currentRank.tier] + DIVISION_VALUES[currentRank.division]
  const desiredValue = RANK_VALUES[desiredRank.tier] + DIVISION_VALUES[desiredRank.division]
  const rankDifference = desiredValue - currentValue

  // Base price calculation
  const basePrice = rankDifference * 10 // $10 per rank step
  return Math.max(basePrice, 0)
}

export interface BoostingOptions {
  // Basic Options
  urgentService: boolean
  withCoaching: boolean
  offlineMode: boolean
  streamingRights: boolean
  
  // Game-Specific Options
  preferredCharacters: Character[] // Selected Marvel characters
  specificPlaytime: boolean // Play during specific hours
  duoQueue: boolean // Play with a second booster
  winRate: 'normal' | 'high' // Guaranteed win rate option
  priorityQueue: boolean // Priority in queue assignment
  
  // Extra Services
  videoRecording: boolean // Record gameplay sessions
  statisticsTracking: boolean // Detailed performance stats
  playstylePreference: 'aggressive' | 'balanced' | 'defensive' | null
  extraPracticeGames: number // Additional practice games
}

export const priceCalculator = {
  calculatePrice: (fromRank: Rank, toRank: Rank, options: Partial<BoostingOptions> = {}): number => {
    const basePrice = calculateBasePrice(fromRank, toRank)
    let finalPrice = basePrice

    // Basic Options Multipliers
    if (options.urgentService) finalPrice *= 1.5
    if (options.withCoaching) finalPrice *= 1.3
    if (options.offlineMode) finalPrice *= 1.2
    if (options.streamingRights) finalPrice *= 1.25

    // Game-Specific Options Multipliers
    if (options.preferredCharacters?.length) {
      finalPrice *= (1 + (options.preferredCharacters.length * 0.1)) // +10% per character
    }
    if (options.specificPlaytime) finalPrice *= 1.15
    if (options.duoQueue) {
      finalPrice *= 1.5 // 50% premium for duo queue with booster
    }
    if (options.winRate === 'high') finalPrice *= 1.4
    if (options.priorityQueue) finalPrice *= 1.25

    // Extra Services Multipliers
    if (options.videoRecording) finalPrice *= 1.1
    if (options.statisticsTracking) finalPrice *= 1.15
    if (options.playstylePreference) finalPrice *= 1.2
    if (options.extraPracticeGames) {
      finalPrice += (options.extraPracticeGames * 15) // $15 per extra game
    }

    return Math.round(finalPrice)
  },

  getPriceBreakdown: (fromRank: Rank, toRank: Rank, options: Partial<BoostingOptions> = {}): {
    basePrice: number
    additionalCosts: { label: string; amount: number }[]
    totalPrice: number
  } => {
    const basePrice = calculateBasePrice(fromRank, toRank)
    const additionalCosts: { label: string; amount: number }[] = []
    let totalPrice = basePrice

    // Basic Options
    if (options.urgentService) {
      const fee = basePrice * 0.5
      additionalCosts.push({ label: 'Urgent Service', amount: fee })
      totalPrice += fee
    }
    if (options.withCoaching) {
      const fee = basePrice * 0.3
      additionalCosts.push({ label: 'Coaching Service', amount: fee })
      totalPrice += fee
    }
    if (options.offlineMode) {
      const fee = basePrice * 0.2
      additionalCosts.push({ label: 'Offline Mode', amount: fee })
      totalPrice += fee
    }
    if (options.streamingRights) {
      const fee = basePrice * 0.25
      additionalCosts.push({ label: 'Streaming Rights', amount: fee })
      totalPrice += fee
    }

    // Game-Specific Options
    if (options.preferredCharacters?.length) {
      const fee = basePrice * (options.preferredCharacters.length * 0.1)
      additionalCosts.push({ 
        label: `Character Preference (${options.preferredCharacters.length})`, 
        amount: fee 
      })
      totalPrice += fee
    }
    if (options.specificPlaytime) {
      const fee = basePrice * 0.15
      additionalCosts.push({ label: 'Specific Playtime', amount: fee })
      totalPrice += fee
    }
    if (options.duoQueue) {
      const fee = basePrice * 0.8
      additionalCosts.push({ label: 'Duo Queue Boost', amount: fee })
      totalPrice += fee
    }
    if (options.winRate === 'high') {
      const fee = basePrice * 0.4
      additionalCosts.push({ label: 'High Win Rate Guarantee', amount: fee })
      totalPrice += fee
    }
    if (options.priorityQueue) {
      const fee = basePrice * 0.25
      additionalCosts.push({ label: 'Priority Queue', amount: fee })
      totalPrice += fee
    }

    // Extra Services
    if (options.videoRecording) {
      const fee = basePrice * 0.1
      additionalCosts.push({ label: 'Video Recording', amount: fee })
      totalPrice += fee
    }
    if (options.statisticsTracking) {
      const fee = basePrice * 0.15
      additionalCosts.push({ label: 'Statistics Tracking', amount: fee })
      totalPrice += fee
    }
    if (options.playstylePreference) {
      const fee = basePrice * 0.2
      additionalCosts.push({ label: 'Playstyle Preference', amount: fee })
      totalPrice += fee
    }
    if (options.extraPracticeGames) {
      const fee = options.extraPracticeGames * 15
      additionalCosts.push({ 
        label: `Extra Practice Games (${options.extraPracticeGames})`, 
        amount: fee 
      })
      totalPrice += fee
    }

    return {
      basePrice,
      additionalCosts,
      totalPrice: Math.round(totalPrice)
    }
  }
} 