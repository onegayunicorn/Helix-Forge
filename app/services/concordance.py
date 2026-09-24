"""
Evidence Concordance Engine — four strict grading rules.

1. Collapse: identical publications across DBs = 1 line
2. Skipped Source: failed/excluded adapter shrinks denominator (never pads nulls)
3. Refutation Override: one curated refutation → DISPUTED
4. Text-Mining Cap: automated hits never exceed EMERGING
"""

from app.adapters.base import AdapterHit, AdapterStatus
from app.adapters.clinvar import ClinVarAdapter
from app.adapters.lovd import LOVDAdapter
from app.core.config import get_settings
from app.models.schemas import (
    ConcordanceRequest,
    ConcordanceResult,
    EvidenceGrade,
    EvidenceLine,
)

ADAPTERS = {
    "LOVD": LOVDAdapter(),
    "ClinVar": ClinVarAdapter(),
}


async def grade_claim(req: ConcordanceRequest) -> ConcordanceResult:
    settings = get_settings()
    rules: list[str] = []
    lines: list[EvidenceLine] = []
    curated_hits: list[AdapterHit] = []
    has_refutation = False
    expected = len(req.sources_enabled)
    active = 0

    for name in req.sources_enabled:
        adapter = ADAPTERS.get(name)
        if not adapter:
            rules.append(f"skipped unknown source {name}")
            continue
        hit = await adapter.fetch(req.variant_claim)
        if hit is None or hit.status in (AdapterStatus.SKIPPED, AdapterStatus.FAILED):
            rules.append(f"rule2:skipped_source:{name}")
            continue
        active += 1
        if hit.is_refutation:
            has_refutation = True
        curated_hits.append(hit)
        lines.append(
            EvidenceLine(
                source=hit.source,
                evidence_type=hit.evidence_type,
                claim=hit.claim,
                confidence=hit.confidence,
                grade=EvidenceGrade.EMERGING,  # provisional; final grade set below
                pmid=hit.pmid,
                adapter_status=hit.status.value,
            )
        )

    # Rule 1: collapse (demo — same claim text collapses)
    seen_claims: set[str] = set()
    collapsed: list[EvidenceLine] = []
    for line in lines:
        key = line.claim.strip().lower()
        if key in seen_claims:
            rules.append("rule1:collapse_duplicate_paper")
            continue
        seen_claims.add(key)
        collapsed.append(line)
    lines = collapsed

    # Text-mined lines
    if req.text_mined_count > 0:
        rules.append("rule4:text_mining_cap")
        for i in range(min(req.text_mined_count, 5)):  # show up to 5
            lines.append(
                EvidenceLine(
                    source="Text-mined",
                    evidence_type="Text mined",
                    claim=f"NLP hit #{i + 1} for {req.variant_claim}",
                    confidence=60.0,
                    grade=EvidenceGrade.EMERGING,
                    adapter_status="ok",
                )
            )

    # Final grade
    if has_refutation or req.include_refutation:
        grade = EvidenceGrade.DISPUTED
        rules.append("rule3:refutation_override")
    elif req.text_mined_count > 0 and active == 0:
        grade = EvidenceGrade.EMERGING
    elif active >= 2:
        grade = EvidenceGrade.SUPPORTED
        rules.append("two_curated_agreement")
    elif active == 1:
        grade = EvidenceGrade.EMERGING
    else:
        grade = EvidenceGrade.INSUFFICIENT

    # Propagate final grade onto curated lines
    for line in lines:
        if line.evidence_type == "Curated":
            line.grade = grade if grade != EvidenceGrade.DISPUTED else EvidenceGrade.DISPUTED
        else:
            line.grade = EvidenceGrade.EMERGING

    return ConcordanceResult(
        grade=grade,
        lines=lines,
        rules_applied=rules or ["baseline"],
        denominator=active,  # already shrunk
        research_seal=settings.research_safety_seal,
    )
