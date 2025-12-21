"use client"

import { motion } from "framer-motion"

export function CandidateACard({ candidate }: { candidate: any }) {
  const { hard, soft, red_flags, desperation, churn_risk } = candidate

  return (
    <motion.div
      className="
        rounded-2xl border border-border bg-card p-5
        ring-1 ring-rose-500/40
      "
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* HEADER */}
      <div className="mb-3">
        <p className="text-xs tracking-wide text-rose-400 font-semibold">
          CANDIDATE A · USER
        </p>
        <p className="text-lg font-bold">
          {hard.age}, {hard.location}
        </p>
        <p className="text-sm text-muted-foreground">
          {hard.education} · {hard.salary_band}
        </p>
      </div>

      {/* HARD ATTRIBUTES */}
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <span>Diet: {hard.diet}</span>
        <span>Family: {hard.family_expectation}</span>
      </div>

      {/* SOFT ATTRIBUTES */}
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <span>Vibe: {soft.vibe}</span>
        <span>Humor: {soft.humor}</span>
        <span>Music: {soft.music}</span>
        <span>Lifestyle: {soft.lifestyle}</span>
      </div>

      {/* EMOTIONAL AVAILABILITY */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-1">
          Emotional Availability
        </p>
        <div className="h-2 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400"
            style={{ width: `${soft.emotional_availability * 100}%` }}
          />
        </div>
      </div>

      {/* DESPERATION / CHURN */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <span>Desperation: {desperation}</span>
        <span>Churn Risk: {churn_risk}</span>
      </div>

      {/* RED FLAGS */}
      <div className="flex gap-2 flex-wrap">
        {red_flags.ghosting && (
          <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
            Ghosting
          </span>
        )}
        {red_flags.commitment_issues && (
          <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs">
            Commitment
          </span>
        )}
        {red_flags.controlling && (
          <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
            Controlling
          </span>
        )}
      </div>
    </motion.div>
  )
}
