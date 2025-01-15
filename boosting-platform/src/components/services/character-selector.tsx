"use client"

import { FC, useState, useEffect, KeyboardEvent } from 'react'
import { Character, CharacterRole, CHARACTERS, getCharactersByRole } from '@/lib/characters'
import { Search, Filter } from 'lucide-react'
import { fuzzySearch } from '@/lib/search-utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CharacterSelectorProps {
  selectedCharacters: Character[]
  onChange: (characters: Character[]) => void
  maxSelections?: number
}

const CharacterSelector: FC<CharacterSelectorProps> = ({
  selectedCharacters,
  onChange,
  maxSelections = 3
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<CharacterRole>('Vanguard')
  const [selectedRoles, setSelectedRoles] = useState<CharacterRole[]>(['Vanguard', 'Duelist', 'Strategist'])
  const [focusedCharacterIndex, setFocusedCharacterIndex] = useState(-1)

  // Reset focus when dialog opens
  useEffect(() => {
    if (isOpen) {
      setFocusedCharacterIndex(-1)
      const searchInput = document.getElementById('character-search')
      if (searchInput) searchInput.focus()
    }
  }, [isOpen])

  const handleSelect = (character: Character) => {
    if (selectedCharacters.find(c => c.name === character.name)) {
      onChange(selectedCharacters.filter(c => c.name !== character.name))
    } else if (selectedCharacters.length < maxSelections) {
      onChange([...selectedCharacters, character])
    }
  }

  const isSelected = (character: Character) => 
    selectedCharacters.some(c => c.name === character.name)

  const roleColors: Record<CharacterRole, string> = {
    Vanguard: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
    Duelist: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    Strategist: 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
  }

  const filterCharacters = (characters: Character[]) => {
    return characters.filter(char => 
      selectedRoles.includes(char.role) &&
      (!searchQuery || fuzzySearch(searchQuery, char.name))
    )
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, characters: Character[]) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedCharacterIndex(prev => 
          prev < characters.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedCharacterIndex(prev => prev > 0 ? prev - 1 : prev)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedCharacterIndex >= 0) {
          handleSelect(characters[focusedCharacterIndex])
        }
        break
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedCharacters.map(character => (
          <Badge
            key={character.name}
            variant="secondary"
            className={roleColors[character.role]}
          >
            {character.name}
          </Badge>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
          >
            Select Characters ({selectedCharacters.length}/{maxSelections})
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Preferred Characters</DialogTitle>
            <DialogDescription>
              Choose up to {maxSelections} characters you prefer the booster to play
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                id="character-search"
                placeholder="Search characters..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(['Vanguard', 'Duelist', 'Strategist'] as CharacterRole[]).map(role => (
                  <DropdownMenuCheckboxItem
                    key={role}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={(checked: boolean) => {
                      setSelectedRoles(prev => 
                        checked 
                          ? [...prev, role]
                          : prev.filter(r => r !== role)
                      )
                    }}
                  >
                    {role}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Tabs 
            defaultValue="Vanguard" 
            value={activeTab}
            onValueChange={(value: string) => setActiveTab(value as CharacterRole)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Vanguard">Vanguard</TabsTrigger>
              <TabsTrigger value="Duelist">Duelist</TabsTrigger>
              <TabsTrigger value="Strategist">Strategist</TabsTrigger>
            </TabsList>
            {(['Vanguard', 'Duelist', 'Strategist'] as CharacterRole[]).map(role => {
              const filteredCharacters = filterCharacters(getCharactersByRole(role))
              return (
                <TabsContent 
                  key={role} 
                  value={role}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, filteredCharacters)}
                >
                  {filteredCharacters.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                      No characters found
                    </div>
                  ) : (
                    <ScrollArea className="h-[300px] rounded-md border p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {filteredCharacters.map((character, index) => (
                          <Button
                            key={character.name}
                            variant={isSelected(character) ? "secondary" : "outline"}
                            className={`justify-start ${
                              isSelected(character) ? roleColors[role] : ''
                            } ${
                              index === focusedCharacterIndex ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => handleSelect(character)}
                            disabled={!isSelected(character) && selectedCharacters.length >= maxSelections}
                          >
                            <span className="ml-2">{character.name}</span>
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
              )
            })}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CharacterSelector 