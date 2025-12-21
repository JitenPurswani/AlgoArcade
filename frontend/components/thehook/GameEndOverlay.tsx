"use client"

interface GameEndOverlayProps {
  status: "WON" | "LOST"
  onRestart: () => void
}

export function GameEndOverlay({ status, onRestart }: GameEndOverlayProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="max-w-md w-full rounded-2xl bg-card border border-border p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">
          {status === "WON" ? "You Hooked Them 🎯" : "User Got Bored 💀"}
        </h2>

        <button
          onClick={onRestart}
          className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-primary-foreground hover:opacity-90"
        >
          Restart Game
        </button>
      </div>
    </div>
  )
}
