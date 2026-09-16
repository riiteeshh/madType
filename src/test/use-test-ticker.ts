import { useEffect } from "react";

import { useTestStore } from "./test-store";

const TICK_INTERVAL_MS = 1000;

export function useTestTicker() {
  const status = useTestStore((state) => state.status);
  const tick = useTestStore((state) => state.tick);

  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(tick, TICK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [status, tick]);
}
