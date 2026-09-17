import { useEffect } from "react";

import { useRaceStore } from "./race-store";
import { useRaceTypingStore } from "./race-typing-store";

export function useRaceTimeLimit() {
  const status = useRaceStore((state) => state.status);
  const config = useRaceStore((state) => state.config);
  const raceStartAt = useRaceStore((state) => state.raceStartAt);
  const reportFinish = useRaceStore((state) => state.reportFinish);
  const finishOnTimeUp = useRaceTypingStore((state) => state.finishOnTimeUp);

  useEffect(() => {
    if (status !== "running" || config.mode !== "time" || raceStartAt === null) {
      return;
    }
    const remainingMs = raceStartAt + config.durationSeconds * 1000 - Date.now();
    const timeout = setTimeout(
      () => finishOnTimeUp(reportFinish),
      Math.max(remainingMs, 0),
    );
    return () => clearTimeout(timeout);
  }, [status, config, raceStartAt, finishOnTimeUp, reportFinish]);
}
