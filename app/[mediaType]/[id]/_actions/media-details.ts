"use server";

import type { MediaType } from "@/lib/tmdb-client";
import type { MediaDetails } from "@/lib/types/media-details";
import { getMovieDetails } from "./movie-details";
import { getTvDetails } from "./tv-details";

export async function getMediaDetails(
  mediaType: MediaType,
  id: number,
): Promise<MediaDetails> {
  if (mediaType === "movie") return getMovieDetails(id);
  return getTvDetails(id);
}
