export function ChatTypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-2">
      <div className="flex space-x-1">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" />
      </div>
      <span className="text-xs text-muted-foreground">Support is typing...</span>
    </div>
  )
} 