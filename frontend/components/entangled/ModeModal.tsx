"use client"

interface ModeModalProps {
  onSelect: (mode: "RISHTA" | "VIBE" | "TOXIC") => void
}

export function ModeModal({ onSelect }: ModeModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Choose Mode
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => onSelect("RISHTA")}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Rishta 💍</p>
            <p className="text-sm text-muted-foreground">
              Traditional, long-term, trust-focused
            </p>
          </button>

          <button
            onClick={() => onSelect("VIBE")}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Vibe ✨</p>
            <p className="text-sm text-muted-foreground">
              Casual, emotional, uncertain
            </p>
          </button>

          <button
            onClick={() => onSelect("TOXIC")}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Toxic ☠️</p>
            <p className="text-sm text-muted-foreground">
              Manipulative, high churn, brutal endings
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
