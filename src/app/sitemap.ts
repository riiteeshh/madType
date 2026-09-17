import type { MetadataRoute } from "next";

import { SITE_URL } from "./site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/multiplayer", "/quick-match"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
