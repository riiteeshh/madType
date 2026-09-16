"use client";

import { QUICK_MATCH_CHANNEL, RaceView } from "@/race";

export default function QuickMatchPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-6 py-12 md:px-12">
      <RaceView channelName={QUICK_MATCH_CHANNEL} isQuickMatch />
    </div>
  );
}
