export interface BoostOptionInfo {
  label: string
  description: string
  tooltip: string
}

export const BOOST_OPTIONS: Record<string, BoostOptionInfo> = {
  duoQueue: {
    label: 'Duo Queue Boost',
    description: 'Play together with your booster',
    tooltip: 'Queue and play alongside your professional booster for a more interactive and educational experience'
  },
  winRate: {
    label: 'High Win Rate',
    description: 'Guaranteed higher win percentage',
    tooltip: 'Our boosters will maintain a minimum 70% win rate during the boost'
  },
  priorityQueue: {
    label: 'Priority Queue',
    description: 'Get assigned to our top boosters',
    tooltip: 'Your order gets priority assignment to our highest-rated Marvel Rivals boosters'
  },
  videoRecording: {
    label: 'Video Recording',
    description: 'Record gameplay sessions',
    tooltip: 'Receive full recordings of your boost games to study and learn from'
  },
  statisticsTracking: {
    label: 'Statistics Tracking',
    description: 'Detailed performance analytics',
    tooltip: 'Get comprehensive stats and analysis of your boost games'
  },
  playstylePreference: {
    label: 'Playstyle Preference',
    description: 'Choose your preferred playstyle',
    tooltip: 'Boosters will adapt their gameplay to match your preferred style'
  }
} 