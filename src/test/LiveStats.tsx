"use client";

import { useTestStore, useTestResult } from "./test-store";

export function LiveStats() {
  const status = useTestStore((state) => state.status);
  const config = useTestStore((state) => state.config);
  const timeRemaining = useTestStore((state) => state.timeRemaining);
  const wordsRemaining = useTestStore(
    (state) => state.words.length - state.currentWordIndex,
  );
  const { wpm, accuracy } = useTestResult();

  const progress =
    config.mode === "time" ? timeRemaining : wordsRemaining;

  return (
    <div className="flex h-16 items-center gap-6">
      {status === "running" && (
        <>
          <span className="text-4xl font-semibold text-brand">{progress}</span>
          <span className="text-lg text-muted-foreground">{wpm} wpm</span>
          <span className="text-lg text-muted-foreground">{accuracy}% acc</span>
        </>
      )}
    </div>
  );
}
