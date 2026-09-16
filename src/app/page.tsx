"use client";

import { ResultsPanel } from "@/results";
import { LiveStats, TestConfigBar, TypingArea, useTestStore } from "@/test";

export default function PracticePage() {
  const status = useTestStore((state) => state.status);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-10 px-6 pt-10 pb-12 md:px-12">
      {status !== "finished" && <TestConfigBar />}
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
        <LiveStats />
        {status === "finished" ? <ResultsPanel /> : <TypingArea />}
      </div>
    </div>
  );
}
