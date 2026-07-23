import { WishlistButton } from "@/app/_components/WishlistButton";
import { getGenreLink } from "@/lib/genres";
import { backdropUrl, posterUrl } from "@/lib/tmdb-client";
import type { MediaDetails } from "@/lib/types/media-details";
import { formatRuntime } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CastSlider } from "./CastSlider";
import { YouTubePlayer } from "./YouTubePlayer";

export function MediaDetailView({ media }: { media: MediaDetails }) {
  const backgroundUrl = backdropUrl(media.backdropPath, "original");
  const coverUrl = posterUrl(media.posterPath, "w500");
  const runtime = formatRuntime(media.runtime);

  return (
    <div className="relative min-h-screen">
      {backgroundUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundUrl})`, opacity: 0.25 }}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />

      <main className="relative z-10 mx-auto min-h-screen max-w-400 px-4 py-8 sm:px-8 sm:py-12">
        <div className="space-y-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            ← Back to browse
          </Link>

          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
            {coverUrl && (
              <div className="shrink-0">
                <div className="relative aspect-2/3 w-50 overflow-hidden rounded-lg bg-zinc-800 shadow-2xl ring-1 ring-white/10 sm:w-65">
                  <Image
                    src={coverUrl}
                    alt={media.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 200px, 260px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {media.title}
                  </h1>
                  <WishlistButton media={media} variant="full" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-300 lg:justify-start">
                  {media.year && <span>{media.year}</span>}
                  {runtime && <span>{runtime}</span>}
                  {media.voteAverage > 0 && (
                    <span className="inline-flex items-center gap-1">
                      {media.voteAverage.toFixed(1)}
                      <Star
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                        focusable="false"
                      />
                    </span>
                  )}
                  {media.status && (
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-200 ring-1 ring-white/10">
                      {media.status}
                    </span>
                  )}
                </div>

                {media.genres.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {media.genres.map((genre) => {
                      const href = getGenreLink(genre.id, media.mediaType);
                      const pill = (
                        <span
                          key={genre.id}
                          className="inline-flex rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/10"
                        >
                          {genre.name}
                        </span>
                      );
                      return href ? (
                        <Link
                          key={genre.id}
                          href={href}
                          className="inline-flex rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        >
                          {genre.name}
                        </Link>
                      ) : (
                        pill
                      );
                    })}
                  </div>
                )}
              </div>

              {media.description && (
                <p className="max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  {media.description}
                </p>
              )}
            </div>
          </div>

          <CastSlider cast={media.cast} directors={media.directors} />

          {media.trailerKey && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Trailer
              </h2>
              <YouTubePlayer videoKey={media.trailerKey} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
