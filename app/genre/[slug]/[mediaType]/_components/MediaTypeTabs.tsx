"use client";

import Link from "next/link";
import type { MediaType } from "@/lib/tmdb-client";

export function MediaTypeTabs({
  slug,
  active,
  hasTv,
}: {
  slug: string;
  active: MediaType;
  hasTv: boolean;
}) {
  const tabs: { key: MediaType; label: string }[] = [{ key: "movie", label: "Movies" }];
  if (hasTv) {
    tabs.push({ key: "tv", label: "TV Series" });
  }

  return (
    <nav aria-label="Media type" className="inline-flex rounded-lg bg-zinc-900 p-1 ring-1 ring-white/10">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={`/genre/${slug}/${tab.key}`}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-zinc-800 text-white shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
