"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ScheduleProposalDialogProps {
  isOpen: boolean
  onClose: () => void
  onPropose: (date: Date, duration: string) => void
  customerTimezone: string
  boosterTimezone: string
}

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

const durations = [
  "1 hour",
  "2 hours",
  "3 hours",
  "4 hours",
  "5 hours",
]

export function ScheduleProposalDialog({
  isOpen,
  onClose,
  onPropose,
  customerTimezone,
  boosterTimezone
}: ScheduleProposalDialogProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [duration, setDuration] = useState<string>()

  const handlePropose = () => {
    if (date && time && duration) {
      const [hours, minutes] = time.split(':').map(Number)
      const proposedDate = new Date(date)
      proposedDate.setHours(hours, minutes)
      onPropose(proposedDate, duration)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Propose Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time</label>
              <Select onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Zones</label>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>Your time: {customerTimezone}</div>
              <div>Booster time: {boosterTimezone}</div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePropose}
            disabled={!date || !time || !duration}
          >
            Propose Time
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 