export function RacerIcon({ racing }: { racing: boolean }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`size-6 ${racing ? "[animation:bob_0.5s_ease-in-out_infinite]" : ""}`}
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="6" rx="3" fill="var(--brand)" />
      <rect x="6" y="2" width="10" height="6" rx="2" fill="var(--brand)" />
      <circle cx="7" cy="13" r="3" fill="var(--foreground)" />
      <circle cx="17" cy="13" r="3" fill="var(--foreground)" />
    </svg>
  );
}
