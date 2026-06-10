# Claude Hub — Development Conventions

## Project overview
A plug-and-play registry for Claude Code: skills, CLAUDE.md templates, hooks, slash commands, MCP configs. Install anything in seconds. Phase 4 adds an Org Console via Anthropic Admin API.

## Stack
- `apps/web/` — Vite + React 18 + TypeScript strict + Tailwind + Motion (framer-motion)
- `packages/cli/` — Node CLI, npx claude-hub
- `packages/registry-content/` — source of truth for all registry items
- `scripts/build-registry.ts` — compiles content → registry.json + search index (zod validated)

## Strict conventions

### TypeScript
- `strict: true`, `noUncheckedIndexedAccess: true` — zero `any`
- Every function parameter and return type explicit where not inferred
- zod at every boundary: registry.json parsing, CLI args, API responses (Phase 4)

### Content is data
- Adding a registry item = adding a folder + PR — zero code changes
- `packages/registry-content/skills/<name>/meta.json` + `SKILL.md`
- CI runs `build-registry.ts` and fails on invalid content

### Animation
- All animation values from `src/lib/motion.ts` — never inline durations or easings
- Transform + opacity ONLY — no layout-animating properties
- `prefers-reduced-motion` → instant transitions + opacity only
- Timing constants: MICRO=150ms, ENTER_EXIT=250ms, PAGE=400ms

### Async state
- Every data view ships four states: Skeleton (layout-matched), Empty, Error, Success
- Use `<AsyncState status={...}>` wrappers — never raw conditional rendering
- Error boundary per route and per live widget — failed widget = snapshot + retry button

### Phase 4 only
- Admin API key server-side only; frontend NEVER calls api.anthropic.com directly
- Costs stored as integer cents in DB; divide to dollars only at render
- All DB timestamps UTC; nullable `source` column on usage tables (future Enterprise Analytics)

### CLI safety
- NEVER destroy user files: prompt before overwrite, merge hooks safely, show diffs on update
- `add mcp` prints JSON + destination only — never auto-edits MCP config

### Quality gates (merge requirement)
- Zero console errors/warnings in dev and prod build
- Lighthouse ≥ 95 perf + a11y gated in CI
- All async states implemented and checked before feature is "done"
- Keyboard-only pass; visible focus on all interactive elements
- 320px → 4K layout tested
- `prefers-reduced-motion` verified
- Network killed → graceful degradation, zero console errors

## Directory layout
```
apps/web/src/
  features/
    registry/       # browse, search, detail, install UX
    mcp/            # MCP configs directory
    calculator/     # cost calculator
    pulse/          # ecosystem live strip
  components/
    ui/             # shadcn/radix primitives
    async/          # AsyncState, Skeleton, EmptyState, ErrorState
    cmdK/           # Cmd+K command palette
  lib/
    motion.ts       # single source of all animation tokens
    tokens.ts       # design tokens as TS constants
  styles/
    globals.css     # CSS custom properties
packages/
  cli/              # npx claude-hub
  registry-content/ # content source of truth (also valid plugin marketplace)
    skills/
    claude-md/
    hooks/
    commands/
    mcp-configs/
scripts/
  build-registry.ts # content → registry.json + search index
```

## Out of scope
- Anthropic Messages API or Claude.ai login/OAuth
- Enterprise Analytics API (schema-ready only)
- Bedrock/Vertex Claude Code data
- Auto-editing users' MCP configs from CLI
- Billing, multi-org tenancy (use org_id in DB anyway)
