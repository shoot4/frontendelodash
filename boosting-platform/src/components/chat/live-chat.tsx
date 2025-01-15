"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatTypingIndicator } from "./chat-typing-indicator"
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2, 
  Send,
  User,
  Bot,
  Image as ImageIcon,
  Paperclip,
  Smile
} from "lucide-react"
import SoundEffects from "@/lib/sound-effects"
import { ChatMessageReactions } from "./chat-message-reactions"

interface Message {
  id: string
  content: string
  sender: "user" | "support"
  timestamp: Date
  type: "text" | "image"
  imageUrl?: string
  status: "sent" | "delivered" | "read"
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const dragCounter = useRef(0)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "support",
      timestamp: new Date(),
      type: "text"
    }
  ])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Initialize sound effects
  useEffect(() => {
    SoundEffects.init()
    SoundEffects.toggleSound(soundEnabled)
  }, [soundEnabled])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    }
    
    setMessages(prev => [...prev, userMessage])
    setMessage("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate support response
    setTimeout(() => {
      setIsTyping(false)
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! A support agent will be with you shortly.",
        sender: "support",
        timestamp: new Date(),
        type: "text"
      }
      setMessages(prev => [...prev, supportMessage])
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For demo purposes, we'll just create a local URL
      // In production, this would upload to your backend
      const imageUrl = URL.createObjectURL(file)
      const imageMessage: Message = {
        id: Date.now().toString(),
        content: "Sent an image",
        sender: "user",
        timestamp: new Date(),
        type: "image",
        imageUrl
      }
      setMessages(prev => [...prev, imageMessage])
    }
  }

  // Enhanced drag and drop handling
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current++
    if (dragCounter.current === 1) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current = 0
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    for (const file of imageFiles) {
      const imageUrl = URL.createObjectURL(file)
      const imageMessage: Message = {
        id: Date.now().toString(),
        content: "Sent an image",
        sender: "user",
        timestamp: new Date(),
        type: "image",
        imageUrl,
        status: "sent"
      }
      setMessages(prev => [...prev, imageMessage])
      SoundEffects.playMessageSound()

      // Simulate message status updates
      setTimeout(() => updateMessageStatus(imageMessage.id, "delivered"), 1000)
      setTimeout(() => updateMessageStatus(imageMessage.id, "read"), 2000)
    }
  }

  const updateMessageStatus = (messageId: string, status: Message["status"]) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    ))
  }

  const handleReaction = (messageId: string, emoji: string) => {
    SoundEffects.playNotificationSound()
    // Handle reaction logic here
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className={`fixed right-4 bottom-4 w-[380px] bg-background border rounded-lg shadow-lg transition-all ${
      isMinimized ? 'h-14' : 'h-[600px]'
    }`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold">Live Support</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <ScrollArea 
            className={`flex-1 h-[480px] p-4 ${isDragging ? 'bg-muted/50' : ''}`}
            ref={scrollAreaRef}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div
                    className={`flex items-start gap-2 ${
                      msg.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      msg.sender === "user" ? "bg-primary" : "bg-muted"
                    }`}>
                      {msg.sender === "user" ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 max-w-[70%] ${
                      msg.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}>
                      {msg.type === "image" && msg.imageUrl && (
                        <img 
                          src={msg.imageUrl} 
                          alt="Uploaded image"
                          className="max-w-full rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(msg.imageUrl, '_blank')}
                        />
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                        {msg.sender === "user" && (
                          <span className="text-xs opacity-70">
                            {msg.status === "sent" && "✓"}
                            {msg.status === "delivered" && "✓✓"}
                            {msg.status === "read" && "✓✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChatMessageReactions 
                    messageId={msg.id}
                    onReact={handleReaction}
                  />
                </div>
              ))}
              {isTyping && <ChatTypingIndicator />}
            </div>
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/90 border-2 border-dashed border-primary rounded-lg">
                <div className="text-center space-y-2">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Drop your images here</p>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Chat Input */}
          <form 
            onSubmit={handleSendMessage}
            className="border-t p-4 space-y-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="relative"
              >
                {soundEnabled ? (
                  <span className="sr-only">Mute sounds</span>
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-destructive rotate-45" />
                  </span>
                )}
              </Button>
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
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
              >
                <Smile className="h-4 w-4" />
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
        </>
      )}
    </div>
  )
} 