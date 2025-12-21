"use client"

export function EntangledStatusStrip({ state }: { state: any }) {
  const { round, maxRounds, scores } = state

  return (
    <div className="rounded-2xl border border-border bg-card p-4 grid grid-cols-4 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Round</p>
        <p className="font-semibold">{round} / {maxRounds}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Reputation</p>
        <p>{scores.reputation}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Revenue</p>
        <p>{scores.revenue}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Ethical Debt</p>
        <p>{scores.ethical_debt}</p>
      </div>
    </div>
  )
}
