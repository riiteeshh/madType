"use client";

import { useEffect, useRef } from "react";

import { TypingWord } from "@/test/TypingWord";

import { useRaceStore } from "./race-store";
import { useRaceTypingStore } from "./race-typing-store";
import { useRaceCountdown } from "./use-race-countdown";

function isPrintableKey(event: React.KeyboardEvent): boolean {
  return (
    event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
  );
}

export function RaceTypingArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  const raceWords = useRaceStore((state) => state.raceWords);
  const status = useRaceStore((state) => state.status);
  const raceStartAt = useRaceStore((state) => state.raceStartAt);
  const beginRace = useRaceStore((state) => state.beginRace);
  const reportProgress = useRaceStore((state) => state.reportProgress);
  const reportFinish = useRaceStore((state) => state.reportFinish);

  const currentWordIndex = useRaceTypingStore((state) => state.currentWordIndex);
  const currentInput = useRaceTypingStore((state) => state.currentInput);
  const typedWords = useRaceTypingStore((state) => state.typedWords);
  const typeChar = useRaceTypingStore((state) => state.typeChar);
  const backspace = useRaceTypingStore((state) => state.backspace);
  const commitWord = useRaceTypingStore((state) => state.commitWord);
  const resetTyping = useRaceTypingStore((state) => state.reset);

  const countdown = useRaceCountdown(status === "countdown" ? raceStartAt : null);

  useEffect(() => {
    resetTyping();
  }, [resetTyping]);

  useEffect(() => {
    if (status === "countdown" && countdown === 0) beginRace();
  }, [status, countdown, beginRace]);

  useEffect(() => {
    if (status === "running") inputRef.current?.focus();
  }, [status]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (status !== "running") return;

    if (event.key === "Backspace") {
      backspace();
      return;
    }
    if (event.key === " ") {
      event.preventDefault();
      commitWord(raceWords, reportProgress);
      return;
    }
    if (isPrintableKey(event)) typeChar(event.key, raceWords, reportFinish);
  }

  if (status === "countdown") {
    return (
      <div className="flex h-40 items-center justify-center">
        <span
          key={countdown}
          className="text-7xl font-bold text-brand [animation:pop_0.3s_ease-out]"
        >
          {countdown === 0 ? "Go!" : countdown}
        </span>
      </div>
    );
  }

  if (status !== "running") return null;

  return (
    <div
      className="relative w-full cursor-text rounded-lg p-2 outline-none"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="absolute h-0 w-0 caret-transparent opacity-0"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Typing input"
      />
      <div className="flex max-h-[150px] flex-wrap overflow-hidden text-3xl leading-[1.4] md:max-h-[180px] md:text-4xl">
        {raceWords.map((word, index) => (
          <TypingWord
            key={index}
            target={word}
            typed={
              index < currentWordIndex
                ? (typedWords[index] ?? "")
                : index === currentWordIndex
                  ? currentInput
                  : ""
            }
          />
        ))}
      </div>
    </div>
  );
}
