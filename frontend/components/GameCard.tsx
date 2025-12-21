"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  gradient: string;
  glow: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function GameCard({
  title,
  description,
  gradient,
  glow,
  icon: Icon,
  onClick,
}: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div
        className={`relative h-80 rounded-3xl border border-border bg-card p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-2xl ${glow}`}
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradient}`}
        />

        {/* Content */}
        <div className="relative z-10">
          <div
            className={`mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${glow} flex items-center justify-center`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="mb-3 text-3xl font-bold">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Accent line */}
        <div
          className={`relative z-10 h-1 rounded-full bg-gradient-to-r ${gradient}`}
        />
      </div>
    </motion.div>
  );
}
