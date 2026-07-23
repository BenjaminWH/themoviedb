import { PersonCard } from "./PersonCard";
import { SliderSection } from "@/app/_components/SliderSection";
import type { CastMember, CrewMember } from "@/lib/types/media-details";

export function CastSlider({
  cast,
  directors,
}: {
  cast: CastMember[];
  directors: CrewMember[];
}) {
  if (cast.length === 0 && directors.length === 0) return null;

  return (
    <SliderSection
      title="Cast & Crew"
      count={directors.length + cast.length}
      countLabel="people"
    >
      {directors.map((director) => (
        <PersonCard
          key={`director-${director.id}`}
          name={director.name}
          role={director.job}
          profilePath={director.profilePath}
        />
      ))}
      {cast.map((actor) => (
        <PersonCard
          key={actor.id}
          name={actor.name}
          role={actor.character}
          profilePath={actor.profilePath}
        />
      ))}
    </SliderSection>
  );
}
