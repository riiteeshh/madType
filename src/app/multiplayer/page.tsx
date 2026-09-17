import type { Metadata } from "next";

import { MultiplayerHub } from "@/race";

export const metadata: Metadata = {
  title: "Multiplayer Typing Races",
  description:
    "Race friends in a private room or jump into a public quick-match — real-time multiplayer typing races, no account required.",
  alternates: { canonical: "/multiplayer" },
};

export default function MultiplayerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-6 py-12 md:px-12">
      <h1 className="sr-only">Multiplayer typing races</h1>
      <MultiplayerHub />
    </div>
  );
}
