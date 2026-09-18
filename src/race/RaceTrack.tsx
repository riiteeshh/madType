"use client";

import { RacerIcon } from "./RacerIcon";
import { useRaceStore } from "./race-store";

function RacerLane({
  nickname,
  progress,
  wpm,
  finishedAt,
  isMe,
}: {
  nickname: string;
  progress: number;
  wpm: number;
  finishedAt: number | null;
  isMe: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 truncate text-sm text-muted-foreground">
        {nickname}
        {isMe ? " (you)" : ""}
      </span>
      <div className="relative h-2 flex-1 rounded-full bg-secondary">
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-150"
          style={{ left: `calc(${Math.min(progress, 100)}% - 12px)` }}
        >
          <RacerIcon racing={!finishedAt} />
        </div>
      </div>
      <span
        className={`w-20 shrink-0 text-right text-sm ${finishedAt ? "font-semibold text-brand" : "text-muted-foreground"}`}
      >
        {finishedAt ? "finished" : `${wpm} wpm`}
      </span>
    </div>
  );
}

export function RaceTrack() {
  const racers = useRaceStore((state) => state.racers);
  const myId = useRaceStore((state) => state.myId);

  return (
    <div className="flex w-full flex-col gap-4">
      {Object.values(racers).map((racer) => (
        <RacerLane
          key={racer.memberId}
          nickname={racer.nickname}
          progress={racer.progress}
          wpm={racer.wpm}
          finishedAt={racer.finishedAt}
          isMe={racer.memberId === myId}
        />
      ))}
    </div>
  );
}
