const BUFFER_REFILL_THRESHOLD = 20;
const BUFFER_REFILL_SIZE = 100;

export interface CharacterJudgement {
  input: string;
  isCorrect: boolean;
  isFinished: boolean;
}

export function judgeTypedChar(
  targetWord: string,
  currentInput: string,
  char: string,
  isLastWord: boolean,
  mode: "time" | "words",
): CharacterJudgement {
  const expected = targetWord[currentInput.length];
  const input = currentInput + char;
  const isCorrect = char === expected;
  const isFinished =
    mode === "words" && isLastWord && input === targetWord;
  return { input, isCorrect, isFinished };
}

export function shouldRefillBuffer(
  wordCount: number,
  currentWordIndex: number,
): boolean {
  return wordCount - currentWordIndex <= BUFFER_REFILL_THRESHOLD;
}

export { BUFFER_REFILL_SIZE };
