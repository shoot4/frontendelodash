"use client"

import { FC, useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Image as ImageIcon } from 'lucide-react'
import { Message, ChatRoom } from '@/types/chat'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface ChatWindowProps {
  chatRoom: ChatRoom
  messages: Message[]
  currentUserId: string
  onSendMessage: (content: string, attachments?: File[]) => Promise<void>
}

const ChatWindow: FC<ChatWindowProps> = ({
  chatRoom,
  messages,
  currentUserId,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (newMessage.trim() || attachments.length > 0) {
      await onSendMessage(newMessage, attachments)
      setNewMessage('')
      setAttachments([])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  return (
    <div className="flex h-full flex-col rounded-lg border bg-background">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <Avatar>
          <AvatarImage src={chatRoom.participants[1].avatar} />
          <AvatarFallback>
            {chatRoom.participants[1].name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{chatRoom.participants[1].name}</h3>
          <p className="text-sm text-muted-foreground">
            Order #{chatRoom.orderId}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUserId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === currentUserId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                {message.attachments?.map((attachment) => (
                  <div key={attachment.url} className="mt-2">
                    {attachment.type === 'image' ? (
                      <img
                        src={attachment.url}
                        alt={attachment.name}
                        className="max-h-48 rounded-md object-cover"
                      />
                    ) : (
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md bg-background/10 p-2 text-sm"
                      >
                        <Paperclip className="h-4 w-4" />
                        {attachment.name}
                      </a>
                    )}
                  </div>
                ))}
                <span className="mt-1 block text-right text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4">
        {attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-muted p-2 text-sm"
              >
                <span className="truncate max-w-[150px]">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileSelect}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="mr-2 h-4 w-4" />
                Attach File
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.accept = 'image/*'
                  fileInputRef.current.click()
                }
              }}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Send Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow 