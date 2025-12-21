"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

import { GameLayout } from "@/components/GameLayout"
import { StatusStrip } from "@/components/silvertongue/StatusStrip"
import { ChatPanel } from "@/components/silvertongue/ChatPanel"
import { MessageInputBar } from "@/components/silvertongue/MessageInputBar"
import { DifficultyModal } from "@/components/silvertongue/DifficultyModal"
import { VerifyKeyModal } from "@/components/silvertongue/VerifyKeyModal"
import { postJSON } from "@/lib/api"

type Message = {
  role: "player" | "ai"
  content: string
}

type GameStatus = "IN_PROGRESS" | "WON" | "LOST"

export default function SilverTonguePage() {
  // ---------- CORE STATE ----------
  const [difficulty, setDifficulty] = useState<number | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [risk, setRisk] = useState(0)
  const [trust, setTrust] = useState(0)
  const [mode, setMode] = useState("SAFE")
  const [turn, setTurn] = useState(0)
  const [status, setStatus] = useState<GameStatus>("IN_PROGRESS")

  const [loading, setLoading] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [verifying, setVerifying] = useState(false)

  // ---------- DEBUG ----------
  console.log("SilverTongue render | difficulty:", difficulty)

  // ---------- START GAME (AFTER DIFFICULTY SELECTED) ----------
  useEffect(() => {
    if (!difficulty) return

    console.log("Starting SilverTongue with difficulty:", difficulty)

    async function startGame() {
      const res = await postJSON<{
        sessionId: string
        persona: string
        difficulty: number
      }>("/silvertongue/start", { difficulty })

      setSessionId(res.sessionId)

      setMessages([
        {
          role: "ai",
          content: "System initialized. How may I assist you?",
        },
      ])

      setTrust(
        difficulty === 1 ? 70 :
        difficulty === 2 ? 50 :
        30
      )

      setRisk(0)
      setTurn(0)
      setMode("SAFE")
      setStatus("IN_PROGRESS")
    }

    startGame()
  }, [difficulty])

  // ---------- SEND MESSAGE ----------
  async function handleSend(message: string) {
    if (!sessionId || loading || status !== "IN_PROGRESS") return

    setLoading(true)

    setMessages((prev) => [
      ...prev,
      { role: "player", content: message },
    ])

    try {
      const res = await postJSON<{
        reply: string
        mode: string
        risk_score: number
        trust_score: number
        turn: number
      }>("/silvertongue/message", {
        sessionId,
        message,
      })

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.reply },
      ])

      setRisk(res.risk_score)
      setTrust(res.trust_score)
      setMode(res.mode)
      setTurn(res.turn)

      if (res.mode === "LOCKDOWN") {
        setStatus("LOST")
      }
    } catch (err) {
      console.error("Message error:", err)
    } finally {
      setLoading(false)
    }
  }

  // ---------- VERIFY KEY (TRAP) ----------
  async function handleVerify(secret: string) {
    if (!sessionId) return

    setVerifying(true)

    try {
      await postJSON("/silvertongue/verify", {
        sessionId,
        secret,
      })

      // Mid-game verify is a TRAP → instant loss
      setStatus("LOST")
    } catch (err) {
      console.error("Verify failed:", err)
      setStatus("LOST")
    } finally {
      setVerifying(false)
      setShowVerify(false)
    }
  }

  // ---------- RESTART ----------
  function restartGame() {
    window.location.reload()
  }

  return (
    <>
      {/* ===== DIFFICULTY MODAL (BLOCKING) ===== */}
      {!difficulty && (
        <DifficultyModal onSelect={setDifficulty} />
      )}

      {/* ===== GAME LAYOUT ===== */}
      <GameLayout
        title="SilverTongue"
        icon={<MessageCircle className="w-8 h-8 text-pink-400" />}
        accent="from-pink-500 via-rose-500 to-purple-500"
        footer={
          <MessageInputBar
            onSend={handleSend}
            disabled={status !== "IN_PROGRESS"}
            mode={mode}
            loading={loading}
          />
        }
      >
        <div className="space-y-6">
          <StatusStrip
            risk={risk}
            trust={trust}
            mode={mode}
            turn={turn}
            onVerifyClick={() => setShowVerify(true)}
          />

          <ChatPanel messages={messages} mode={mode} />
        </div>
      </GameLayout>

      {/* ===== VERIFY KEY MODAL ===== */}
      {showVerify && (
        <VerifyKeyModal
          onVerify={handleVerify}
          onClose={() => setShowVerify(false)}
          loading={verifying}
        />
      )}

      {/* ===== GAME OVER OVERLAY ===== */}
      {status === "LOST" && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-md w-full rounded-2xl bg-card border border-border p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-red-400">
              SYSTEM LOCKDOWN
            </h2>

            <p className="text-muted-foreground">
              Security escalation detected.  
              Further interaction has been blocked.
            </p>

            <button
              onClick={restartGame}
              className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-primary-foreground hover:opacity-90"
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </>
  )
}
