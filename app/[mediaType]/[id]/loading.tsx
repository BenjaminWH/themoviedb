export default function Loading() {
  return (
    <main className="mx-auto max-w-400 animate-pulse px-4 py-8 sm:px-8 sm:py-12">
      <div className="space-y-10">
        <div className="h-5 w-32 rounded bg-zinc-800" />

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="shrink-0">
            <div className="aspect-2/3 w-50 rounded-lg bg-zinc-800 sm:w-65" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="h-8 w-3/4 rounded bg-zinc-800 sm:h-10" />
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-5 w-16 rounded bg-zinc-800" />
                <div className="h-5 w-20 rounded bg-zinc-800" />
                <div className="h-5 w-24 rounded bg-zinc-800" />
                <div className="h-5 w-28 rounded bg-zinc-800" />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="h-7 w-20 rounded-full bg-zinc-800" />
                <div className="h-7 w-24 rounded-full bg-zinc-800" />
                <div className="h-7 w-16 rounded-full bg-zinc-800" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-4 w-5/6 rounded bg-zinc-800" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-6 w-40 rounded bg-zinc-800" />
          <div className="flex gap-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="aspect-2/3 w-37.5 shrink-0 snap-start rounded-lg bg-zinc-800 sm:w-42.5"
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-6 w-32 rounded bg-zinc-800" />
          <div className="aspect-video w-full rounded-lg bg-zinc-800" />
        </div>
      </div>
    </main>
  );
}
