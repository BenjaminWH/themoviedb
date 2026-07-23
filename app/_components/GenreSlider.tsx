import { MediaRow } from "@/app/_components/MediaRow";
import { SliderSection } from "@/app/_components/SliderSection";
import type { GenreConfig } from "@/lib/genres";
import type { MediaSummary, PageCursor } from "@/lib/types/media";

export type GenreSectionData = {
  genre: GenreConfig;
  totalCount: number;
  initialMedia: MediaSummary[];
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
  const { genre, totalCount, initialMedia, moviePage, tvPage } = feed;

  if (initialMedia.length === 0) {
    return null;
  }

  return (
    <SliderSection
      title={genre.title}
      count={totalCount}
      countLabel="titles"
      href={`/genre/${genre.slug}/movie`}
    >
      <MediaRow
        initialMedia={initialMedia}
        moviePage={moviePage}
        tvPage={tvPage}
        priorityFirstImage={priorityFirstImage}
      />
    </SliderSection>
  );
}
