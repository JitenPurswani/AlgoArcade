export function MainUserCard({ user }: { user: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="font-semibold">
        You · {user.hard.age}, {user.hard.location}
      </p>
      <p className="text-sm text-muted-foreground">
        {user.soft.vibe} · {user.soft.lifestyle}
      </p>
      <p className="text-xs mt-2">
        Desperation: {user.desperation} · Churn: {user.churn_risk}
      </p>
    </div>
  )
}
