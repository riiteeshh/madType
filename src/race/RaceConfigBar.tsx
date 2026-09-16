"use client";

import {
  TIME_MODE_DURATIONS,
  WORD_COUNT_OPTIONS,
  type Mode,
} from "@/typing-engine";

import { useRaceStore } from "./race-store";

function Pill({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer rounded-full px-3 py-1 transition-all duration-150 active:enabled:scale-90 disabled:cursor-not-allowed ${
        active
          ? "bg-brand text-brand-foreground shadow-[0_0_10px_-2px_var(--brand)]"
          : "text-muted-foreground hover:enabled:bg-accent hover:enabled:text-accent-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function RaceConfigBar({ isHost }: { isHost: boolean }) {
  const config = useRaceStore((state) => state.config);
  const setConfig = useRaceStore((state) => state.setConfig);

  function setMode(mode: Mode) {
    if (isHost) setConfig({ ...config, mode });
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-border bg-card/60 px-4 py-2.5 text-sm">
      <Pill active={config.mode === "time"} disabled={!isHost} onClick={() => setMode("time")}>
        time
      </Pill>
      <Pill active={config.mode === "words"} disabled={!isHost} onClick={() => setMode("words")}>
        words
      </Pill>
      <span className="mx-1 h-4 w-px bg-border" />
      {config.mode === "time"
        ? TIME_MODE_DURATIONS.map((duration) => (
            <Pill
              key={duration}
              active={config.durationSeconds === duration}
              disabled={!isHost}
              onClick={() => isHost && setConfig({ ...config, mode: "time", durationSeconds: duration })}
            >
              {duration}
            </Pill>
          ))
        : WORD_COUNT_OPTIONS.map((count) => (
            <Pill
              key={count}
              active={config.wordCount === count}
              disabled={!isHost}
              onClick={() => isHost && setConfig({ ...config, mode: "words", wordCount: count })}
            >
              {count}
            </Pill>
          ))}
      <span className="mx-1 h-4 w-px bg-border" />
      <Pill
        active={config.difficulty === "common"}
        disabled={!isHost}
        onClick={() => isHost && setConfig({ ...config, difficulty: "common" })}
      >
        common
      </Pill>
      <Pill
        active={config.difficulty === "hard"}
        disabled={!isHost}
        onClick={() => isHost && setConfig({ ...config, difficulty: "hard" })}
      >
        hard
      </Pill>
    </div>
  );
}
