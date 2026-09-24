# Contributing to Helix Forge

Thank you for helping turn the most complex part of DMD genetics into something that is visible, touchable and understandable.

## Scientific Integrity (non-negotiable)

- Any change to reading-frame, domain-mapping, NMD or amenability logic **must** be accompanied by a new test case in the validation suite.
- Prefer exact Leiden / Ensembl exon lengths over placeholders.
- Never remove or weaken the research-safety boundary or the “not for clinical diagnosis” stamps.
- Pseudoscientific or non-standard terminology is forbidden in production modules.

## Concordance Engine Rules

When touching evidence grading, preserve the four rules exactly:

1. **Collapse** — identical publications across databases = 1 evidence line.
2. **Skipped Source** — failed/excluded adapter shrinks the denominator (never pads nulls).
3. **Refutation Override** — one curated refutation forces `DISPUTED`.
4. **Text-Mining Cap** — automated hits never exceed `EMERGING`.

## Pull Request Process

1. Fork / branch from `main`.
2. Keep commits focused and well-described.
3. Run the local check suite (`pnpm check` on the portal; Python validation on the backend).
4. Update or add tests for any science-logic change.
5. Open a PR against `main`.

## Code Style

- Portal: TypeScript, Prettier, existing shadcn/ui patterns.
- Backend: Python 3.10+, type hints, FastAPI conventions.
- Prefer pure functions for frame arithmetic and domain mapping so they stay unit-testable offline.

## Adding a New Evidence Adapter

1. Implement the `EvidenceAdapter` interface (`app/adapters/base.py`).
2. Ensure a skipped/failed adapter correctly shrinks the denominator.
3. Add a synthetic fixture path for offline research mode.
4. Document any required API keys or rate-limit behaviour in `.env.example`.

## Auth & Audit

- Auth is JWT-based (seed operator for local/dev only).
- Every mutating or grading action should call `audit.record(...)`.
- Production must replace the in-memory audit store with PostgreSQL.

## Questions

Open an issue labelled `discussion`. Large architectural changes should be discussed before implementation.
