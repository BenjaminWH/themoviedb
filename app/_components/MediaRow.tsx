import { LoadMoreTrigger } from "@/app/_components/LoadMoreTrigger";
import { MediaCard } from "@/app/_components/MediaCard";
import type { MediaSummary, PageCursor } from "@/lib/types/media";

export function MediaRow({
  initialMedia,
  moviePage,
  tvPage,
  priorityFirstImage = false,
}: {
  initialMedia: MediaSummary[];
  moviePage: PageCursor;
  tvPage?: PageCursor;
  priorityFirstImage?: boolean;
}) {
  return (
    <>
      {initialMedia.map((media, index) => (
        <MediaCard
          key={`${media.mediaType}-${media.id}`}
          media={media}
          priority={priorityFirstImage && index === 0}
        />
      ))}
      <LoadMoreTrigger moviePage={moviePage} tvPage={tvPage} />
    </>
  );
}
