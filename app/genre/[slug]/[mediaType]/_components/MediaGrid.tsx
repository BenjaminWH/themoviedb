"use client";

import { discoverByGenre } from "@/app/_actions/discover-by-genre";
import { MediaCard } from "@/app/_components/MediaCard";
import type { MediaType } from "@/lib/tmdb-client";
import type { MediaSummary } from "@/lib/types/media";
import { useCallback, useEffect, useRef, useState } from "react";

export function MediaGrid({
  initialItems,
  mediaType,
  genreId,
  initialPage,
  totalPages,
}: {
  initialItems: MediaSummary[];
  mediaType: MediaType;
  genreId: number;
  initialPage: number;
  totalPages: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(initialPage);
  const [totalPagesState, setTotalPagesState] = useState(totalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || page >= totalPagesState) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const data = await discoverByGenre({
        mediaType,
        genreId,
        page: nextPage,
      });
      setTotalPagesState(data.totalPages);

      setItems((prev) => {
        const existingIds = new Set(prev.map((m) => `${m.mediaType}-${m.id}`));
        const newItems = data.results.filter(
          (m) => !existingIds.has(`${m.mediaType}-${m.id}`),
        );
        return [...prev, ...newItems];
      });

      setPage(nextPage);
    } catch {
      setError("Couldn't load more right now.");
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [page, totalPagesState, mediaType, genreId]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const hasMore = page < totalPagesState;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((media, index) => (
          <MediaCard
            key={`${media.mediaType}-${media.id}`}
            media={media}
            priority={index < 6}
          />
        ))}
      </div>

      {hasMore && (
        <div
          ref={sentinelRef}
          className="mt-8 flex min-h-12 items-center justify-center"
          aria-live="polite"
        >
          {isLoading && (
            <span className="text-sm text-zinc-400">Loading more…</span>
          )}
          {error && (
            <button
              type="button"
              onClick={loadMore}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-zinc-800 hover:text-white"
            >
              {error} Retry
            </button>
          )}
        </div>
      )}
    </>
  );
}
