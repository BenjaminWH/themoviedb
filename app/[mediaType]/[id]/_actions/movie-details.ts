import { tmdbFetch } from "@/lib/tmdb-client";
import type { MediaDetails } from "@/lib/types/media-details";
import { z } from "zod";
import {
  creditsSchema,
  getTrailerKey,
  toCastMembers,
  toCrewMembers,
  videosSchema,
} from "./media-schemas";

const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().nullable(),
  release_date: z.string().optional(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  status: z.string(),
  vote_average: z.number(),
  runtime: z.number().nullable().optional(),
  credits: creditsSchema,
  videos: videosSchema,
});

export async function getMovieDetails(id: number): Promise<MediaDetails> {
  const data = await tmdbFetch(
    `/movie/${id}`,
    movieDetailsSchema,
    { append_to_response: "credits,videos" },
    3600,
  );

  return {
    id: data.id,
    mediaType: "movie",
    title: data.title,
    description: data.overview,
    year: data.release_date ? data.release_date.slice(0, 4) : null,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    genres: data.genres,
    status: data.status,
    voteAverage: data.vote_average,
    runtime: data.runtime ?? undefined,
    cast: toCastMembers(data.credits.cast),
    directors: toCrewMembers(
      data.credits.crew.filter((member) => member.job === "Director"),
    ),
    trailerKey: getTrailerKey(data.videos),
  };
}
