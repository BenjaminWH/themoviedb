"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function YouTubePlayer({ videoKey }: { videoKey: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-white/10"
    >
      {shouldLoad ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
          title="YouTube trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-zinc-500">
          <div className="flex items-center gap-2">
            <Play className="h-8 w-8 fill-current" aria-hidden="true" />
            <span className="text-sm font-medium">Loading trailer…</span>
          </div>
        </div>
      )}
    </div>
  );
}
