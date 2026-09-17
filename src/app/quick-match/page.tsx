import type { Metadata } from "next";

import { QuickMatchClient } from "./QuickMatchClient";

export const metadata: Metadata = {
  title: "Quick Match",
  description:
    "Jump into a public typing race — get matched with other players automatically, no room code needed.",
  alternates: { canonical: "/quick-match" },
};

export default function QuickMatchPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-6 py-12 md:px-12">
      <h1 className="sr-only">Quick match typing race</h1>
      <QuickMatchClient />
    </div>
  );
}
