const MIN_CLAUSE_LENGTH = 6;
const MAX_CLAUSE_LENGTH = 12;
const COMMA_WEIGHT = 0.7;

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function randomClauseLength(): number {
  const span = MAX_CLAUSE_LENGTH - MIN_CLAUSE_LENGTH;
  return MIN_CLAUSE_LENGTH + Math.floor(Math.random() * span);
}

export function applyPunctuation(words: string[]): string[] {
  const result = [...words];
  let sentenceStart = true;
  let sinceTerminator = 0;
  const clauseLength = randomClauseLength();

  for (let i = 0; i < result.length; i += 1) {
    if (sentenceStart) result[i] = capitalize(result[i]);
    sentenceStart = false;
    sinceTerminator += 1;

    const isLastWord = i === result.length - 1;
    if (isLastWord) {
      result[i] += ".";
      continue;
    }

    if (sinceTerminator >= clauseLength) {
      result[i] += Math.random() < COMMA_WEIGHT ? "," : ".";
      sentenceStart = result[i].endsWith(".");
      sinceTerminator = 0;
    }
  }

  return result;
}
