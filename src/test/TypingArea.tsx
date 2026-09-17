"use client";

import { useEffect, useRef } from "react";

import { useActiveWordScroll } from "@/shared";

import { useTestStore } from "./test-store";
import { useTestTicker } from "./use-test-ticker";
import { TypingWord } from "./TypingWord";

function isPrintableKey(event: React.KeyboardEvent): boolean {
  return (
    event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
  );
}

export function TypingArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  const words = useTestStore((state) => state.words);
  const typedWords = useTestStore((state) => state.typedWords);
  const currentWordIndex = useTestStore((state) => state.currentWordIndex);
  const currentInput = useTestStore((state) => state.currentInput);
  const status = useTestStore((state) => state.status);
  const start = useTestStore((state) => state.start);
  const typeChar = useTestStore((state) => state.typeChar);
  const backspace = useTestStore((state) => state.backspace);
  const space = useTestStore((state) => state.space);
  const ensureWords = useTestStore((state) => state.ensureWords);
  const { containerRef, offset } = useActiveWordScroll(currentWordIndex);

  useTestTicker();

  useEffect(() => {
    ensureWords();
  }, [ensureWords]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status, words]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (status === "finished") return;
    if (status === "idle") start();

    if (event.key === "Backspace") {
      backspace();
      return;
    }
    if (event.key === " ") {
      event.preventDefault();
      space();
      return;
    }
    if (isPrintableKey(event)) typeChar(event.key);
  }

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
      <div className="max-h-[150px] overflow-hidden text-3xl leading-[1.4] md:max-h-[180px] md:text-4xl">
        <div
          ref={containerRef}
          className="flex flex-wrap transition-transform duration-150"
          style={{ transform: `translateY(-${offset}px)` }}
        >
          {words.map((word, index) => (
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
