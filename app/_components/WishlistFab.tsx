"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WishlistFab() {
  const { items } = useWishlist();
  const pathname = usePathname();

  if (pathname === "/wishlist") return null;

  return (
    <Link
      href="/wishlist"
      aria-label="View wishlist"
      className="fixed right-6 bottom-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-zinc-200 shadow-lg ring-1 ring-white/10 transition hover:scale-105 hover:text-white hover:ring-white/30"
    >
      <Heart className="h-6 w-6" aria-hidden="true" />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-500 px-1 text-xs font-semibold text-black">
          {items.length}
        </span>
      )}
    </Link>
  );
}
