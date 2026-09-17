import type { Metadata } from "next";

import { PracticeClient } from "./PracticeClient";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function PracticePage() {
  return (
    <>
      <h1 className="sr-only">
        MadType — free online typing speed test with real-time multiplayer
        races
      </h1>
      <PracticeClient />
    </>
  );
}
