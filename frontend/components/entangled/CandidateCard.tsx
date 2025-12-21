"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface CandidateCardProps {
  candidate: any
  onDecision: (decision: string, candidateId: string) => void
  disabled?: boolean
}

export function CandidateCard({ candidate, onDecision, disabled }: CandidateCardProps) {
  const [flipped, setFlipped] = useState(false)
  const { hard, soft, red_flags } = candidate

  return (
    <div className="relative h-[400px] w-full" style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          onClick={() => !disabled && setFlipped(true)}
          className="absolute inset-0 rounded-2xl border border-border bg-card p-5 cursor-pointer shadow-sm backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold text-xl">{hard.age}, {hard.location}</p>
              <p className="text-muted-foreground text-xs">{hard.education} · {hard.salary_band}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
              <span className="text-muted-foreground text-xs">Diet: <span className="text-foreground">{hard.diet}</span></span>
              <span className="text-muted-foreground text-xs">Family: <span className="text-foreground">{hard.family_expectation}</span></span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 py-2">
              <span className="flex items-center gap-1">✨ {soft.vibe}</span>
              <span className="flex items-center gap-1">🎵 {soft.music}</span>
              <span className="flex items-center gap-1">🏠 {soft.lifestyle}</span>
              <span className="flex items-center gap-1">😂 {soft.humor}</span>
            </div>

            <div className="flex gap-1.5 flex-wrap pt-2">
              {/* FIXED: Explicitly handles red_flags object to avoid ReactNode errors */}
              {Object.entries(red_flags || {}).map(([key, value]) => {
                if (!value) return null;
                return (
                  <span key={key} className="text-[10px] px-2 py-0.5 rounded border border-red-500/20 bg-red-500/5 text-red-500 capitalize">
                    {String(key).replace(/_/g, ' ')}
                  </span>
                );
              })}
            </div>
            
            <p className="text-center text-[10px] text-muted-foreground italic pt-4">Click to Open Actions</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-card border-2 border-primary/10 flex flex-col justify-center gap-3 p-6 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-center font-bold text-xs text-muted-foreground mb-4">MATCHMAKER CONTROLS</p>
          
          {["MATCH", "PASS", "DELAY", "SHADOW"].map((action) => (
            <button
              key={action}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation(); 
                onDecision(action, candidate.user_id);
              }}
              className={`
                w-full rounded-xl py-3 text-sm font-bold transition-all active:scale-95 disabled:opacity-50
                ${action === "MATCH" ? "bg-green-600 text-white" : 
                  action === "PASS" ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" :
                  action === "DELAY" ? "bg-blue-600 text-white" : "bg-red-600 text-white"}
              `}
            >
              {action}
            </button>
          ))}

          <button
            onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground text-center"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}