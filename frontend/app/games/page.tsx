"use client";

import { GameCard } from "@/components/GameCard";
import { MessageCircle, Zap, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-cyan-400 to-amber-400">
            Choose Your Game
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three games. Three experiments. Each one explores a different side
            of human behavior shaped by algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GameCard
            title="SilverTongue"
            description="Master the art of psychological manipulation."
            gradient="from-pink-500 to-rose-600"
            glow="shadow-pink-500/50"
            icon={MessageCircle}
            onClick={() => router.push("/games/silvertongue")}
          />

          <GameCard
            title="The Hook"
            description="Navigate the attention economy and algorithm warfare."
            gradient="from-cyan-400 to-blue-500"
            glow="shadow-cyan-500/50"
            icon={Zap}
            onClick={() => router.push("/games/hook")}
          />

          <GameCard
            title="Entangled"
            description="Explore dating, ethics, and difficult choices."
            gradient="from-amber-400 to-orange-500"
            glow="shadow-amber-500/50"
            icon={Shuffle}
            onClick={() => router.push("/games/entangled")}
          />
        </div>
      </section>
    </div>
  );
}
