# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, and server components.
- `components/`: Reusable UI components (prefer colocated styles and stories if added).
- `lib/`: Utilities, data helpers, and API clients.
- `contexts/`: React contexts/providers.
- `public/`: Static assets (images, icons, robots.txt).
- `supabase/`: SQL and configuration related to Supabase.
- Tests: none yet; colocate as `*.test.ts(x)` or use `__tests__/` when added.

## Build, Test, and Development Commands
- `npm run dev`: Start the dev server at `http://localhost:3000`.
- `npm run build`: Production build with Next.js.
- `npm run start`: Serve the built app.
- `npm run lint`: ESLint using `eslint-config-next` rules.
- `npm run type-check`: TypeScript compile checks with `strict` mode.

## Coding Style & Naming Conventions
- TypeScript: enabled with `strict: true`. Prefer typed props and return values.
- Components: functional React components; server components by default in `app/`.
- Naming: Component files `PascalCase.tsx`; route folders `kebab-case` under `app/`; utility modules `kebab-case.ts`.
- Styling: Tailwind CSS; prefer utility classes over inline styles.
- Linting: fix issues before committing (`npm run lint`). Keep imports path-alias friendly via `@/*`.

## Testing Guidelines
- Framework: not configured. If adding, prefer Vitest or Jest + React Testing Library.
- Location: colocate near source or under `__tests__/`.
- Naming: `*.test.ts` / `*.test.tsx` (e.g., `components/Button.test.tsx`).
- Quality: cover critical paths and edge cases; keep tests fast and deterministic.

## Commit & Pull Request Guidelines
- Commits: imperative, concise summaries; scope optional.
  - Example: `Fix dashboard auth redirect` or `Add Supabase session refresh`.
- PRs: clear description, linked issues, and screenshots/GIFs for UI changes.
- Checks: ensure `npm run lint` and `npm run type-check` pass; describe any env or migration changes.

## Security & Configuration Tips
- Secrets: store in `.env.local`; never commit secrets. See `.env.production.example` for required variables.
- Supabase: use `NEXT_PUBLIC_*` only for client-safe keys; keep service role keys server-side.
- Auth & routing: changes may affect `middleware.ts`—review carefully when modifying protected paths.

## Agent Notes
- See `CLAUDE.md` for agent workflows and prompts used in this project.
