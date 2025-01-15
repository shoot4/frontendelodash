"use client"

import { FC, useState } from 'react'
import { Rank } from '@/lib/ranks'
import { priceCalculator, BoostingOptions } from '@/lib/price-calculator'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CharacterSelector from './character-selector'

interface PriceCalculatorProps {
  fromRank: Rank
  toRank: Rank
  onPurchase: (options: BoostingOptions) => void
}

const PriceCalculator: FC<PriceCalculatorProps> = ({
  fromRank,
  toRank,
  onPurchase
}) => {
  const [options, setOptions] = useState<BoostingOptions>({
    // Basic Options
    urgentService: false,
    withCoaching: false,
    offlineMode: false,
    streamingRights: false,
    
    // Game-Specific Options
    preferredCharacters: [],
    specificPlaytime: false,
    duoQueue: false,
    winRate: 'normal',
    priorityQueue: false,
    
    // Extra Services
    videoRecording: false,
    statisticsTracking: false,
    playstylePreference: null,
    extraPracticeGames: 0
  })

  const priceBreakdown = priceCalculator.getPriceBreakdown(fromRank, toRank, options)

  const updateOption = (key: keyof BoostingOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Options</CardTitle>
        <CardDescription>
          Customize your Marvel Rivals boosting service
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {/* Basic Options */}
          <AccordionItem value="basic">
            <AccordionTrigger>Basic Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Urgent Service</label>
                    <p className="text-xs text-muted-foreground">
                      Priority queue and faster completion
                    </p>
                  </div>
                  <Switch
                    checked={options.urgentService}
                    onCheckedChange={(checked) => updateOption('urgentService', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">With Coaching</label>
                    <p className="text-xs text-muted-foreground">
                      Learn from our professional players
                    </p>
                  </div>
                  <Switch
                    checked={options.withCoaching}
                    onCheckedChange={(checked) => updateOption('withCoaching', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Offline Mode</label>
                    <p className="text-xs text-muted-foreground">
                      Appear offline during boosting
                    </p>
                  </div>
                  <Switch
                    checked={options.offlineMode}
                    onCheckedChange={(checked) => updateOption('offlineMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Streaming Rights</label>
                    <p className="text-xs text-muted-foreground">
                      Allow streaming during boosting
                    </p>
                  </div>
                  <Switch
                    checked={options.streamingRights}
                    onCheckedChange={(checked) => updateOption('streamingRights', checked)}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Game-Specific Options */}
          <AccordionItem value="game-specific">
            <AccordionTrigger>Game-Specific Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Duo Queue</label>
                    <p className="text-xs text-muted-foreground">
                      Boost with two professional players
                    </p>
                  </div>
                  <Switch
                    checked={options.duoQueue}
                    onCheckedChange={(checked) => updateOption('duoQueue', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">High Win Rate</label>
                    <p className="text-xs text-muted-foreground">
                      Guaranteed higher win rate
                    </p>
                  </div>
                  <Switch
                    checked={options.winRate === 'high'}
                    onCheckedChange={(checked) => 
                      updateOption('winRate', checked ? 'high' : 'normal')
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Priority Queue</label>
                    <p className="text-xs text-muted-foreground">
                      Start boosting immediately
                    </p>
                  </div>
                  <Switch
                    checked={options.priorityQueue}
                    onCheckedChange={(checked) => updateOption('priorityQueue', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Specific Playtime</label>
                    <p className="text-xs text-muted-foreground">
                      Choose your preferred playing hours
                    </p>
                  </div>
                  <Switch
                    checked={options.specificPlaytime}
                    onCheckedChange={(checked) => updateOption('specificPlaytime', checked)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Characters</label>
                  <p className="text-xs text-muted-foreground">
                    Select up to 3 characters you want the booster to play
                  </p>
                  <CharacterSelector
                    selectedCharacters={options.preferredCharacters}
                    onChange={(characters) => updateOption('preferredCharacters', characters)}
                    maxSelections={3}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Extra Services */}
          <AccordionItem value="extra">
            <AccordionTrigger>Extra Services</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Video Recording</label>
                    <p className="text-xs text-muted-foreground">
                      Record gameplay sessions
                    </p>
                  </div>
                  <Switch
                    checked={options.videoRecording}
                    onCheckedChange={(checked) => updateOption('videoRecording', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Statistics Tracking</label>
                    <p className="text-xs text-muted-foreground">
                      Detailed performance statistics
                    </p>
                  </div>
                  <Switch
                    checked={options.statisticsTracking}
                    onCheckedChange={(checked) => updateOption('statisticsTracking', checked)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Playstyle Preference</label>
                  <Select
                    value={options.playstylePreference || ''}
                    onValueChange={(value: any) => 
                      updateOption('playstylePreference', value || null)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select playstyle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No preference</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="defensive">Defensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Extra Practice Games: {options.extraPracticeGames}
                  </label>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[options.extraPracticeGames]}
                    onValueChange={([value]) => updateOption('extraPracticeGames', value)}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <h4 className="font-medium">Price Breakdown</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>${priceBreakdown.basePrice}</span>
            </div>
            {priceBreakdown.additionalCosts.map(({ label, amount }) => (
              <div key={label} className="flex justify-between text-muted-foreground">
                <span>{label}</span>
                <span>+${Math.round(amount)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-2 font-medium">
              <span>Total Price</span>
              <span>${priceBreakdown.totalPrice}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => onPurchase(options)}
        >
          Purchase Boost
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PriceCalculator 