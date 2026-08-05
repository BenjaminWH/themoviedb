A [Next.js](https://nextjs.org) app for browsing movies and TV shows via [The Movie Database (TMDB)](https://www.themoviedb.org/) API, with genre browsing, media details, and a wishlist.

## Task Description

This project is a code challenge built around a simple brief: build a movie browsing website on top of TMDB's API.

**Functionality:**

- A frontpage showcasing a set of genres (Action, Comedy, Thriller, War, Romance, Drama, Crime, Documentary, Horror) for movies and series, each with its title, total movie count, a handful of preview movies (title + cover), and a link to the genre's full listing.
- A genre listing page showing the genre title, total count, and all movies in the genre (title + cover), each linking to its detail page.
- A movie detail page with title, description, release year, cover, backdrop, genres, cast and directors, and an embedded YouTube trailer where available.
- A wishlist that users can add movies to and remove movies from, persisted in session (no account/database required), with its own page listing wishlisted movies and allowing removal without a page refresh.
- A responsive, colourful, playful design suited to a general audience across mobile, tablet, and desktop.

## Time Estimation

Three-point estimates (optimistic / most likely / pessimistic) made before starting, compared against actual time spent:

| Task | Optimistic | Most likely | Pessimistic | Actual |
| --- | --- | --- | --- | --- |
| Project setup | 1h | 1.5h | 2.5h | 1h |
| Frontpage (genre rows, counts, cards, "view all" links, styling) | 2.5h | 3.5h | 5h | 2.5h |
| Genre listing page (grid, count, optional pagination, styling) | 1.5h | 2.5h | 4h | 2h |
| Movie detail page (full info, cast/director, optional trailer, styling) | 2.5h | 3.5h | 5h | 3h |
| Wishlist (add/remove, session persistence, wishlist page, styling) | 1.5h | 2.5h | 4h | 1h |
| Minor visual polish (unplanned) | – | – | – | 0.5h |
| Documentation (README, setup guide) | 0.5h | 1h | 1.5h | 0.5h |
| Repo setup & delivery | 0.5h | 0.5h | 1h | 0.25h |
| **Total** | **10h** | **15h** | **23h** | **10.75h** |

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
