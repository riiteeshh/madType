import { useEffect, useState } from "react";

export function useRaceCountdown(startAt: number | null): number | null {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (startAt === null) return;
    const interval = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(interval);
  }, [startAt]);

  if (startAt === null) return null;
  return Math.max(0, Math.ceil((startAt - now) / 1000));
}
