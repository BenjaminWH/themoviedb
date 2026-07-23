import { posterUrl } from "@/lib/tmdb-client";
import type { MediaSummary } from "@/lib/types/media";
import Image from "next/image";
import Link from "next/link";

export function MediaCard({
  media,
  priority = false,
  className = "w-37.5 shrink-0 snap-start sm:w-42.5",
}: {
  media: MediaSummary;
  priority?: boolean;
  className?: string;
}) {
  const href =
    media.mediaType === "movie" ? `/movie/${media.id}` : `/tv/${media.id}`;
  const src = posterUrl(media.posterPath, "w342");

  return (
    <Link
      href={href}
      draggable={false}
      className={`group ${className}`}
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-zinc-800 ring-1 ring-white/10 transition group-hover:ring-white/30">
        <span className="absolute top-2 left-2 z-10 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-200 uppercase">
          {media.mediaType === "movie" ? "Movie" : "Series"}
        </span>
        {src ? (
          <Image
            src={src}
            alt={media.title}
            fill
            draggable={false}
            priority={priority}
            sizes="(max-width: 640px) 150px, 170px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-zinc-400">
            No poster available
          </div>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-medium text-zinc-100">
        {media.title}
      </p>
      {media.year && <p className="text-xs text-zinc-500">{media.year}</p>}
    </Link>
  );
}
