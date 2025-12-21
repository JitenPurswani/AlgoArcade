"use client"

interface PersonaModalProps {
  onSelect: (persona: string) => void
}

export function PersonaModal({ onSelect }: PersonaModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Choose Persona
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => onSelect("SHARMA_JI")}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Sharma Ji 👴</p>
            <p className="text-sm text-muted-foreground">
              Calm, predictable, slow boredom
            </p>
          </button>

          <button
            onClick={() => onSelect("RIYA")}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Riya 🌸</p>
            <p className="text-sm text-muted-foreground">
              Balanced, aesthetic, thoughtful
            </p>
          </button>

          <button
            onClick={() => onSelect("KABIR")}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Kabir ⚡</p>
            <p className="text-sm text-muted-foreground">
              Fast, dopamine-hungry, high risk
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
