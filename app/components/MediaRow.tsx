import { DragScrollRow } from "@/app/components/DragScrollRow";
import { LoadMoreTrigger } from "@/app/components/LoadMoreTrigger";
import { MediaCard } from "@/app/components/MediaCard";
import type { MediaSummary, PageCursor } from "@/lib/types/media";

export function MediaRow({
  firstPageItems,
  moviePage,
  tvPage,
  priorityFirstImage = false,
}: {
  firstPageItems: MediaSummary[];
  moviePage: PageCursor;
  tvPage?: PageCursor;
  priorityFirstImage?: boolean;
}) {
  if (firstPageItems.length === 0) {
    return null;
  }

  return (
    <DragScrollRow className="flex gap-4 pb-2">
      {firstPageItems.map((media, index) => (
        <MediaCard
          key={`${media.mediaType}-${media.id}`}
          media={media}
          priority={priorityFirstImage && index === 0}
        />
      ))}
      <LoadMoreTrigger moviePage={moviePage} tvPage={tvPage} />
    </DragScrollRow>
  );
}
