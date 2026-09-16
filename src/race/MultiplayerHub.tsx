"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { generateRoomCode } from "./generate-room-code";

export function MultiplayerHub() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");

  function createRoom() {
    router.push(`/room/${generateRoomCode()}`);
  }

  function joinRoom() {
    const code = joinCode.trim().toUpperCase();
    if (code) router.push(`/room/${code}`);
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <button
        type="button"
        onClick={createRoom}
        className="cursor-pointer rounded-md bg-brand px-4 py-3 text-sm font-medium text-brand-foreground transition-transform duration-150 hover:scale-[1.02] hover:opacity-90 active:scale-95"
      >
        Create private room
      </button>

      <div className="flex gap-2">
        <input
          value={joinCode}
          onChange={(event) => setJoinCode(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && joinRoom()}
          placeholder="Room code"
          maxLength={6}
          className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm uppercase text-foreground outline-none focus:border-ring"
        />
        <button
          type="button"
          onClick={joinRoom}
          className="cursor-pointer rounded-md border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-transform duration-150 hover:scale-[1.02] hover:bg-accent active:scale-95"
        >
          Join
        </button>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={() => router.push("/quick-match")}
        className="cursor-pointer rounded-md border border-border bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-transform duration-150 hover:scale-[1.02] hover:bg-accent active:scale-95"
      >
        Quick match
      </button>
    </div>
  );
}
