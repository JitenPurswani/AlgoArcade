"use client"

interface Props {
  disabled: boolean
  onDecision: (d: string) => void
}

export function DecisionBar({ disabled, onDecision }: Props) {
  const actions = ["MATCH", "PASS", "DELAY", "SHADOW"]

  return (
    <div className="flex gap-3">
      {actions.map((a) => (
        <button
          key={a}
          disabled={disabled}
          onClick={() => onDecision(a)}
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-3 text-sm hover:bg-muted/80 disabled:opacity-50"
        >
          {a}
        </button>
      ))}
    </div>
  )
}
