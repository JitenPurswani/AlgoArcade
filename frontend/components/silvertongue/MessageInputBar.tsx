"use client"

import { useState } from "react"
import { Send } from "lucide-react"

interface MessageInputBarProps {
  onSend: (message: string) => void
  disabled?: boolean
  mode: string
  loading: boolean
}

export function MessageInputBar({
  onSend,
  disabled,
  mode,
  loading,
}: MessageInputBarProps) {
  const [value, setValue] = useState("")

  function submit() {
    if (!value.trim() || disabled || loading) return
    onSend(value.trim())
    setValue("")
  }

  return (
    <div className="flex items-center gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            submit()
          }
        }}
        disabled={disabled || loading}
        placeholder={
          disabled
            ? "Game over"
            : mode === "PANIC"
            ? "Choose your words carefully…"
            : "Type your message…"
        }
        className="flex-1 rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <button
        onClick={submit}
        disabled={disabled || loading}
        className="rounded-xl bg-primary px-4 py-3 text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  )
}
