"use client"

interface StatusStripProps {
  risk: number
  trust: number
  mode: string
  turn: number
  onVerifyClick?: () => void
}

export function StatusStrip({
  risk,
  trust,
  mode,
  turn,
  onVerifyClick,
}: StatusStripProps) {
  const showVerify = risk >= 0.7 && onVerifyClick

  return (
    <div className="rounded-2xl border border-border bg-card p-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Risk</p>
        <div className="h-2 mt-1 rounded-full bg-red-500/30">
          <div
            className="h-full rounded-full bg-red-500"
            style={{ width: `${Math.min(risk * 100, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-muted-foreground">Trust</p>
        <div className="h-2 mt-1 rounded-full bg-green-500/30">
          <div
            className="h-full rounded-full bg-green-500"
            style={{ width: `${Math.min(trust, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-muted-foreground">Mode</p>
        <p className="font-semibold">{mode}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Turn</p>
        <p className="font-semibold">{turn}</p>
      </div>

      <div className="flex items-end">
        {showVerify && (
          <button
            onClick={onVerifyClick}
            className="w-full rounded-xl bg-amber-500/90 px-3 py-2 text-xs font-semibold text-black hover:bg-amber-500"
          >
            Verify Key
          </button>
        )}
      </div>
    </div>
  )
}
