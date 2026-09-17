"use client";

import { useRaceStore, type PusherConnectionState } from "./race-store";

const LABELS: Partial<Record<PusherConnectionState, string>> = {
  connecting: "Connecting…",
  disconnected: "Disconnected — reconnecting…",
  unavailable: "Connection unavailable",
  failed: "Connection failed",
};

export function ConnectionIndicator() {
  const connectionState = useRaceStore((state) => state.connectionState);
  const label = LABELS[connectionState];

  if (!label) return null;

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
      <span className="size-1.5 animate-pulse rounded-full bg-destructive" />
      {label}
    </div>
  );
}
