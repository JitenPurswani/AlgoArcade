"use client"

import { motion } from "framer-motion"
import { Flame, Clock } from "lucide-react"

interface Video {
  id: string
  topic: string
  duration: number
  viral_score: number
}

interface VideoCardProps {
  video: Video
  index: number
  onClick: () => void
}

export function VideoCard({ video, index, onClick }: VideoCardProps) {
  const topic = video.topic.toLowerCase()

  // ================= TITLE VARIANTS (3 EACH) =================
  const TITLE_VARIANTS: Record<string, string[]> = {
    coding: [
      "This coding trick is underrated",
      "Every developer should know this",
      "Clean code feels illegal sometimes",
    ],
    ai: [
      "This AI feels too real",
      "AI you didn’t expect",
      "Why AI is everywhere",
    ],
    startups: [
      "Startup mistakes nobody talks about",
      "Why most startups fail",
      "This idea almost worked",
    ],
    memes: [
      "This meme lives rent free",
      "Internet humor peaked here",
      "You’ve seen this before",
    ],
    dark_memes: [
      "This shouldn’t be funny",
      "Dark humor hits different",
      "Not everyone will get this",
    ],
    anime: [
      "This anime moment broke me",
      "Anime fans know this feeling",
      "Why this scene is iconic",
    ],
    gaming: [
      "Gamers will understand this",
      "This game still holds up",
      "Only real gamers remember this",
    ],
    esports: [
      "This esports play was insane",
      "Peak competitive gameplay",
      "Clutch moments like this",
    ],
    cricket: [
      "Cricket fans can’t forget this",
      "This over changed everything",
      "Pure cricket madness",
    ],
    football: [
      "Football moments like this",
      "This goal still gives chills",
      "Football fans remember this",
    ],
    f1: [
      "F1 fans know this pain",
      "This race was chaotic",
      "Pure Formula 1 drama",
    ],
    music_rap: [
      "Rap fans know this flow",
      "This verse still gives chills",
      "Peak lyrical storytelling",
    ],
    news: [
      "This headline shocked everyone",
      "News you might have missed",
      "This happened today",
    ],
    politics: [
      "Politics is getting wild",
      "This debate says everything",
      "Power moves you didn’t notice",
    ],
    geopolitics: [
      "Global tensions explained simply",
      "Why this matters worldwide",
      "The world is shifting",
    ],
    finance: [
      "Money mistakes people repeat",
      "This finance rule matters",
      "Why saving isn’t enough",
    ],
    crypto: [
      "Crypto is wild again",
      "This coin surprised everyone",
      "Crypto myths you believe",
    ],
    stock_market: [
      "Market moves explained",
      "Stocks don’t move randomly",
      "This pattern keeps repeating",
    ],
    fitness: [
      "This workout hits different",
      "Fitness mistakes everyone makes",
      "Why this routine works",
    ],
    mental_health: [
      "This needs to be said",
      "Mental health isn’t simple",
      "You’re not alone in this",
    ],
    travel: [
      "Would you visit this?",
      "This place feels unreal",
      "Hidden travel gem",
    ],
    cafes: [
      "I’d sit here for hours",
      "This café aesthetic is perfect",
      "Coffee lovers need this",
    ],
    food: [
      "This looks way too good",
      "Food that hits instantly",
      "I’d eat this every day",
    ],
    cooking: [
      "This recipe is foolproof",
      "Cooking doesn’t get easier",
      "You should try this tonight",
    ],
    cats: [
      "Cats being cats",
      "This cat owns the house",
      "Peak cat behavior",
    ],
    dogs: [
      "Dogs are too pure",
      "This dog made my day",
      "Good boy energy",
    ],
    wildlife: [
      "Nature is unreal",
      "Wildlife moments caught on cam",
      "Animals are smarter than we think",
    ],
    astrology: [
      "Astrology people will get this",
      "Your sign explains this",
      "This is so zodiac-coded",
    ],
    spirituality: [
      "This feels peaceful",
      "You needed to hear this",
      "Slow down for a moment",
    ],
    music_pop: [
      "This song gets stuck",
      "Pop music done right",
      "You’ve heard this everywhere",
    ],
    music_rock: [
      "Rock never gets old",
      "This riff hits hard",
      "Rock fans know this",
    ],
    music_lofi: [
      "You’ll relax instantly",
      "This sound hits at night",
      "Perfect late-night vibe",
    ],
    fashion: [
      "This outfit works",
      "Fashion trends explained",
      "Style done right",
    ],
    aesthetics: [
      "This aesthetic is addictive",
      "Why this feels calming",
      "Soft visuals, big vibe",
    ],
    brainrot: [
      "Brainrot is real",
      "Internet broke my brain",
      "Why is this funny?",
    ],
  }

  const title =
    TITLE_VARIANTS[topic]?.[index % 3] ??
    video.topic.replace("_", " ")

  const topicLabel = video.topic.replace("_", " ").toUpperCase()
  const highViral = video.viral_score > 0.7

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl
        bg-gradient-to-br
        ${highViral ? "from-purple-500/20 via-pink-500/10" : "from-blue-500/10"}
        to-transparent
        border border-border
        p-5 overflow-hidden
        hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]
      `}
    >
      {/* Viral badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold text-amber-400">
        <Flame className="w-4 h-4" />
        {(video.viral_score * 100).toFixed(0)}%
      </div>

      {/* Topic label */}
      <span className="mb-1 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground">
        {topicLabel}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2">
        {title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{video.duration}s</span>
      </div>

      {/* Bottom glow */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
    </motion.div>
  )
}
