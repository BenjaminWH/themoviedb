A [Next.js](https://nextjs.org) app for browsing movies and TV shows via [The Movie Database (TMDB)](https://www.themoviedb.org/) API, with genre browsing, media details, and a wishlist.

## Getting Started

1. **Install dependencies** (this project uses pnpm):

   ```bash
   pnpm install
   ```

2. **Set up your TMDB API credentials**:

   ```bash
   cp .env.example .env.local
   ```

   Then fill in `TMDB_API_READ_ACCESS_TOKEN` in `.env.local`. Get a v4 Read Access Token from your [TMDB account settings](https://www.themoviedb.org/settings/api) (you'll need a free TMDB account).

3. **Run the development server**:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — build for production
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint

## Project structure

- `app/` — Next.js App Router pages, server actions (`app/_actions/`), and UI components (`app/_components/`)
- `lib/` — TMDB API client, types, and shared utilities
