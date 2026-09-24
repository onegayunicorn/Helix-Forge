# Helix Forge — Backend API

FastAPI service powering the Helix Forge digital-twin workbench for *DMD* genomic research.

> **Research informatics only.** Outputs are not clinical diagnostic determinations.

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000/docs

## Seed operator (dev only)

- Username: `operator`
- Password: `helix-research`

## Key endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Liveness + research seal |
| POST | `/api/v1/auth/login` | Obtain JWT |
| GET | `/api/v1/auth/me` | Current operator |
| POST | `/api/v1/frame/compute` | Reading-frame + domain impact |
| POST | `/api/v1/evidence/concordance` | Four-rule concordance grading |
| GET/POST | `/api/v1/runs` | Sandbox run list / create |
| GET | `/api/v1/audit` | Audit trail (auth required) |

## Adapters

- **LOVD** / **ClinVar**: live when API keys are set; otherwise deterministic synthetic curated hits (offline research mode). Failed/skipped adapters shrink the concordance denominator (rule 2).

## Frame engine

Uses exact Leiden nucleotide lengths for all 79 exons of `NM_004006.2` (Dp427m). No generic 150-nt placeholders.
