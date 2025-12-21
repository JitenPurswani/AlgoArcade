"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const games = [
    {
      title: "SilverTongue",
      description: "Master the art of psychological manipulation",
      color: "from-pink-500 to-rose-600",
      glowColor: "shadow-pink-500/50",
    },
    {
      title: "The Hook",
      description: "Navigate the attention economy and algorithm warfare",
      color: "from-cyan-400 to-blue-500",
      glowColor: "shadow-cyan-500/50",
    },
    {
      title: "Entangled",
      description: "Explore dating, ethics, and the choices that define us",
      color: "from-amber-400 to-orange-500",
      glowColor: "shadow-amber-500/50",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-cyan-400 to-amber-400 mb-4 text-balance">
                AlgoArcade
              </h1>
              <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-muted-foreground">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <p className="text-pretty">Where algorithms meet human nature</p>
                <Sparkles className="w-5 h-5 text-pink-400" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = "/games";
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white border-0 rounded-full px-8 py-6 text-lg shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enter the Arcade
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Games Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + index * 0.2,
                  duration: 0.8,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div
                  className={`relative bg-card border border-border rounded-3xl p-8 h-80 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-transparent ${game.glowColor} hover:shadow-2xl`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} mb-6 shadow-lg ${game.glowColor}`}
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <h3 className="text-3xl font-bold mb-3 text-foreground">{game.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{game.description}</p>
                  </div>

                  {/* Decorative gradient line */}
                  <div className={`h-1 bg-gradient-to-r ${game.color} rounded-full relative z-10`} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What is AlgoArcade Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-balance">
              What is AlgoArcade?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              A collection of indie games exploring the fascinating intersection of human psychology, technology, and
              choice. Each game challenges you to understand the hidden algorithms shaping our world.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
