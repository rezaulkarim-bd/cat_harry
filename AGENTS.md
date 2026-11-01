# cat_harry

Fresh Next.js 16.4.3 (create-next-app) app: single-page `src/app/page.js` (currently empty starter) plus a full shadcn/ui component library. Plain JavaScript — do not introduce TypeScript.

## This is NOT the Next.js you know

<!-- BEGIN:nextjs-agent-rules -->

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Notably, `next.config.mjs` enables `cacheComponents`, `reactCompiler` (Babel plugin), and `partialPrefetching`. The React Compiler auto-memoizes — don't reflexively add `useMemo`/`useCallback`/`memo`.

## Commands

- Dev/build/lint: `npm run dev`, `npm run build`, `npm run lint`. Dev and build both use Turbopack; there is no separate test suite.
- No typecheck step exists (`jsconfig.json` is path aliases only).

## Conventions

- **JavaScript only**: all files are `.js`/`.jsx` (`components.json` sets `tsx: false`). Never create `.ts`/`.tsx` files.
- **shadcn**: style `base-vega`, built on **Base UI** (`@base-ui/react`), not Radix — primitive imports differ from classic shadcn examples. Add components with `npx shadcn@latest add <name>` rather than hand-writing them into `src/components/ui/`.
- **Tailwind v4**: CSS-first config lives in `src/app/globals.css`; there is no `tailwind.config.js`. Design tokens are CSS variables there.
- Path alias `@/*` → `src/*`. `cn` lives in the npm `cn` package, re-exported by `src/lib/utils.js`.
