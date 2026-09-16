import Link from "next/link";

import { NicknameEditor } from "@/guest";
import { ThemeToggle } from "@/theme";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-semibold text-foreground">
          madtyper
        </Link>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            practice
          </Link>
          <Link href="/multiplayer" className="hover:text-foreground">
            multiplayer
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <NicknameEditor />
        <ThemeToggle />
      </div>
    </header>
  );
}
