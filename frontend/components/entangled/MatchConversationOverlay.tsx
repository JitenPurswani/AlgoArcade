"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MatchConversationOverlayProps {
  chat: any[]
  mode: "RISHTA" | "VIBE" | "TOXIC"
  onFinish: () => void
}

const MODE_STYLES = {
  RISHTA: "from-rose-500/20 to-pink-500/10",
  VIBE: "from-purple-500/30 to-fuchsia-500/10",
  TOXIC: "from-red-500/30 to-orange-500/10",
}

export function MatchConversationOverlay({
  chat,
  mode,
  onFinish,
}: MatchConversationOverlayProps) {
  const DURATION = 30
  const [timeLeft, setTimeLeft] = useState(DURATION)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    const endTimer = setTimeout(() => {
      onFinish()
    }, DURATION * 1000)

    return () => {
      clearInterval(timer)
      clearTimeout(endTimer)
    }
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-lg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-3xl rounded-3xl border border-border bg-gradient-to-br ${MODE_STYLES[mode]} p-6`}
      >
        {/* HEADER */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Chat Simulation — {mode} Mode
          </h2>
          <span className="text-sm text-muted-foreground">
            {timeLeft}s remaining
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-2 mb-6 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
            style={{
              width: `${((DURATION - timeLeft) / DURATION) * 100}%`,
            }}
          />
        </div>

        {/* CHAT */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`text-sm ${
                msg.from === "A"
                  ? "text-left text-foreground"
                  : "text-right text-muted-foreground"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <p className="mt-6 text-xs text-muted-foreground text-center">
          System is evaluating interaction signals…
        </p>
      </motion.div>
    </div>
  )
}
