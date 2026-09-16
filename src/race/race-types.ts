import type { TestConfig } from "@/typing-engine";

export type RaceStatus = "waiting" | "countdown" | "running" | "finished";

export interface RacerProgress {
  memberId: string;
  nickname: string;
  progress: number;
  wpm: number;
  finishedAt: number | null;
}

export interface RaceStartPayload {
  config: TestConfig;
  words: string[];
  startAt: number;
}

export interface RaceProgressPayload {
  progress: number;
  wpm: number;
}

export interface RaceFinishPayload {
  wpm: number;
  finishedAt: number;
}

export const RACE_EVENTS = {
  CONFIG_UPDATE: "client-config-update",
  START: "client-start",
  PROGRESS: "client-progress",
  FINISH: "client-finish",
} as const;

export const QUICK_MATCH_CHANNEL = "presence-quickmatch";
export const QUICK_MATCH_MIN_PLAYERS = 2;
export const QUICK_MATCH_MAX_PLAYERS = 5;
export const QUICK_MATCH_COUNTDOWN_MS = 15_000;
export const RACE_START_COUNTDOWN_MS = 5_000;

export function roomChannelName(code: string): string {
  return `presence-room-${code}`;
}
