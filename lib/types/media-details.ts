import type { MediaType } from "@/lib/tmdb-client";

export type MediaDetails = {
  id: number;
  mediaType: MediaType;
  title: string;
  description: string | null;
  year: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  genres: { id: number; name: string }[];
  status: string;
  voteAverage: number;
  runtime: number | undefined;
  cast: CastMember[];
  directors: CrewMember[];
  trailerKey: string | null;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  profilePath: string | null;
};

export type Video = {
  key: string;
  site: string;
  type: string;
};
