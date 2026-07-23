"use server";

import { tmdbFetch, type MediaType } from "@/lib/tmdb-client";
import type { MediaPage } from "@/lib/types/media";
import { tmdbDiscoverResponseSchema, toMediaSummary } from "@/app/_actions/tmdb-media";

export async function discoverByGenre({
  mediaType,
  genreId,
  page = 1,
}: {
  mediaType: MediaType;
  genreId: number;
  page?: number;
}): Promise<MediaPage> {
  const data = await tmdbFetch(
    `/discover/${mediaType}`,
    tmdbDiscoverResponseSchema,
    { with_genres: genreId, page, sort_by: "popularity.desc" },
    3600
  );

  return {
    results: data.results.map((result) => toMediaSummary(mediaType, result)),
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}
