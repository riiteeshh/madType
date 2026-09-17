import type { Metadata } from "next";

import { RaceView, roomChannelName } from "@/race";

export const metadata: Metadata = {
  title: "Private Room",
  robots: { index: false, follow: false },
};

export default async function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-6 py-12 md:px-12">
      <h1 className="sr-only">Private typing race room</h1>
      <RaceView channelName={roomChannelName(code)} isQuickMatch={false} roomCode={code} />
    </div>
  );
}
