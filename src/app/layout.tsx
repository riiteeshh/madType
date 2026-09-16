import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { NO_FLASH_THEME_SCRIPT } from "@/theme";
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "./SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "madtyper",
  description: "A no-login typing speed test with real-time multiplayer races.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Analytics />
        <Script id="no-flash-theme" strategy="beforeInteractive">
          {NO_FLASH_THEME_SCRIPT}
        </Script>
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
