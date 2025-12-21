"use client"

import { useEffect, useState } from "react"
import { Zap } from "lucide-react"

import { GameLayout } from "@/components/GameLayout"
import { PersonaModal } from "@/components/thehook/PersonaModal"
import { VideoCard } from "@/components/thehook/VideoCard"
import { HookStatusStrip } from "@/components/thehook/HookStatusStrip"
import { GameEndOverlay } from "@/components/thehook/GameEndOverlay"
import { PersonaHeader } from "@/components/thehook/PersonaHeader"
import { postJSON } from "@/lib/api"

interface Video {
  id: string
  topic: string
  duration: number
  viral_score: number
}

type GameStatus = "IN_PROGRESS" | "WON" | "LOST"

export default function HookPage() {
  const [persona, setPersona] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  const [feed, setFeed] = useState<Video[]>([])
  const [boredom, setBoredom] = useState(0)
  const [timeWatched, setTimeWatched] = useState(0)
  const [emoji, setEmoji] = useState("🙂")
  const [status, setStatus] = useState<GameStatus>("IN_PROGRESS")

  // ---------- START GAME ----------
  useEffect(() => {
    if (!persona) return

    async function startGame() {
      const res = await postJSON<any>("/hook/start", { persona })

      setSessionId(res.sessionId)
      setFeed(res.feed)
      setBoredom(res.boredom)
      setTimeWatched(res.time_watched)
      setEmoji(res.emoji)
      setStatus(res.status)
    }

    startGame()
  }, [persona])

  // ---------- PICK VIDEO ----------
  async function pickVideo(videoId: string) {
    if (!sessionId || status !== "IN_PROGRESS") return

    const res = await postJSON<any>("/hook/next", {
      sessionId,
      videoId,
    })

    setFeed(res.feed)
    setBoredom(res.boredom)
    setTimeWatched(res.time_watched)
    setEmoji(res.emoji)
    setStatus(res.status)
  }

  function restart() {
    window.location.reload()
  }

  return (
    <>
      {!persona && <PersonaModal onSelect={setPersona} />}

      <GameLayout
        title="The Hook"
        icon={<Zap className="w-8 h-8 text-cyan-400" />}
        accent="from-cyan-500 via-blue-500 to-indigo-500"
      >
        <div className="space-y-6">
          {persona && (
          <PersonaHeader persona={persona} emoji={emoji} />
          )}
          <HookStatusStrip
            boredom={boredom}
            timeWatched={timeWatched}
            emoji={emoji}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {feed.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                onClick={() => pickVideo(video.id)}
              />
            ))}
          </div>
        </div>
      </GameLayout>

      {status !== "IN_PROGRESS" && (
        <GameEndOverlay status={status} onRestart={restart} />
      )}
    </>
  )
}
