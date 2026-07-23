import { profileUrl } from "@/lib/tmdb-client";
import { User } from "lucide-react";
import Image from "next/image";

export function PersonCard({
  name,
  role,
  profilePath,
}: {
  name: string;
  role: string;
  profilePath: string | null;
}) {
  const src = profileUrl(profilePath, "w185");

  return (
    <div className="group w-37.5 shrink-0 snap-start select-none sm:w-42.5">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-zinc-800 ring-1 ring-white/10">
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            draggable={false}
            sizes="(max-width: 640px) 150px, 170px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-500">
            <User className="h-12 w-12" aria-hidden="true" />
          </div>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-medium text-zinc-100">
        {name}
      </p>
      <p className="line-clamp-1 text-xs text-zinc-500">{role}</p>
    </div>
  );
}
