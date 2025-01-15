"use client"

import { useState, useRef } from "react"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Send,
  Image as ImageIcon,
  Clock,
  Calendar,
  User,
  Shield
} from "lucide-react"
import { ScheduleProposalDialog } from "./schedule-proposal-dialog"
import { OrderInfoPanel } from "./order-info-panel"

interface OrderChatPanelProps {
  orderId: string
  customerTimezone: string
  boosterTimezone: string
  orderStatus: string
  customerName: string
  boosterName: string
}

interface ChatMessage {
  id: string
  content: string
  sender: "customer" | "booster" | "support"
  timestamp: Date
  type: "text" | "image" | "schedule"
  imageUrl?: string
  scheduleProposal?: {
    date: Date
    duration: string
  }
}

export function OrderChatPanel({
  orderId,
  customerTimezone,
  boosterTimezone,
  orderStatus,
  customerName,
  boosterName
}: OrderChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("chat")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "customer", // This would be dynamic based on user role
      timestamp: new Date(),
      type: "text"
    }

    setMessages(prev => [...prev, newMessage])
    setMessage("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file)
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "Shared an image",
        sender: "customer", // This would be dynamic based on user role
        timestamp: new Date(),
        type: "image",
        imageUrl
      }
      setMessages(prev => [...prev, newMessage])
    }
  }

  const proposeSchedule = (date: Date, duration: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Proposed session: ${format(date, "PPP 'at' p")} for ${duration}`,
      sender: "customer", // This would be dynamic based on user role
      timestamp: new Date(),
      type: "schedule",
      scheduleProposal: {
        date,
        duration
      }
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleCalendarClick = () => {
    setIsScheduleDialogOpen(true)
  }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="info">Order Info</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            {/* Time Zone Display */}
            <div className="flex justify-between px-4 py-2 bg-muted/50 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Your time: {new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Booster time: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${
                      msg.sender === "customer" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      msg.sender === "customer" ? "bg-primary" : 
                      msg.sender === "support" ? "bg-destructive" : "bg-muted"
                    }`}>
                      {msg.sender === "customer" ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : msg.sender === "support" ? (
                        <Shield className="h-4 w-4 text-destructive-foreground" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 max-w-[70%] ${
                      msg.sender === "customer" 
                        ? "bg-primary text-primary-foreground" 
                        : msg.sender === "support"
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted"
                    }`}>
                      {msg.type === "image" && msg.imageUrl && (
                        <img 
                          src={msg.imageUrl} 
                          alt="Shared image"
                          className="max-w-full rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(msg.imageUrl, '_blank')}
                        />
                      )}
                      {msg.type === "schedule" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">Schedule Proposal</span>
                        </div>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleCalendarClick}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="info">
            <OrderInfoPanel
              orderId={orderId}
              orderStatus={orderStatus}
              orderType="Duo Boost"
              customerName={customerName}
              boosterName={boosterName}
              startRank="Silver"
              targetRank="Gold"
              progress={45}
              estimatedTime="3-4 days"
              startDate={new Date()}
              lastActive={new Date()}
              specialRequirements={[
                "Preferred play time: Evenings",
                "Specific heroes requested",
                "Stream gameplay"
              ]}
            />
          </TabsContent>
        </Tabs>
      </Card>

      <ScheduleProposalDialog
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
        onPropose={proposeSchedule}
        customerTimezone={customerTimezone}
        boosterTimezone={boosterTimezone}
      />
    </>
  )
} 