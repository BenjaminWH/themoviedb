import type { MediaType } from "@/lib/tmdb-client";

export type GenreConfig = {
  /** URL-safe identifier used in /genre/[slug]/[mediaType] links */
  slug: string;
  title: string;
  movieGenreId: number;
  /** Only set when TMDB has a matching TV genre for this title */
  tvGenreId?: number;
};

/**
 * Hardcoded TMDB genre IDs. Not every movie genre has a TV equivalent
 * (Thriller, Romance, and Horror are movies-only).
 */
export const GENRES: GenreConfig[] = [
  { slug: "action", title: "Action", movieGenreId: 28, tvGenreId: 10759 },
  { slug: "comedy", title: "Comedy", movieGenreId: 35, tvGenreId: 35 },
  { slug: "thriller", title: "Thriller", movieGenreId: 53 },
  { slug: "war", title: "War", movieGenreId: 10752, tvGenreId: 10768 },
  { slug: "romance", title: "Romance", movieGenreId: 10749 },
  { slug: "drama", title: "Drama", movieGenreId: 18, tvGenreId: 18 },
  { slug: "crime", title: "Crime", movieGenreId: 80, tvGenreId: 80 },
  { slug: "documentary", title: "Documentary", movieGenreId: 99, tvGenreId: 99 },
  { slug: "horror", title: "Horror", movieGenreId: 27 },
];

export function getGenreBySlug(slug: string): GenreConfig | undefined {
  return GENRES.find((genre) => genre.slug === slug);
}

/** Reverse lookup: given a TMDB genre ID and media type, find the matching
 * /genre/[slug]/[mediaType] link, or null if there's no genre page for it. */
export function getGenreLink(
  genreId: number,
  mediaType: MediaType,
): string | null {
  const genre = GENRES.find(
    (g) => g.movieGenreId === genreId || g.tvGenreId === genreId,
  );
  if (!genre) return null;
  if (mediaType === "tv") {
    return genre.tvGenreId === genreId ? `/genre/${genre.slug}/tv` : null;
  }
  return genre.movieGenreId === genreId ? `/genre/${genre.slug}/movie` : null;
}
