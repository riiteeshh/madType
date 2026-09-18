"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGuestStore } from "@/guest";

import { ConnectionIndicator } from "./ConnectionIndicator";
import { RaceConfigBar } from "./RaceConfigBar";
import { RaceResults } from "./RaceResults";
import { RaceTrack } from "./RaceTrack";
import { RaceTypingArea } from "./RaceTypingArea";
import { useRaceStore } from "./race-store";
import { isRoomCreator } from "./room-creator";

export function RaceView({
  channelName,
  isQuickMatch,
  roomCode,
}: {
  channelName: string;
  isQuickMatch: boolean;
  roomCode?: string;
}) {
  const router = useRouter();
  const nickname = useGuestStore((state) => state.nickname);
  const hydrateGuest = useGuestStore((state) => state.hydrate);
  const status = useRaceStore((state) => state.status);
  const racers = useRaceStore((state) => state.racers);
  const join = useRaceStore((state) => state.join);
  const leave = useRaceStore((state) => state.leave);
  const startCountdown = useRaceStore((state) => state.startCountdown);
  const isCreator =
    typeof window !== "undefined" &&
    !isQuickMatch &&
    !!roomCode &&
    isRoomCreator(roomCode);

  useEffect(() => {
    hydrateGuest();
  }, [hydrateGuest]);

  useEffect(() => {
    if (!nickname) return;
    join(channelName, nickname, isQuickMatch);
    return () => leave();
  }, [nickname, channelName, isQuickMatch, join, leave]);

  const playerCount = Object.keys(racers).length;
  const canStart = playerCount >= 2;

  if (!nickname) return null;

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-8">
      <ConnectionIndicator />
      {roomCode && (
        <p className="text-sm text-muted-foreground">
          Room code: <span className="font-mono text-foreground">{roomCode}</span>
        </p>
      )}

      {status === "waiting" && (
        <div className="flex w-full flex-col items-center gap-6">
          <RaceConfigBar isHost={isCreator} />
          <p className="text-sm text-muted-foreground">
            {playerCount} player{playerCount === 1 ? "" : "s"} in{" "}
            {isQuickMatch ? "queue" : "room"}
          </p>
          {isCreator && (
            <button
              type="button"
              onClick={startCountdown}
              disabled={!canStart}
              className="cursor-pointer rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform duration-150 hover:scale-[1.03] hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              Start race
            </button>
          )}
          {isCreator && !canStart && (
            <p className="text-xs text-muted-foreground">
              Waiting for at least one more player to join…
            </p>
          )}
          {isQuickMatch && (
            <p className="text-xs text-muted-foreground">
              Race starts automatically once enough players join.
            </p>
          )}
        </div>
      )}

      {(status === "countdown" || status === "running") && (
        <div className="flex w-full flex-col gap-8">
          <RaceTrack />
          <RaceTypingArea />
        </div>
      )}

      {status === "finished" && (
        <div className="flex w-full flex-col gap-6">
          <RaceTrack />
          <RaceResults />
          <div className="flex gap-3">
            {isCreator && (
              <button
                type="button"
                onClick={startCountdown}
                disabled={!canStart}
                className="cursor-pointer rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform duration-150 hover:scale-[1.03] hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Play again
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push("/multiplayer")}
              className="cursor-pointer rounded-md border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-transform duration-150 hover:scale-[1.03] hover:bg-accent active:scale-95"
            >
              Leave
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
