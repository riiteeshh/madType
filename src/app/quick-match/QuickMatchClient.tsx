"use client";

import { QUICK_MATCH_CHANNEL, RaceView } from "@/race";

export function QuickMatchClient() {
  return <RaceView channelName={QUICK_MATCH_CHANNEL} isQuickMatch />;
}
