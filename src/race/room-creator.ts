function storageKey(code: string): string {
  return `madtyper:created:${code}`;
}

export function markRoomCreated(code: string): void {
  sessionStorage.setItem(storageKey(code), "1");
}

export function isRoomCreator(code: string): boolean {
  return sessionStorage.getItem(storageKey(code)) === "1";
}
