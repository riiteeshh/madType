import { MultiplayerHub } from "@/race";

export default function MultiplayerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-6 py-12 md:px-12">
      <MultiplayerHub />
    </div>
  );
}
