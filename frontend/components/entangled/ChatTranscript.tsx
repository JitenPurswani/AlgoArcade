"use client"

export function ChatTranscript({ chat }: { chat: any[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
      <p className="text-sm font-semibold text-muted-foreground">
        Simulated Conversation
      </p>

      {chat.map((m, i) => (
        <div
          key={i}
          className={`text-sm ${
            m.from === "A"
              ? "text-left"
              : "text-right text-muted-foreground"
          }`}
        >
          {m.text}
        </div>
      ))}
    </div>
  )
}
