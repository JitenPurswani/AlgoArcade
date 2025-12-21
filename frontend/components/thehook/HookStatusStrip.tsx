"use client"

interface HookStatusStripProps {
  boredom: number
  timeWatched: number
  emoji: string
}

export function HookStatusStrip({
  boredom,
  timeWatched,
  emoji,
}: HookStatusStripProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{emoji}</span>
        <span className="text-sm text-muted-foreground">
          {timeWatched}s / 600s
        </span>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">Time Watched</p>
        <div className="h-2 rounded-full bg-blue-500/30">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${Math.min((timeWatched / 600) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">Boredom</p>
        <div className="h-2 rounded-full bg-red-500/30">
          <div
            className="h-full rounded-full bg-red-500"
            style={{ width: `${Math.min(boredom, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
