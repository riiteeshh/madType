const NUMBER_PROBABILITY = 0.15;

function randomNumberToken(): string {
  const digits = 1 + Math.floor(Math.random() * 3);
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return String(min + Math.floor(Math.random() * (max - min + 1)));
}

export function applyNumbers(words: string[]): string[] {
  return words.map((word) =>
    Math.random() < NUMBER_PROBABILITY ? randomNumberToken() : word,
  );
}
