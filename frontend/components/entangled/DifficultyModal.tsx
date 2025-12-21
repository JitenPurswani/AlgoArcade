"use client"

interface DifficultyModalProps {
  onSelect: (difficulty: number) => void
}

export function DifficultyModal({ onSelect }: DifficultyModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Choose Difficulty
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => onSelect(1)}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Easy</p>
            <p className="text-sm text-muted-foreground">
              Forgiving candidates, slower churn
            </p>
          </button>

          <button
            onClick={() => onSelect(2)}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Medium</p>
            <p className="text-sm text-muted-foreground">
              Balanced, realistic outcomes
            </p>
          </button>

          <button
            onClick={() => onSelect(3)}
            className="w-full rounded-xl p-4 bg-muted hover:bg-muted/80 text-left"
          >
            <p className="font-semibold">Hard</p>
            <p className="text-sm text-muted-foreground">
              High churn, brutal consequences
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
