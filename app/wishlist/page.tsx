"use client";

import { MediaCard } from "@/app/_components/MediaCard";
import { useWishlist } from "@/lib/wishlist-context";
import Link from "next/link";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <main className="mx-auto max-w-400 px-4 py-8 sm:px-8 sm:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm font-medium text-zinc-400 transition hover:text-white"
      >
        ← Back to browse
      </Link>

      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Your Wishlist
        </h1>
        <p className="text-zinc-400">
          {items.length > 0
            ? `${items.length} title${items.length === 1 ? "" : "s"} saved.`
            : "Titles you save will show up here."}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-zinc-400">
          Browse movies and series and tap the heart icon to add them to your wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <MediaCard key={`${item.mediaType}-${item.id}`} media={item} />
          ))}
        </div>
      )}
    </main>
  );
}
