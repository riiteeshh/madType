import { GUEST_NAME_ADJECTIVES, GUEST_NAME_NOUNS } from "./guest-constants";

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateGuestName(): string {
  const adjective = pickRandom(GUEST_NAME_ADJECTIVES);
  const noun = pickRandom(GUEST_NAME_NOUNS);
  const suffix = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${suffix}`;
}
