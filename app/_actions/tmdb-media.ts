import type { MediaType } from "@/lib/tmdb-client";
import type { MediaSummary } from "@/lib/types/media";
import { z } from "zod";

export const tmdbResultSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  vote_average: z.number(),
  popularity: z.number(),
});
export type TmdbResult = z.infer<typeof tmdbResultSchema>;

export const tmdbDiscoverResponseSchema = z.object({
  page: z.number(),
  results: z.array(tmdbResultSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export function toMediaSummary(
  mediaType: MediaType,
  result: TmdbResult,
): MediaSummary {
  const date = result.release_date ?? result.first_air_date;
  return {
    id: result.id,
    mediaType,
    title: result.title ?? result.name ?? "",
    posterPath: result.poster_path,
    year: date ? date.slice(0, 4) : null,
    voteAverage: result.vote_average,
    popularity: result.popularity,
  };
}
