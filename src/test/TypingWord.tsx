interface TypingWordProps {
  target: string;
  typed: string;
  isActive: boolean;
}

function charClassName(target: string, typed: string, index: number): string {
  if (index >= typed.length) return "text-muted-foreground opacity-60";
  return typed[index] === target[index] ? "text-foreground" : "text-destructive underline";
}

export function TypingWord({ target, typed, isActive }: TypingWordProps) {
  const overflow = typed.slice(target.length);

  return (
    <span className="relative mr-3 inline-block">
      {target.split("").map((char, index) => (
        <span key={index} className={charClassName(target, typed, index)}>
          {isActive && index === typed.length && (
            <span className="absolute top-1/2 -ml-px h-[1em] w-0.5 -translate-y-1/2 animate-pulse bg-brand" />
          )}
          {char}
        </span>
      ))}
      {overflow && <span className="text-destructive">{overflow}</span>}
    </span>
  );
}
