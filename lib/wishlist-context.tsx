"use client";

import type { WishlistItem } from "@/lib/types/wishlist";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "wishlist";
const EMPTY_ITEMS: WishlistItem[] = [];

function keyOf(media: Pick<WishlistItem, "mediaType" | "id">): string {
  return `${media.mediaType}-${media.id}`;
}

function readFromStorage(): WishlistItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : EMPTY_ITEMS;
  } catch {
    return EMPTY_ITEMS;
  }
}

let items: WishlistItem[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): WishlistItem[] {
  if (items === null) items = readFromStorage();
  return items;
}

function getServerSnapshot(): WishlistItem[] {
  return EMPTY_ITEMS;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setItems(next: WishlistItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode, quota, etc.) — wishlist stays session-only
  }
  listeners.forEach((listener) => listener());
}

type WishlistContextValue = {
  items: WishlistItem[];
  isWishlisted: (media: Pick<WishlistItem, "mediaType" | "id">) => boolean;
  add: (media: WishlistItem) => void;
  remove: (media: Pick<WishlistItem, "mediaType" | "id">) => void;
  toggle: (media: WishlistItem) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const currentItems = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isWishlisted = useCallback(
    (media: Pick<WishlistItem, "mediaType" | "id">) =>
      currentItems.some((item) => keyOf(item) === keyOf(media)),
    [currentItems],
  );

  const add = useCallback((media: WishlistItem) => {
    const current = getSnapshot();
    if (current.some((item) => keyOf(item) === keyOf(media))) return;
    setItems([...current, media]);
  }, []);

  const remove = useCallback((media: Pick<WishlistItem, "mediaType" | "id">) => {
    setItems(getSnapshot().filter((item) => keyOf(item) !== keyOf(media)));
  }, []);

  const toggle = useCallback(
    (media: WishlistItem) => {
      if (isWishlisted(media)) {
        remove(media);
      } else {
        add(media);
      }
    },
    [isWishlisted, add, remove],
  );

  const value = useMemo(
    () => ({ items: currentItems, isWishlisted, add, remove, toggle }),
    [currentItems, isWishlisted, add, remove, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
