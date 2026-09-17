import { useEffect, useRef, useState } from "react";

export function useActiveWordScroll(activeIndex: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(
      `[data-word-index="${activeIndex}"]`,
    );
    if (!activeEl) return;
    setOffset(activeEl.offsetTop);
  }, [activeIndex]);

  return { containerRef, offset };
}
