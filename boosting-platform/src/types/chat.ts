export interface Message {
  id: string
  content: string
  senderId: string
  senderType: 'client' | 'booster' | 'system'
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
  attachments?: {
    type: 'image' | 'file'
    url: string
    name: string
  }[]
}

export interface ChatRoom {
  id: string
  orderId: string
  participants: {
    id: string
    name: string
    type: 'client' | 'booster'
    avatar?: string
  }[]
  lastMessage?: Message
  unreadCount: number
  status: 'active' | 'archived'
  createdAt: Date
} 