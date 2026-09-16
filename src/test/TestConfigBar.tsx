"use client";

import {
  TIME_MODE_DURATIONS,
  WORD_COUNT_OPTIONS,
  type Difficulty,
  type Mode,
} from "@/typing-engine";

import { useTestStore } from "./test-store";

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full px-3 py-1 transition-all duration-150 active:scale-90 ${
        active
          ? "bg-brand text-brand-foreground shadow-[0_0_10px_-2px_var(--brand)]"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function TestConfigBar() {
  const config = useTestStore((state) => state.config);
  const setConfig = useTestStore((state) => state.setConfig);

  function setMode(mode: Mode) {
    setConfig({ ...config, mode });
  }

  function setDuration(durationSeconds: (typeof TIME_MODE_DURATIONS)[number]) {
    setConfig({ ...config, mode: "time", durationSeconds });
  }

  function setWordCount(wordCount: (typeof WORD_COUNT_OPTIONS)[number]) {
    setConfig({ ...config, mode: "words", wordCount });
  }

  function setDifficulty(difficulty: Difficulty) {
    setConfig({ ...config, difficulty });
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-border bg-card/60 px-4 py-2.5 text-sm">
      <PillButton active={config.mode === "time"} onClick={() => setMode("time")}>
        time
      </PillButton>
      <PillButton
        active={config.mode === "words"}
        onClick={() => setMode("words")}
      >
        words
      </PillButton>
      <span className="mx-1 h-4 w-px bg-border" />
      {config.mode === "time"
        ? TIME_MODE_DURATIONS.map((duration) => (
            <PillButton
              key={duration}
              active={config.durationSeconds === duration}
              onClick={() => setDuration(duration)}
            >
              {duration}
            </PillButton>
          ))
        : WORD_COUNT_OPTIONS.map((count) => (
            <PillButton
              key={count}
              active={config.wordCount === count}
              onClick={() => setWordCount(count)}
            >
              {count}
            </PillButton>
          ))}
      <span className="mx-1 h-4 w-px bg-border" />
      <PillButton
        active={config.difficulty === "common"}
        onClick={() => setDifficulty("common")}
      >
        common
      </PillButton>
      <PillButton
        active={config.difficulty === "hard"}
        onClick={() => setDifficulty("hard")}
      >
        hard
      </PillButton>
      <span className="mx-1 h-4 w-px bg-border" />
      <PillButton
        active={config.punctuation}
        onClick={() => setConfig({ ...config, punctuation: !config.punctuation })}
      >
        punctuation
      </PillButton>
      <PillButton
        active={config.numbers}
        onClick={() => setConfig({ ...config, numbers: !config.numbers })}
      >
        numbers
      </PillButton>
    </div>
  );
}
