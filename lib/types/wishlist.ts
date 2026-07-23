import type { MediaType } from "@/lib/tmdb-client";

export type WishlistItem = {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  year: string | null;
};
