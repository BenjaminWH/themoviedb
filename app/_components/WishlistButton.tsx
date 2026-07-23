"use client";

import type { WishlistItem } from "@/lib/types/wishlist";
import { useWishlist } from "@/lib/wishlist-context";
import { Heart } from "lucide-react";
import type { MouseEvent } from "react";

export function WishlistButton({
  media,
  variant = "icon",
}: {
  media: WishlistItem;
  variant?: "icon" | "full";
}) {
  const { isWishlisted, toggle } = useWishlist();

  const wishlistItem: WishlistItem = {
    id: media.id,
    mediaType: media.mediaType,
    title: media.title,
    posterPath: media.posterPath,
    year: media.year,
  };

  const wishlisted = isWishlisted(wishlistItem);

  function onClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(wishlistItem);
  }

  const label = wishlisted ? "Remove from wishlist" : "Add to wishlist";

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={wishlisted}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition mb-2 ${
          wishlisted
            ? "bg-teal-500/15 text-teal-300 ring-teal-400/40 hover:bg-teal-500/25"
            : "bg-zinc-900 text-zinc-200 ring-white/10 hover:ring-white/30"
        }`}
      >
        <Heart
          className={`h-4 w-4 ${wishlisted ? "fill-teal-300 text-teal-300" : ""}`}
          aria-hidden="true"
        />
        {wishlisted ? "In Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={wishlisted}
      aria-label={label}
      title={label}
      className="absolute top-1 right-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-zinc-200 ring-1 ring-white/10 transition hover:text-white hover:ring-white/30"
    >
      <Heart
        className={`h-4 w-4 ${wishlisted ? "fill-teal-300 text-teal-300" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
