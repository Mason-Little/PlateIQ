# AGENTS.md

## Project snapshot
- Frontend-only Vite + React + TypeScript app.
- Styling and UI components use MUI (Material UI) with Emotion.
- Data layer is localStorage-backed, accessed via React Query hooks.
- Module system is ESM ("type": "module").
- No existing Cursor/Copilot rules found in this repo.

## Quick commands
- Install deps: `npm install` (or `bun install` if using Bun).
- Dev server: `npm run dev` (Vite).
- Build: `npm run build` (tsc -b + Vite build).
- Preview build: `npm run preview`.
- Lint: `npm run lint` (Biome).
- Format: `npm run format` (Biome format + check).
- Unused code scan: `npm run knip`.

## Tests
- No test runner is configured (no Vitest/Jest/Playwright scripts).
- There is no single-test command yet.
- If you add tests, keep scripts in `package.json` and document them here.

## Repository structure
- `src/` contains app code.
- `src/components/` for UI components.
- `src/hooks/` for React Query hooks and state logic.
- `src/api/` for data access and persistence.
- `src/lib/` for shared utilities (storage, query client).
- `src/types/` for domain types and exports.

## Language and tooling
- TypeScript strict mode is on (see `tsconfig.app.json`).
- No emit for TS; Vite handles output.
- Module resolution is "bundler".
- Path alias: `@/*` maps to `src/*`.
- Biome is the formatter and linter.

## Formatting rules (Biome)
- Indent: 2 spaces.
- Quotes: double quotes.
- Import organization: enabled (Biome organizes imports).
- Lint rules: Biome recommended.

## Import conventions
- Prefer path alias `@/` for app modules.
- Keep external imports before local imports (Biome organizes).
- Use `import type` for type-only imports.
- Preserve `.tsx` extension only when needed (see `src/main.tsx`).

## React conventions
- Function components with arrow functions.
- Props are typed via `interface` or inline type annotations.
- Hooks live in `src/hooks/` and are named `useXxx`.
- React Query hooks wrap `useQuery` / `useMutation`.
- Prefer colocating component-specific helpers in the same file.

## State and data flow
- React Query manages server-like state.
- Local storage is the persistence layer (see `src/lib/storage.ts`).
- Storage keys are namespaced with `plateiq:` prefix.
- Hook functions should invalidate relevant query keys on mutation success.

## Error handling
- Throw standard `Error` for irrecoverable issues (see `src/main.tsx`).
- In API layer, return `null` when an entity is missing if the caller can handle it.
- For mutations, guard against missing data and early return.

## Type usage
- Prefer explicit return types for exported functions.
- Use domain types from `src/types/`.
- When narrowing, use `?.` and `??` consistently.
- Avoid `any`; leverage unions or generics instead.

## Naming conventions
- Components: PascalCase file and export names.
- Hooks: `useXxx`.
- Types: PascalCase, stored in `src/types/`.
- Constants: `UPPER_SNAKE_CASE` for shared constants, camelCase for locals.
- Boolean flags: `isX`, `hasX`, `shouldX`.

## CSS/styling conventions
- MUI `sx` prop is used for component styling.
- Use object literals for `sx` and keep keys sorted logically (layout, spacing, typography).
- Prefer theme tokens when available (colors, spacing, typography).
- For reusable design tokens, define them in `src/theme.ts`.

## File organization guidelines
- Keep API calls in `src/api/` and avoid direct localStorage access elsewhere.
- Keep cross-cutting utilities in `src/lib/`.
- Export types through `src/types/index.ts` for simple imports.
- Avoid deep relative paths; use `@/` alias.

## Recommended workflows
- Before committing: `npm run lint` and `npm run format`.
- For production sanity: `npm run build`.
- For cleanup and dead code checks: `npm run knip`.

## Adding new tests (if needed)
- Prefer Vitest for unit tests with Vite.
- Add scripts:
  - `test`: `vitest`
  - `test:watch`: `vitest --watch`
  - `test:single`: `vitest path/to/test -t "name"`
- Document any new test scripts in this file.

## Notes for agentic changes
- Avoid touching `dist/` unless asked.
- Respect existing MUI patterns and theming.
- Keep UI components small and single-purpose.
- When updating storage models, update types and hooks together.
- Update `src/types/index.ts` when adding new types.

## Known gaps
- No automated tests yet.
- No CI config in repo.
- README is the Vite template; add product docs only if requested.
