"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        We couldn&apos;t load this title right now. Try again or go back home.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-teal-500 px-6 py-3 text-sm font-medium text-black transition hover:bg-teal-400"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Back to browse
        </Link>
      </div>
    </main>
  );
}
