/**
 * Low-level TMDB client: base URL, auth, image helpers, and errors.
 * Resource-specific calls live next to the features that use them.
 */
import type { ZodType } from "zod";

const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

const READ_ACCESS_TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN;

export type MediaType = "movie" | "tv";

export class TmdbNotFoundError extends Error {}

export async function tmdbFetch<T>(
  path: string,
  schema: ZodType<T>,
  searchParams: Record<string, string | number | undefined> = {},
  revalidateSeconds = 3600
): Promise<T> {
  if (!READ_ACCESS_TOKEN) {
    throw new Error(
      "Missing TMDB_API_READ_ACCESS_TOKEN environment variable. Add it to .env.local (see .env.example)."
    );
  }

  const url = new URL(`${TMDB_API_BASE}${path}`);
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: revalidateSeconds },
  });

  if (res.status === 404) {
    throw new TmdbNotFoundError(`TMDB resource not found: ${path}`);
  }

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText} (${path})`);
  }

  return schema.parse(await res.json());
}

export function posterUrl(
  path: string | null,
  size: "w185" | "w342" | "w500" = "w342"
): string | undefined {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : undefined;
}

export function backdropUrl(
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280"
): string | undefined {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : undefined;
}
