import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
  Heart,
  ThumbsUp,
  Smile,
  Plus
} from "lucide-react"

interface Reaction {
  emoji: string
  count: number
  userReacted: boolean
}

interface ChatMessageReactionsProps {
  messageId: string
  onReact: (messageId: string, emoji: string) => void
}

export function ChatMessageReactions({ messageId, onReact }: ChatMessageReactionsProps) {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "👍", count: 0, userReacted: false },
    { emoji: "❤️", count: 0, userReacted: false },
    { emoji: "😊", count: 0, userReacted: false },
  ])

  const handleReaction = (emoji: string) => {
    setReactions(prev => prev.map(reaction => 
      reaction.emoji === emoji
        ? { 
            ...reaction, 
            count: reaction.userReacted ? reaction.count - 1 : reaction.count + 1,
            userReacted: !reaction.userReacted 
          }
        : reaction
    ))
    onReact(messageId, emoji)
  }

  return (
    <div className="flex items-center gap-1 mt-1">
      {reactions.map((reaction) => (
        <Button
          key={reaction.emoji}
          variant={reaction.userReacted ? "secondary" : "ghost"}
          size="sm"
          className="h-6 px-1.5 text-xs"
          onClick={() => handleReaction(reaction.emoji)}
        >
          <span className="mr-1">{reaction.emoji}</span>
          {reaction.count > 0 && reaction.count}
        </Button>
      ))}
    </div>
  )
} 