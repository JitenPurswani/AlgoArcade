"use client"

import { useEffect, useState } from "react"
import { Shuffle, Loader2 } from "lucide-react"

import { GameLayout } from "@/components/GameLayout"
import { postJSON, getJSON } from "@/lib/api"

import { EntangledStatusStrip } from "@/components/entangled/EntangledStatusStrip"
import { CandidateCard } from "@/components/entangled/CandidateCard"
import { CandidateACard } from "@/components/entangled/CandidateACard"
import { OutcomePanel } from "@/components/entangled/OutcomePanel"
import { MatchConversationOverlay } from "@/components/entangled/MatchConversationOverlay"
import { GameEndOverlay } from "@/components/thehook/GameEndOverlay"
import { ModeModal } from "@/components/entangled/ModeModal"

export default function EntangledPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showMatchOverlay, setShowMatchOverlay] = useState(false)

  // 1. START GAME: Matches start_game_api_step.py
  async function startGame(mode: "RISHTA" | "VIBE" | "TOXIC") {
    setLoading(true)
    try {
      const res = await postJSON<any>("/entangled/start", { mode })
      if (res?.sessionId) {
        setSessionId(res.sessionId)
      }
    } catch (err) {
      console.error("Start API failed:", err)
    } finally {
      setLoading(false)
    }
  }

  // 2. FETCH STATE: Matches get_state_api_step.py
  async function refreshState(id = sessionId) {
    if (!id) return
    try {
      // Passes sessionId as a query parameter
      const data = await getJSON<any>(`/entangled/state?sessionId=${id}`)
      setState(data)
    } catch (err) {
      console.error("State API failed:", err)
    }
  }

  useEffect(() => {
    if (sessionId) refreshState()
  }, [sessionId])

  // 3. DECISION: Matches decide_match_api_step.py
  async function decide(decision: string, candidateId: string) {
    if (!sessionId || loading || state?.gameStatus !== "IN_PROGRESS") return

    setLoading(true)

    try {
      // Body matches: sessionId, decision, and candidateId
      await postJSON("/entangled/decide", {
        sessionId,
        decision: decision.toUpperCase(), 
        candidateId,
      })

      if (decision === "MATCH") {
        await refreshState()
        setShowMatchOverlay(true)
      } else {
        await refreshState()
        setLoading(false)
      }
    } catch (err) {
      console.error("Decision API failed:", err)
      setLoading(false)
    }
  }

  // Initial UI: Mode Selection
  if (!sessionId && !loading) {
    return <ModeModal onSelect={startGame} />
  }

  // Loading UI
  if (!state) {
    return (
      <GameLayout
        title="Entangled"
        icon={<Shuffle className="w-8 h-8 text-rose-400" />}
        accent="from-rose-500 via-pink-500 to-red-500"
      >
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
          <p className="text-muted-foreground">Initializing Engine...</p>
        </div>
      </GameLayout>
    )
  }

  return (
    <>
      <GameLayout
        title="Entangled"
        icon={<Shuffle className="w-8 h-8 text-rose-400" />}
        accent="from-rose-500 via-pink-500 to-red-500"
      >
        <div className="space-y-8">
          <EntangledStatusStrip state={state} />
          <CandidateACard candidate={state.currentUser} />

          {state.lastOutcome && (
            <OutcomePanel outcome={state.lastOutcome} mode={state.mode} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.candidates?.map((candidate: any) => (
              <CandidateCard
                key={candidate.user_id}
                candidate={candidate}
                onDecision={decide}
                disabled={loading}
              />
            ))}
          </div>
        </div>
      </GameLayout>

      {showMatchOverlay && state.lastChat && (
        <MatchConversationOverlay
          chat={state.lastChat}
          mode={state.mode}
          onFinish={() => {
            setShowMatchOverlay(false)
            refreshState()
            setLoading(false)
          }}
        />
      )}

      {/* FIXED: Removed unsupported 'message' to fix TS error */}
      {state.gameStatus === "ENDED" && (
        <GameEndOverlay
          status="WON" 
          onRestart={() => window.location.reload()}
        />
      )}
    </>
  )
}