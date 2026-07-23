"use server";

import { discoverByGenre } from "@/app/_actions/discover-by-genre";
import { mergeAndSortByPopularity } from "@/lib/utils";
import type { MediaSummary, PageCursor } from "@/lib/types/media";

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
