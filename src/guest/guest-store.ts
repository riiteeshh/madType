import { create } from "zustand";

import { generateGuestName } from "./generate-guest-name";
import { GUEST_NICKNAME_STORAGE_KEY } from "./guest-constants";

type GuestState = {
  nickname: string | null;
  hydrate: () => void;
  setNickname: (nickname: string) => void;
};

export const useGuestStore = create<GuestState>((set) => ({
  nickname: null,
  hydrate: () => {
    const stored = localStorage.getItem(GUEST_NICKNAME_STORAGE_KEY);
    const nickname = stored ?? generateGuestName();
    if (!stored) localStorage.setItem(GUEST_NICKNAME_STORAGE_KEY, nickname);
    set({ nickname });
  },
  setNickname: (nickname: string) => {
    const trimmed = nickname.trim().slice(0, 20);
    if (!trimmed) return;
    localStorage.setItem(GUEST_NICKNAME_STORAGE_KEY, trimmed);
    set({ nickname: trimmed });
  },
}));
