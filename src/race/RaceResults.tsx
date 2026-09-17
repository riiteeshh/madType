"use client";

import type { Mode } from "@/typing-engine";

import { useRaceStore } from "./race-store";

function rankByFinishOrder(racers: ReturnType<typeof useRaceStore.getState>["racers"]) {
  return Object.values(racers).sort((a, b) => {
    if (a.finishedAt === null) return 1;
    if (b.finishedAt === null) return -1;
    return a.finishedAt - b.finishedAt;
  });
}

function rankByWpm(racers: ReturnType<typeof useRaceStore.getState>["racers"]) {
  return Object.values(racers).sort((a, b) => b.wpm - a.wpm);
}

function rankRacers(
  racers: ReturnType<typeof useRaceStore.getState>["racers"],
  mode: Mode,
) {
  return mode === "time" ? rankByWpm(racers) : rankByFinishOrder(racers);
}

export function RaceResults() {
  const status = useRaceStore((state) => state.status);
  const config = useRaceStore((state) => state.config);
  const racers = useRaceStore((state) => state.racers);
  const myId = useRaceStore((state) => state.myId);

  if (status !== "finished") return null;

  return (
    <div className="w-full space-y-2">
      <h2 className="text-lg font-semibold text-foreground">Results</h2>
      <ol className="space-y-1">
        {rankRacers(racers, config.mode).map((racer, index) => (
          <li
            key={racer.memberId}
            className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-2"
          >
            <span className="text-foreground">
              {index + 1}. {racer.nickname}
              {racer.memberId === myId ? " (you)" : ""}
            </span>
            <span className="text-muted-foreground">
              {racer.finishedAt ? `${racer.wpm} wpm` : "still typing"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
