"use client";

import { useTestStore, useTestResult } from "@/test";

import { ResultsGraph } from "./ResultsGraph";

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="text-xs uppercase text-muted-foreground">{label}</div>
      <div className="text-3xl font-semibold text-foreground">{value}</div>
    </div>
  );
}

export function ResultsPanel() {
  const status = useTestStore((state) => state.status);
  const config = useTestStore((state) => state.config);
  const setConfig = useTestStore((state) => state.setConfig);
  const { wpm, rawWpm, accuracy, samples } = useTestResult();

  if (status !== "finished") return null;

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <StatTile label="wpm" value={wpm} />
        <StatTile label="raw wpm" value={rawWpm} />
        <StatTile label="accuracy" value={`${accuracy}%`} />
      </div>
      <div className="w-full">
        <ResultsGraph samples={samples} />
      </div>
      <button
        type="button"
        onClick={() => setConfig(config)}
        className="cursor-pointer rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform duration-150 hover:scale-[1.03] hover:opacity-90 active:scale-95"
      >
        Restart
      </button>
    </div>
  );
}
