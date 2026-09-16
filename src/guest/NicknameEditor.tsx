"use client";

import { useEffect } from "react";

import { useGuestStore } from "./guest-store";

export function NicknameEditor() {
  const { nickname, hydrate, setNickname } = useGuestStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (nickname === null) {
    return <div className="h-9 w-32 animate-pulse rounded-md bg-secondary" />;
  }

  return (
    <input
      key={nickname}
      defaultValue={nickname}
      onBlur={(event) => setNickname(event.target.value)}
      maxLength={20}
      aria-label="Your nickname"
      className="h-9 w-32 rounded-md border border-border bg-secondary px-2 text-sm text-secondary-foreground outline-none focus:border-ring sm:w-40"
    />
  );
}
