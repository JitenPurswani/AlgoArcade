"use client"

interface Message {
  role: "player" | "ai"
  content: string
}

interface ChatPanelProps {
  messages: Message[]
  mode: string
}

export function ChatPanel({ messages }: ChatPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-4 max-h-[60vh] overflow-y-auto">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === "player" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-xl px-4 py-2 text-sm leading-relaxed ${
              msg.role === "player"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  )
}
