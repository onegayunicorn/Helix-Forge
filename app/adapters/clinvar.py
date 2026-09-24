"""
ClinVar adapter stub.

Uses NCBI eutils when CLINVAR_API_KEY is present; otherwise synthetic curated hit.
Failed/skipped responses shrink the concordance denominator (rule 2).
"""

import httpx

from app.adapters.base import AdapterHit, AdapterStatus, EvidenceAdapter
from app.core.config import get_settings


class ClinVarAdapter(EvidenceAdapter):
    name = "ClinVar"

    async def fetch(self, variant_claim: str) -> AdapterHit | None:
        settings = get_settings()

        if not settings.clinvar_api_key:
            return AdapterHit(
                source="ClinVar",
                evidence_type="Curated",
                claim=f"ClinVar synthetic: {variant_claim}",
                confidence=98.0,
                pmid=None,
                is_refutation=False,
                status=AdapterStatus.OK,
            )

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                # eSearch → eSummary pattern (simplified)
                search = await client.get(
                    f"{settings.clinvar_api_base}/esearch.fcgi",
                    params={
                        "db": "clinvar",
                        "term": f"{variant_claim}[All Fields] AND DMD[Gene]",
                        "retmode": "json",
                        "api_key": settings.clinvar_api_key,
                    },
                )
                if search.status_code != 200:
                    return AdapterHit(
                        source="ClinVar",
                        evidence_type="Curated",
                        claim="eSearch non-200",
                        confidence=0,
                        status=AdapterStatus.SKIPPED,
                    )
                ids = search.json().get("esearchresult", {}).get("idlist", [])
                if not ids:
                    return AdapterHit(
                        source="ClinVar",
                        evidence_type="Curated",
                        claim="no ClinVar records",
                        confidence=0,
                        status=AdapterStatus.OK,
                    )
                return AdapterHit(
                    source="ClinVar",
                    evidence_type="Curated",
                    claim=f"ClinVar hit(s) for {variant_claim} (id={ids[0]})",
                    confidence=95.0,
                    status=AdapterStatus.OK,
                )
        except Exception:
            return AdapterHit(
                source="ClinVar",
                evidence_type="Curated",
                claim="adapter unreachable",
                confidence=0,
                status=AdapterStatus.FAILED,
            )
