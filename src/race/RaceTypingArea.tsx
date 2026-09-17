"use client";

import { useEffect, useRef } from "react";

import { useActiveWordScroll } from "@/shared";
import { TypingWord } from "@/test/TypingWord";
import {
  BUFFER_REFILL_SIZE,
  generateText,
  shouldRefillBuffer,
} from "@/typing-engine";

import { useRaceStore } from "./race-store";
import { useRaceTypingStore } from "./race-typing-store";
import { useRaceCountdown } from "./use-race-countdown";
import { useRaceTimeLimit } from "./use-race-time-limit";

function isPrintableKey(event: React.KeyboardEvent): boolean {
  return (
    event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
  );
}

export function RaceTypingArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  const raceWords = useRaceStore((state) => state.raceWords);
  const status = useRaceStore((state) => state.status);
  const config = useRaceStore((state) => state.config);
  const raceStartAt = useRaceStore((state) => state.raceStartAt);
  const myId = useRaceStore((state) => state.myId);
  const myWpm = useRaceStore((state) => (myId ? state.racers[myId]?.wpm : 0)) ?? 0;
  const beginRace = useRaceStore((state) => state.beginRace);
  const extendWords = useRaceStore((state) => state.extendWords);
  const reportProgress = useRaceStore((state) => state.reportProgress);
  const reportFinish = useRaceStore((state) => state.reportFinish);

  const currentWordIndex = useRaceTypingStore((state) => state.currentWordIndex);
  const currentInput = useRaceTypingStore((state) => state.currentInput);
  const typedWords = useRaceTypingStore((state) => state.typedWords);
  const typeChar = useRaceTypingStore((state) => state.typeChar);
  const backspace = useRaceTypingStore((state) => state.backspace);
  const commitWord = useRaceTypingStore((state) => state.commitWord);
  const resetTyping = useRaceTypingStore((state) => state.reset);
  const { containerRef, offset } = useActiveWordScroll(currentWordIndex);

  const countdown = useRaceCountdown(status === "countdown" ? raceStartAt : null);
  const timeRemaining = useRaceCountdown(
    status === "running" && config.mode === "time" && raceStartAt !== null
      ? raceStartAt + config.durationSeconds * 1000
      : null,
  );
  useRaceTimeLimit();

  useEffect(() => {
    resetTyping();
  }, [resetTyping]);

  useEffect(() => {
    if (status === "countdown" && countdown === 0) beginRace();
  }, [status, countdown, beginRace]);

  useEffect(() => {
    if (status === "running") inputRef.current?.focus();
  }, [status]);

  const progressTotal =
    config.mode === "words" ? raceWords.length : config.durationSeconds;

  function handleKeyDown(event: React.KeyboardEvent) {
    if (status !== "running") return;

    if (event.key === "Backspace") {
      backspace();
      return;
    }
    if (event.key === " ") {
      event.preventDefault();
      commitWord(progressTotal, reportProgress);
      if (
        config.mode === "time" &&
        shouldRefillBuffer(raceWords.length, currentWordIndex + 1)
      ) {
        extendWords(
          generateText({ ...config, mode: "words", wordCount: BUFFER_REFILL_SIZE }),
        );
      }
      return;
    }
    if (isPrintableKey(event)) typeChar(event.key, raceWords, config.mode, reportFinish);
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
      <div className="mb-4 flex h-10 items-center gap-6">
        <span className="text-2xl font-semibold text-brand">
          {config.mode === "time" ? timeRemaining : raceWords.length - currentWordIndex}
        </span>
        <span className="text-lg text-muted-foreground">{myWpm} wpm</span>
      </div>
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="absolute h-0 w-0 caret-transparent opacity-0"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Typing input"
      />
      <div className="max-h-[150px] overflow-hidden text-3xl leading-[1.4] md:max-h-[180px] md:text-4xl">
        <div
          ref={containerRef}
          className="flex flex-wrap transition-transform duration-150"
          style={{ transform: `translateY(-${offset}px)` }}
        >
          {raceWords.map((word, index) => (
            <span key={index} data-word-index={index}>
              <TypingWord
                target={word}
                typed={
                  index < currentWordIndex
                    ? (typedWords[index] ?? "")
                    : index === currentWordIndex
                      ? currentInput
                      : ""
                }
                isActive={index === currentWordIndex}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
