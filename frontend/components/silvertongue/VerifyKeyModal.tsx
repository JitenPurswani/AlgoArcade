"use client"

import { useState } from "react"

interface VerifyKeyModalProps {
  onVerify: (key: string) => void
  onClose: () => void
  loading: boolean
}

export function VerifyKeyModal({
  onVerify,
  onClose,
  loading,
}: VerifyKeyModalProps) {
  const [value, setValue] = useState("")

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-amber-400">
          Verify Extracted Key
        </h2>

        <p className="text-sm text-muted-foreground text-center">
          Warning: Verifying an invalid key may trigger system lockdown.
        </p>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter key to verify"
          className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border px-4 py-3 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={() => onVerify(value)}
            disabled={!value || loading}
            className="flex-1 rounded-xl bg-amber-500 px-4 py-3 text-sm text-black font-semibold disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify"}
          </button>
        </div>
      </div>
    </div>
  )
}
