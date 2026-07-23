import { getMediaDetails } from "@/app/[mediaType]/[id]/_actions/media-details";
import { MediaDetailView } from "@/app/[mediaType]/[id]/_components/MediaDetailView";
import { TmdbNotFoundError } from "@/lib/tmdb-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mediaType: string; id: string }>;
}): Promise<Metadata> {
  const { mediaType: rawMediaType, id } = await params;
  if (rawMediaType !== "movie" && rawMediaType !== "tv") {
    return { title: "Not Found" };
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return { title: "Not Found" };

  try {
    const media = await getMediaDetails(rawMediaType, numericId);
    return {
      title: media.title,
      description: media.description ?? undefined,
    };
  } catch (error) {
    if (error instanceof TmdbNotFoundError) return { title: "Not Found" };
    throw error;
  }
}

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ mediaType: string; id: string }>;
}) {
  const { mediaType: rawMediaType, id } = await params;

  if (rawMediaType !== "movie" && rawMediaType !== "tv") {
    notFound();
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    notFound();
  }

  let media;
  try {
    media = await getMediaDetails(rawMediaType, numericId);
  } catch (error) {
    if (error instanceof TmdbNotFoundError) {
      notFound();
    }
    throw error;
  }

  return <MediaDetailView media={media} />;
}
