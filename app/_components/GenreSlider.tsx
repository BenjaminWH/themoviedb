import { MediaRow } from "@/app/_components/MediaRow";
import type { GenreConfig } from "@/lib/genres";
import type { MediaSummary, PageCursor } from "@/lib/types/media";
import Link from "next/link";

export type GenreSectionData = {
  genre: GenreConfig;
  totalCount: number;
  firstPageItems: MediaSummary[];
  moviePage: PageCursor;
  tvPage?: PageCursor;
};

export function GenreSlider({
  feed,
  priorityFirstImage = false,
}: {
  feed: GenreSectionData;
  priorityFirstImage?: boolean;
}) {
  const { genre, totalCount, firstPageItems, moviePage, tvPage } = feed;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {genre.title}
          </h2>
          <span className="text-sm text-zinc-400">
            {totalCount.toLocaleString()} titles
          </span>
        </div>
        <Link
          href={`/genre/${genre.slug}/movie`}
          className="shrink-0 text-sm font-medium text-teal-400 transition hover:text-teal-300"
        >
          View All →
        </Link>
      </div>

      <MediaRow
        firstPageItems={firstPageItems}
        moviePage={moviePage}
        tvPage={tvPage}
        priorityFirstImage={priorityFirstImage}
      />
    </section>
  );
}
