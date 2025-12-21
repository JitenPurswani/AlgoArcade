"use client"

import { motion } from "framer-motion"
import type React from "react"

export interface GameLayoutProps {
  title: string
  icon: React.ReactNode
  accent: string // e.g. "from-pink-500 via-rose-500 to-purple-500"
  children: React.ReactNode
  footer?: React.ReactNode
}

export function GameLayout({
  title,
  icon,
  accent,
  children,
  footer,
}: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-20"
      >
        {/* Ambient glow */}
        <div
          className={`pointer-events-none absolute inset-x-0 -bottom-2 h-10 bg-gradient-to-r ${accent} opacity-20 blur-2xl`}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 4 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0"
            >
              {icon}
            </motion.div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-[2px] bg-gradient-to-r ${accent}`} />
      </motion.header>

      {/* ================= MAIN ================= */}
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="flex-1 overflow-y-auto"
      >
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </div>
      </motion.main>

      {/* ================= FOOTER ================= */}
      {footer && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="sticky bottom-0 z-20 border-t border-border/50 bg-background/80 backdrop-blur-lg shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.4)]"
        >
          <div className="container mx-auto px-4 py-4">
            {footer}
          </div>
        </motion.footer>
      )}
    </div>
  )
}
