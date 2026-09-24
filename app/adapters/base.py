"""Base adapter interface for evidence sources."""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum


class AdapterStatus(str, Enum):
    OK = "ok"
    SKIPPED = "skipped"
    FAILED = "failed"


@dataclass
class AdapterHit:
    source: str
    evidence_type: str  # Curated | Text mined
    claim: str
    confidence: float
    pmid: str | None = None
    is_refutation: bool = False
    status: AdapterStatus = AdapterStatus.OK


class EvidenceAdapter(ABC):
    name: str

    @abstractmethod
    async def fetch(self, variant_claim: str) -> AdapterHit | None:
        """Return a hit or None if the adapter is skipped/failed."""
        ...
