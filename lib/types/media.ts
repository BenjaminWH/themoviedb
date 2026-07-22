import type { MediaType } from "@/lib/tmdb-client";

export type MediaSummary = {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  year: string | null;
  voteAverage: number;
  popularity: number;
};

export type MediaPage = {
  results: MediaSummary[];
  page: number;
  totalPages: number;
  totalResults: number;
};

export type PageCursor = {
  genreId: number;
  page: number;
  totalPages: number;
};
