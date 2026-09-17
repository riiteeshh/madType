import type { MetadataRoute } from "next";

import { SITE_URL } from "./site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/room/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: "/room/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
