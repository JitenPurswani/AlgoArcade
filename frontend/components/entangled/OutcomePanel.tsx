"use client"

export function OutcomePanel({
  outcome,
  mode,
}: {
  outcome: any
  mode: "RISHTA" | "VIBE" | "TOXIC"
}) {
  const modeNote =
    mode === "RISHTA"
      ? "Long-term compatibility weighed heavily."
      : mode === "VIBE"
      ? "Emotional chemistry prioritized."
      : "Manipulative engagement boosted short-term gains."

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="font-semibold mb-1">
        Outcome: {outcome.type}
      </p>

      <p className="text-sm text-muted-foreground mb-2">
        Reputation {outcome.delta.reputation >= 0 ? "+" : ""}
        {outcome.delta.reputation} · Revenue{" "}
        {outcome.delta.revenue >= 0 ? "+" : ""}
        {outcome.delta.revenue} · Ethical{" "}
        {outcome.delta.ethical_debt >= 0 ? "+" : ""}
        {outcome.delta.ethical_debt}
      </p>

      <p className="text-xs italic text-muted-foreground">
        {modeNote}
      </p>
    </div>
  )
}
