const CHARS_PER_WORD = 5;
const MS_PER_MINUTE = 60_000;

function charsPerMinute(chars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / MS_PER_MINUTE;
  return chars / CHARS_PER_WORD / minutes;
}

export function calculateWpm(correctChars: number, elapsedMs: number): number {
  return Math.round(charsPerMinute(correctChars, elapsedMs));
}

export function calculateRawWpm(
  totalTypedChars: number,
  elapsedMs: number,
): number {
  return Math.round(charsPerMinute(totalTypedChars, elapsedMs));
}

export function calculateAccuracy(
  correctKeystrokes: number,
  totalKeystrokes: number,
): number {
  if (totalKeystrokes <= 0) return 100;
  return Math.round((correctKeystrokes / totalKeystrokes) * 100);
}
