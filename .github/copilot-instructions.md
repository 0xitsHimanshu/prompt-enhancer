# Copilot Instructions for this Repo

This is a Bun + Turborepo monorepo with two Next.js apps, plus a browser and VS Code extension, centered on an AI "prompt enhance" service.

- Big picture
  - Server API (`apps/server`, Next 15 Route Handlers) exposes:
    - tRPC at `/trpc` with procedures in `apps/server/src/routers/index.ts`.
    - REST at `/api/enhance` handled by `apps/server/src/app/api/enhance/route.ts`.
  - Web UI (`apps/web`, Next 15 App Router) talks to the server via tRPC using `apps/web/src/utils/trpc.ts`.
  - Browser extension (`apps/browser`) and VS Code extension (`apps/vscode`) call the REST endpoint `/api/enhance` directly.
  - Enhancement flow: `enhanceWithAI` (`apps/server/src/lib/ai.ts`) → OpenAI Chat Completions → result logged via Prisma (`apps/server/src/lib/logger.ts`) to `prompt_enhancements`.

- Runbook
  - Env:
    - `apps/server/.env`: set `DATABASE_URL` and `OPENAI_API_KEY`.
    - `apps/web`: set `NEXT_PUBLIC_SERVER_URL` (default `http://localhost:3000`).
    - Optional: `VSCODE_ENHANCER_API` for the VS Code extension.
  - Install and start:
    - `bun install`
    - `bun db:generate && bun db:push`
    - `bun dev`
  - Ports (defaults): API on `http://localhost:3000`, Web on `http://localhost:3001`.
  - Tests (Playwright targets Web):
    - `export PLAYWRIGHT_BASE_URL=http://localhost:3001 && bunx playwright test`

- Conventions and patterns
  - Server
    - Add/modify procedures in `apps/server/src/routers/index.ts`; validate input with `zod`.
    - Keep business logic in `apps/server/src/lib/*` (see `ai.ts`, `logger.ts`); route handlers remain thin.
    - Use the shared Prisma client in `apps/server/src/db/index.ts` (Accelerate extension). Don’t instantiate Prisma elsewhere.
    - Note: `apps/server/src/services/llm/*` is deprecated; use `apps/server/src/lib/ai.ts` for all AI provider logic.
  - Web
    - Use tRPC client from `apps/web/src/utils/trpc.ts` (React Query integrated). Never hardcode server URLs; rely on `NEXT_PUBLIC_SERVER_URL`.
    - Prefer App Router patterns under `apps/web/src/app/**`; UI primitives live under `apps/web/src/components/ui/**`.
  - Extensions
    - Browser: `apps/browser/background.js` sends POST to `${apiBaseUrl}/api/enhance` (defaults to `http://localhost:3000`).
    - VS Code: `apps/vscode/src/extension.ts` computes base URL from settings/env and calls `/api/enhance`; shows inline diff via `diff`.

- Integration specifics
  - OpenAI: `enhanceWithAI` uses model from request or defaults to `gpt-4o-mini`. Requires `OPENAI_API_KEY`.
  - CORS: `/api/enhance` returns `Access-Control-Allow-Origin: *` for extension compatibility.
  - Data model: `PromptEnhancement` in `apps/server/prisma/schema/schema.prisma` persisted via `logEnhancement`.

- Practical examples
  - REST call:
    - `curl -s -X POST http://localhost:3000/api/enhance -H 'Content-Type: application/json' -d '{"prompt":"Rewrite this…","model":"gpt-4o-mini"}'`
  - tRPC usage (client already wired): see `apps/web/src/app/page.tsx` and `playground/page.tsx` using `useMutation(trpc.enhance.mutationOptions())`.
  - Adding a procedure (server): add to `appRouter` in `apps/server/src/routers/index.ts`, validate with `zod`, keep logic in `lib`.

If something above doesn’t match your local run (e.g., ports), prefer what’s in the app `package.json` and `turbo.json`, then update this file accordingly.
