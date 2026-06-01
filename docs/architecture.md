# Architecture

Board Investment Priority Engine is a static-friendly TypeScript executive-intelligence surface for ranking where leadership should fund, protect, hold, or trim next.

## Core flow

- `src/data/sampleVerticalBrief.ts` models board-priority lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores priority, savings leverage, downside exposure, conviction, payback window, urgency, and board confidence while generating board findings.
- `src/services/verticalBriefService.ts` exposes the priority-lane, board-asks, capital-sequence, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- what should we fund now
- what should we protect from cuts
- what should we hold until proof improves
- what should we trim and reallocate

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
