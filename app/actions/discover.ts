"use server";

import { tmdbFetch, type MediaType } from "@/lib/tmdb-client";
import { mergeAndSortByPopularity } from "@/lib/utils";
import type { MediaPage, MediaSummary, PageCursor } from "@/lib/types/media";
import { z } from "zod";

const tmdbResultSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  vote_average: z.number(),
  popularity: z.number(),
});
type TmdbResult = z.infer<typeof tmdbResultSchema>;

const tmdbDiscoverResponseSchema = z.object({
  page: z.number(),
  results: z.array(tmdbResultSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

function toMediaSummary(mediaType: MediaType, result: TmdbResult): MediaSummary {
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

export async function loadMoreByGenre({
  moviePage,
  tvPage,
}: {
  moviePage: PageCursor;
  tvPage?: PageCursor;
}): Promise<{
  items: MediaSummary[];
  moviePage: PageCursor;
  tvPage?: PageCursor;
}> {
  const movieHasMore = moviePage.page < moviePage.totalPages;
  const tvHasMore = tvPage ? tvPage.page < tvPage.totalPages : false;

  const [movieResult, tvResult] = await Promise.all([
    movieHasMore
      ? discoverByGenre({
          mediaType: "movie",
          genreId: moviePage.genreId,
          page: moviePage.page + 1,
        })
      : null,
    tvHasMore && tvPage
      ? discoverByGenre({ mediaType: "tv", genreId: tvPage.genreId, page: tvPage.page + 1 })
      : null,
  ]);

  return {
    items: mergeAndSortByPopularity(movieResult?.results ?? [], tvResult?.results ?? []),
    moviePage: movieResult ? { ...moviePage, page: movieResult.page } : moviePage,
    tvPage: tvResult && tvPage ? { ...tvPage, page: tvResult.page } : tvPage,
  };
}
