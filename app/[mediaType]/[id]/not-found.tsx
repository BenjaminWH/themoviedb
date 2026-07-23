import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Title not found
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        We couldn&apos;t find that title. It may have been removed or the URL
        might be incorrect.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
      >
        Back to browse
      </Link>
    </main>
  );
}
