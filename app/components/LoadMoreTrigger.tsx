"use client";

import { loadMoreByGenre } from "@/app/actions/discover";
import { MediaCard } from "@/app/components/MediaCard";
import type { MediaSummary, PageCursor } from "@/lib/types/media";
import { useState, useTransition } from "react";

export function LoadMoreTrigger({
  moviePage,
  tvPage,
}: {
  moviePage: PageCursor;
  tvPage?: PageCursor;
}) {
  const [items, setItems] = useState<MediaSummary[]>([]);
  const [movie, setMovie] = useState(moviePage);
  const [tv, setTv] = useState(tvPage);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const hasMore =
    movie.page < movie.totalPages || (tv ? tv.page < tv.totalPages : false);

  function loadMore() {
    setError(null);
    startTransition(async () => {
      try {
        const result = await loadMoreByGenre({ moviePage: movie, tvPage: tv });
        setItems((prev) => [...prev, ...result.items]);
        setMovie(result.moviePage);
        setTv(result.tvPage);
      } catch {
        setError("Couldn't load more right now.");
      }
    });
  }

  return (
    <>
      {items.map((media) => (
        <MediaCard key={`${media.mediaType}-${media.id}`} media={media} />
      ))}
      {hasMore && (
        <div className="w-[150px] shrink-0 sm:w-[170px]">
          <button
            type="button"
            onClick={loadMore}
            disabled={isPending}
            className="flex aspect-[2/3] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-700 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white disabled:opacity-50"
          >
            {isPending ? "Loading…" : error ? "Retry" : "Load more"}
          </button>
          {/* Hidden spacer so the tile matches a real card's total height. */}
          <p
            aria-hidden
            className="invisible mt-2 line-clamp-2 text-sm font-medium"
          >
            Placeholder movie title text
          </p>
          <p aria-hidden className="invisible text-xs">
            0000
          </p>
        </div>
      )}
    </>
  );
}
