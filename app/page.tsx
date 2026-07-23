import { discoverByGenre } from "@/app/_actions/discover-by-genre";
import {
  GenreSlider,
  type GenreSectionData,
} from "@/app/_components/GenreSlider";
import { GENRES, type GenreConfig } from "@/lib/genres";
import { mergeAndSortByPopularity } from "@/lib/utils";

async function loadGenreSectionData(
  genre: GenreConfig,
): Promise<GenreSectionData> {
  const [movies, series] = await Promise.all([
    discoverByGenre({
      mediaType: "movie",
      genreId: genre.movieGenreId,
      page: 1,
    }),
    genre.tvGenreId
      ? discoverByGenre({ mediaType: "tv", genreId: genre.tvGenreId, page: 1 })
      : Promise.resolve(null),
  ]);

  return {
    genre,
    totalCount: movies.totalResults + (series?.totalResults ?? 0),
    firstPageItems: mergeAndSortByPopularity(
      movies.results,
      series?.results ?? [],
    ),
    moviePage: {
      genreId: genre.movieGenreId,
      page: movies.page,
      totalPages: movies.totalPages,
    },
    tvPage:
      genre.tvGenreId && series
        ? {
            genreId: genre.tvGenreId,
            page: series.page,
            totalPages: series.totalPages,
          }
        : undefined,
  };
}

export default async function page() {
  const feeds = await Promise.all(GENRES.map(loadGenreSectionData));

  return (
    <main className="mx-auto max-w-400 space-y-10 px-4 py-8 sm:px-8 sm:py-12">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Browse by Genre
        </h1>
        <p className="text-zinc-400">
          Popular movies and series across every genre, powered by TMDB.
        </p>
      </header>

      {feeds.map((feed, index) => (
        <GenreSlider
          key={feed.genre.slug}
          feed={feed}
          priorityFirstImage={index === 0}
        />
      ))}
    </main>
  );
}
