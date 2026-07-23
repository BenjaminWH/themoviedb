import { DragScrollRow } from "@/app/_components/DragScrollRow";
import Link from "next/link";
import type { ReactNode } from "react";

export function SliderSection({
  title,
  count,
  countLabel,
  href,
  children,
}: {
  title: string;
  count?: number;
  countLabel?: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          {count !== undefined && (
            <span className="text-sm text-zinc-400">
              {count.toLocaleString()} {countLabel ?? "titles"}
            </span>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="shrink-0 text-sm font-medium text-teal-400 transition hover:text-teal-300"
          >
            View All →
          </Link>
        )}
      </div>
      <DragScrollRow className="flex gap-4 pb-2">{children}</DragScrollRow>
    </section>
  );
}
