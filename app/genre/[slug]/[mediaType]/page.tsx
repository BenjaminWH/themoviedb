import { discoverByGenre } from "@/app/_actions/discover-by-genre";
import { MediaGrid } from "@/app/genre/[slug]/[mediaType]/_components/MediaGrid";
import { MediaTypeTabs } from "@/app/genre/[slug]/[mediaType]/_components/MediaTypeTabs";
import { getGenreBySlug } from "@/lib/genres";
import type { MediaType } from "@/lib/tmdb-client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; mediaType: string }>;
}): Promise<Metadata> {
  const { slug, mediaType } = await params;
  const genre = getGenreBySlug(slug);
  const label = mediaType === "tv" ? "TV Series" : "Movies";
  return {
    title: genre ? `${genre.title} ${label}` : "Genre",
  };
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ slug: string; mediaType: string }>;
}) {
  const { slug, mediaType: rawMediaType } = await params;

  const genre = getGenreBySlug(slug);
  if (!genre) notFound();

  if (rawMediaType !== "movie" && rawMediaType !== "tv") {
    notFound();
  }
  const mediaType: MediaType = rawMediaType;

  const genreId = mediaType === "movie" ? genre.movieGenreId : genre.tvGenreId;
  if (!genreId) notFound();

  const { results, totalResults, page, totalPages } = await discoverByGenre({
    mediaType,
    genreId,
    page: 1,
  });

  const mediaLabel = mediaType === "tv" ? "TV Series" : "Movies";

  return (
    <main className="mx-auto max-w-400 px-4 py-8 sm:px-8 sm:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm font-medium text-zinc-400 transition hover:text-white"
      >
        ← Back to browse
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {genre.title} {mediaLabel}
          </h1>
          <p className="text-zinc-400">
            {totalResults.toLocaleString()}{" "}
            {mediaType === "tv" ? "TV series" : "movies"}
          </p>
        </div>
        <MediaTypeTabs
          slug={genre.slug}
          active={mediaType}
          hasTv={Boolean(genre.tvGenreId)}
        />
      </div>

      {results.length === 0 ? (
        <p className="text-zinc-400">
          No {mediaLabel.toLowerCase()} found in this genre.
        </p>
      ) : (
        <MediaGrid
          initialItems={results}
          mediaType={mediaType}
          genreId={genreId}
          initialPage={page}
          totalPages={totalPages}
        />
      )}
    </main>
  );
}
