import { RaceView, roomChannelName } from "@/race";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-6 py-12 md:px-12">
      <RaceView channelName={roomChannelName(code)} isQuickMatch={false} roomCode={code} />
    </div>
  );
}
