interface TypingWordProps {
  target: string;
  typed: string;
}

function charClassName(target: string, typed: string, index: number): string {
  if (index >= typed.length) return "text-muted-foreground";
  return typed[index] === target[index] ? "text-foreground" : "text-destructive underline";
}

export function TypingWord({ target, typed }: TypingWordProps) {
  const overflow = typed.slice(target.length);

  return (
    <span className="mr-3 inline-block">
      {target.split("").map((char, index) => (
        <span key={index} className={charClassName(target, typed, index)}>
          {char}
        </span>
      ))}
      {overflow && <span className="text-destructive">{overflow}</span>}
    </span>
  );
}
