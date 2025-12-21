"use client"

interface PersonaHeaderProps {
  persona: string | null
  emoji: string
}

export function PersonaHeader({ persona, emoji }: PersonaHeaderProps) {
  if (!persona) return null

  const personaInfo: Record<string, string> = {
    RIYA: "Balanced, aesthetic, thoughtful user",
    SHARMA_JI: "Calm, predictable, slow to boredom",
    KABIR: "Fast, dopamine-hungry, highly volatile",
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{emoji}</span>

        <div>
          <p className="font-semibold">
            {persona.replace("_", " ")}
          </p>
          <p className="text-sm text-muted-foreground">
            {personaInfo[persona]}
          </p>
        </div>
      </div>

      <span className="text-xs text-muted-foreground">
        User Persona
      </span>
    </div>
  )
}
