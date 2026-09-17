import { SITE_DESCRIPTION, SITE_NAME } from "./site-metadata";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8 text-sm text-muted-foreground">
      <p className="mx-auto max-w-3xl text-center">
        <span className="font-medium text-foreground">{SITE_NAME}</span> —{" "}
        {SITE_DESCRIPTION}
      </p>
    </footer>
  );
}
