import { create } from "zustand";
import type PusherJs from "pusher-js";
import type { PresenceChannel } from "pusher-js";

import { generateText, type TestConfig, DEFAULT_TEST_CONFIG } from "@/typing-engine";

import { determineHostId, newRacer } from "./race-members";
import { getPusherClient } from "./pusher-client";
import {
  QUICK_MATCH_COUNTDOWN_MS,
  QUICK_MATCH_MAX_PLAYERS,
  QUICK_MATCH_MIN_PLAYERS,
  RACE_EVENTS,
  RACE_START_COUNTDOWN_MS,
  type RaceFinishPayload,
  type RaceProgressPayload,
  type RaceStartPayload,
  type RaceStatus,
  type RacerProgress,
} from "./race-types";
import { randomizeQuickMatchConfig } from "./randomize-quick-match-config";

let quickMatchTimer: ReturnType<typeof setTimeout> | null = null;

interface RaceState {
  client: PusherJs | null;
  channel: PresenceChannel | null;
  channelName: string | null;
  isQuickMatch: boolean;
  myId: string | null;
  config: TestConfig;
  status: RaceStatus;
  racers: Record<string, RacerProgress>;
  raceWords: string[];
  raceStartAt: number | null;
  join: (channelName: string, nickname: string, isQuickMatch: boolean) => void;
  leave: () => void;
  isHost: () => boolean;
  setConfig: (config: TestConfig) => void;
  startCountdown: () => void;
  beginRace: () => void;
  extendWords: (moreWords: string[]) => void;
  reportProgress: (progress: number, wpm: number) => void;
  reportFinish: (wpm: number) => void;
}

function memberIds(channel: PresenceChannel): string[] {
  const ids: string[] = [];
  channel.members.each((member: { id: string }) => ids.push(member.id));
  return ids;
}

function racersFromMembers(channel: PresenceChannel): Record<string, RacerProgress> {
  const racers: Record<string, RacerProgress> = {};
  channel.members.each((member: { id: string; info: { nickname: string } }) => {
    racers[member.id] = newRacer(member.id, member.info.nickname);
  });
  return racers;
}

export const useRaceStore = create<RaceState>((set, get) => ({
  client: null,
  channel: null,
  channelName: null,
  isQuickMatch: false,
  myId: null,
  config: DEFAULT_TEST_CONFIG,
  status: "waiting",
  racers: {},
  raceWords: [],
  raceStartAt: null,

  isHost: () => {
    const { channel, myId } = get();
    if (!channel || !myId) return false;
    return determineHostId(memberIds(channel)) === myId;
  },

  join: (channelName, nickname, isQuickMatch) => {
    const client = getPusherClient(nickname);
    const channel = client.subscribe(channelName) as PresenceChannel;

    channel.bind("pusher:subscription_succeeded", () => {
      set({
        channel,
        channelName,
        isQuickMatch,
        myId: channel.members.myID,
        racers: racersFromMembers(channel),
      });
      if (isQuickMatch) maybeScheduleQuickMatch();
    });

    channel.bind("pusher:member_added", () => {
      set({ racers: racersFromMembers(channel) });
      if (isQuickMatch) maybeScheduleQuickMatch();
    });

    channel.bind("pusher:member_removed", () => {
      set({ racers: racersFromMembers(channel) });
    });

    channel.bind(RACE_EVENTS.CONFIG_UPDATE, (config: TestConfig) => {
      set({ config });
    });

    channel.bind(RACE_EVENTS.START, (payload: RaceStartPayload) => {
      set({
        config: payload.config,
        raceWords: payload.words,
        raceStartAt: payload.startAt,
        status: "countdown",
      });
    });

    channel.bind(
      RACE_EVENTS.PROGRESS,
      (payload: RaceProgressPayload, meta?: { user_id: string }) => {
        applyRacerUpdate(set, meta?.user_id, (racer) => ({
          ...racer,
          progress: payload.progress,
          wpm: payload.wpm,
        }));
      },
    );

    channel.bind(
      RACE_EVENTS.FINISH,
      (payload: RaceFinishPayload, meta?: { user_id: string }) => {
        applyRacerUpdate(set, meta?.user_id, (racer) => ({
          ...racer,
          wpm: payload.wpm,
          finishedAt: payload.finishedAt,
        }));
      },
    );
  },

  leave: () => {
    const { client, channelName } = get();
    if (quickMatchTimer) clearTimeout(quickMatchTimer);
    if (client && channelName) client.unsubscribe(channelName);
    set({
      channel: null,
      channelName: null,
      myId: null,
      status: "waiting",
      racers: {},
      raceWords: [],
      raceStartAt: null,
    });
  },

  setConfig: (config) => {
    const { channel } = get();
    set({ config });
    channel?.trigger(RACE_EVENTS.CONFIG_UPDATE, config);
  },

  startCountdown: () => {
    const { channel, config, isQuickMatch } = get();
    if (!channel) return;
    const finalConfig = isQuickMatch ? randomizeQuickMatchConfig() : config;
    const payload: RaceStartPayload = {
      config: finalConfig,
      words: generateText(finalConfig),
      startAt: Date.now() + RACE_START_COUNTDOWN_MS,
    };
    channel.trigger(RACE_EVENTS.START, payload);
    set({
      config: payload.config,
      raceWords: payload.words,
      raceStartAt: payload.startAt,
      status: "countdown",
    });
  },

  beginRace: () => {
    if (get().status === "countdown") set({ status: "running" });
  },

  extendWords: (moreWords) => {
    set({ raceWords: [...get().raceWords, ...moreWords] });
  },

  reportProgress: (progress, wpm) => {
    const { channel, myId } = get();
    if (!channel || !myId) return;
    channel.trigger(RACE_EVENTS.PROGRESS, { progress, wpm });
    applyRacerUpdate(set, myId, (racer) => ({ ...racer, progress, wpm }));
  },

  reportFinish: (wpm) => {
    const { channel, myId } = get();
    if (!channel || !myId) return;
    const finishedAt = Date.now();
    channel.trigger(RACE_EVENTS.FINISH, { wpm, finishedAt });
    applyRacerUpdate(set, myId, (racer) => ({ ...racer, wpm, finishedAt }));
    set({ status: "finished" });
  },
}));

function applyRacerUpdate(
  set: (partial: Partial<RaceState>) => void,
  memberId: string | undefined,
  update: (racer: RacerProgress) => RacerProgress,
) {
  if (!memberId) return;
  const state = useRaceStore.getState();
  const racer = state.racers[memberId];
  if (!racer) return;
  set({ racers: { ...state.racers, [memberId]: update(racer) } });
}

function maybeScheduleQuickMatch() {
  const state = useRaceStore.getState();
  if (!state.isHost() || state.status !== "waiting") return;
  const count = Object.keys(state.racers).length;

  if (count >= QUICK_MATCH_MAX_PLAYERS) {
    if (quickMatchTimer) clearTimeout(quickMatchTimer);
    state.startCountdown();
    return;
  }
  if (count >= QUICK_MATCH_MIN_PLAYERS && !quickMatchTimer) {
    quickMatchTimer = setTimeout(() => {
      quickMatchTimer = null;
      useRaceStore.getState().startCountdown();
    }, QUICK_MATCH_COUNTDOWN_MS);
  }
}
