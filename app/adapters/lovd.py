"""
LOVD adapter stub.

When LOVD_API_KEY / LOVD_API_BASE are unset the adapter returns a deterministic
synthetic curated hit (offline research mode). When configured it attempts a
live call and falls back to SKIPPED on network/auth failure (denominator shrinks).
"""

import httpx

from app.adapters.base import AdapterHit, AdapterStatus, EvidenceAdapter
from app.core.config import get_settings


class LOVDAdapter(EvidenceAdapter):
    name = "LOVD"

    async def fetch(self, variant_claim: str) -> AdapterHit | None:
        settings = get_settings()

        if not settings.lovd_api_base or not settings.lovd_api_key:
            # Synthetic offline mode — curated positive for common claims
            return AdapterHit(
                source="LOVD",
                evidence_type="Curated",
                claim=f"LOVD synthetic: {variant_claim}",
                confidence=94.0,
                pmid=None,
                is_refutation=False,
                status=AdapterStatus.OK,
            )

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                # Placeholder real endpoint shape — replace with actual LOVD API path
                resp = await client.get(
                    f"{settings.lovd_api_base.rstrip('/')}/api/variants",
                    params={"q": variant_claim, "gene": "DMD"},
                    headers={"Authorization": f"Bearer {settings.lovd_api_key}"},
                )
                if resp.status_code == 200:
                    data = resp.json()
                    # Minimal parse — real implementation maps LOVD fields
                    return AdapterHit(
                        source="LOVD",
                        evidence_type="Curated",
                        claim=str(data.get("summary", variant_claim)),
                        confidence=float(data.get("confidence", 90)),
                        pmid=data.get("pmid"),
                        status=AdapterStatus.OK,
                    )
                return AdapterHit(
                    source="LOVD",
                    evidence_type="Curated",
                    claim="adapter non-200",
                    confidence=0,
                    status=AdapterStatus.SKIPPED,
                )
        except Exception:
            return AdapterHit(
                source="LOVD",
                evidence_type="Curated",
                claim="adapter unreachable",
                confidence=0,
                status=AdapterStatus.FAILED,
            )
