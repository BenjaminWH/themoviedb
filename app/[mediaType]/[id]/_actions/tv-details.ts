import { tmdbFetch } from "@/lib/tmdb-client";
import type { CrewMember, MediaDetails } from "@/lib/types/media-details";
import { z } from "zod";
import {
  creditsSchema,
  getTrailerKey,
  toCastMembers,
  toCrewMembers,
  videosSchema,
} from "./media-schemas";

const tvDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string().nullable(),
  first_air_date: z.string().optional(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  status: z.string(),
  vote_average: z.number(),
  episode_run_time: z.array(z.number()).optional(),
  created_by: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        profile_path: z.string().nullable(),
      }),
    )
    .optional(),
  credits: creditsSchema,
  videos: videosSchema,
});

export async function getTvDetails(id: number): Promise<MediaDetails> {
  const data = await tmdbFetch(
    `/tv/${id}`,
    tvDetailsSchema,
    { append_to_response: "credits,videos" },
    3600,
  );

  const creators: CrewMember[] =
    data.created_by?.map((creator) => ({
      id: creator.id,
      name: creator.name,
      job: "Creator",
      profilePath: creator.profile_path,
    })) ?? [];

  const crewDirectors = toCrewMembers(
    data.credits.crew.filter((member) => member.job === "Director"),
  );

  return {
    id: data.id,
    mediaType: "tv",
    title: data.name,
    description: data.overview,
    year: data.first_air_date ? data.first_air_date.slice(0, 4) : null,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    genres: data.genres,
    status: data.status,
    voteAverage: data.vote_average,
    runtime: data.episode_run_time?.[0],
    cast: toCastMembers(data.credits.cast),
    directors: creators.length > 0 ? creators : crewDirectors,
    trailerKey: getTrailerKey(data.videos),
  };
}
