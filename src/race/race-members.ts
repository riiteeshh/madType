import type { RacerProgress } from "./race-types";

export function determineHostId(memberIds: string[]): string | null {
  if (memberIds.length === 0) return null;
  return [...memberIds].sort()[0];
}

export function newRacer(id: string, nickname: string): RacerProgress {
  return { memberId: id, nickname, progress: 0, wpm: 0, finishedAt: null };
}
