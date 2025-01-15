export type CharacterRole = 'Vanguard' | 'Duelist' | 'Strategist'

export interface Character {
  name: string
  role: CharacterRole
  image?: string // We can add character images later
}

export interface RoleDescription {
  title: CharacterRole
  description: string
  quote: string
}

export const ROLE_DESCRIPTIONS: RoleDescription[] = [
  {
    title: 'Vanguard',
    description: 'Frontline tanks who excel at initiating fights and protecting allies',
    quote: 'We stand as the shield that protects our team.'
  },
  {
    title: 'Duelist',
    description: 'Damage dealers who specialize in eliminating high-priority targets',
    quote: 'Victory requires precision and power in equal measure.'
  },
  {
    title: 'Strategist',
    description: 'Support characters who empower allies and control the battlefield',
    quote: 'The true strength of a team lies in working together.'
  }
]

export const CHARACTERS: Character[] = [
  // Vanguard (Tank)
  { name: 'Hulk', role: 'Vanguard' },
  { name: 'Captain America', role: 'Vanguard' },
  { name: 'Doctor Strange', role: 'Vanguard' },
  { name: 'Groot', role: 'Vanguard' },
  { name: 'Magneto', role: 'Vanguard' },
  { name: 'Peni Parker', role: 'Vanguard' },
  { name: 'Thor', role: 'Vanguard' },
  { name: 'Venom', role: 'Vanguard' },

  // Duelist (Damage)
  { name: 'Black Panther', role: 'Duelist' },
  { name: 'Black Widow', role: 'Duelist' },
  { name: 'Hawkeye', role: 'Duelist' },
  { name: 'Hela', role: 'Duelist' },
  { name: 'Iron Fist', role: 'Duelist' },
  { name: 'Iron Man', role: 'Duelist' },
  { name: 'Magik', role: 'Duelist' },
  { name: 'Mister Fantastic', role: 'Duelist' },
  { name: 'Moon Knight', role: 'Duelist' },
  { name: 'Namor', role: 'Duelist' },
  { name: 'Psylocke', role: 'Duelist' },
  { name: 'Punisher', role: 'Duelist' },
  { name: 'Scarlet Witch', role: 'Duelist' },
  { name: 'Spider-Man', role: 'Duelist' },
  { name: 'Squirrel Girl', role: 'Duelist' },
  { name: 'Star-Lord', role: 'Duelist' },
  { name: 'Storm', role: 'Duelist' },
  { name: 'Winter Soldier', role: 'Duelist' },
  { name: 'Wolverine', role: 'Duelist' },

  // Strategist (Support)
  { name: 'Adam Warlock', role: 'Strategist' },
  { name: 'Cloak and Dagger', role: 'Strategist' },
  { name: 'Invisible Woman', role: 'Strategist' },
  { name: 'Jeff the Land Shark', role: 'Strategist' },
  { name: 'Loki', role: 'Strategist' },
  { name: 'Luna Snow', role: 'Strategist' },
  { name: 'Mantis', role: 'Strategist' },
  { name: 'Rocket Raccoon', role: 'Strategist' }
]

export const getCharactersByRole = (role: CharacterRole): Character[] => {
  return CHARACTERS.filter(char => char.role === role)
} 