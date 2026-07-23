import type { CastMember, CrewMember, Video } from "@/lib/types/media-details";
import { z } from "zod";

export const creditsSchema = z.object({
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      character: z.string(),
      profile_path: z.string().nullable(),
    }),
  ),
  crew: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      job: z.string(),
      profile_path: z.string().nullable(),
    }),
  ),
});

export const videosSchema = z.object({
  results: z.array(
    z.object({
      key: z.string(),
      site: z.string(),
      type: z.string(),
    }),
  ),
});

export function toCastMembers(
  cast: z.infer<typeof creditsSchema>["cast"],
): CastMember[] {
  return cast.map((member) => ({
    id: member.id,
    name: member.name,
    character: member.character,
    profilePath: member.profile_path,
  }));
}

export function toCrewMembers(
  crew: z.infer<typeof creditsSchema>["crew"],
): CrewMember[] {
  return crew.map((member) => ({
    id: member.id,
    name: member.name,
    job: member.job,
    profilePath: member.profile_path,
  }));
}

export function getTrailerKey(videos: { results: Video[] }): string | null {
  const trailer =
    videos.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ??
    videos.results.find(
      (video) => video.site === "YouTube" && video.type === "Teaser",
    );
  return trailer?.key ?? null;
}
