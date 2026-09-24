"""Pydantic schemas for Helix Forge API."""

from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class FrameStatus(str, Enum):
    IN_FRAME = "IN_FRAME"
    FRAMESHIFT = "FRAMESHIFT"


class Phenotype(str, Enum):
    BMD_LIKE = "BMD_LIKE"
    DMD_LIKE = "DMD_LIKE"
    UNKNOWN = "UNKNOWN"


class EvidenceGrade(str, Enum):
    SUPPORTED = "SUPPORTED"
    EMERGING = "EMERGING"
    DISPUTED = "DISPUTED"
    INSUFFICIENT = "INSUFFICIENT"
    NEGATIVE = "NEGATIVE"


class Role(str, Enum):
    OPERATOR = "operator"
    ADMIN = "admin"
    VIEWER = "viewer"


# --- Auth ---

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in_minutes: int
    role: str


class LoginRequest(BaseModel):
    username: str
    password: str


class OperatorOut(BaseModel):
    username: str
    role: str
    display_name: str


# --- Frame / Variant ---

class FrameRequest(BaseModel):
    start_exon: int = Field(..., ge=1, le=79)
    end_exon: int = Field(..., ge=1, le=79)
    variant_class: str = "deletion"  # deletion | duplication


class FrameResult(BaseModel):
    start_exon: int
    end_exon: int
    total_nt: int
    length_mod_3: int
    frame_status: FrameStatus
    phenotype: Phenotype
    nmd_status: str  # NMD_ESCAPE | NMD_COMPETENT | N/A
    skip_rescue: list[str] = []
    domains_impacted: list[str] = []
    research_seal: str
    provenance: dict[str, Any] = {}


# --- Evidence / Concordance ---

class EvidenceLine(BaseModel):
    source: str
    evidence_type: str  # Curated | Text mined | Adapter
    claim: str
    confidence: float = Field(..., ge=0, le=100)
    grade: EvidenceGrade
    pmid: str | None = None
    adapter_status: str = "ok"  # ok | skipped | failed


class ConcordanceRequest(BaseModel):
    variant_claim: str = "Pathogenic Exon 52 Deletion"
    sources_enabled: list[str] = ["LOVD", "ClinVar"]
    text_mined_count: int = 0
    include_refutation: bool = False


class ConcordanceResult(BaseModel):
    grade: EvidenceGrade
    lines: list[EvidenceLine]
    rules_applied: list[str]
    denominator: int
    research_seal: str


# --- Sandbox Runs ---

class SandboxRun(BaseModel):
    id: str
    name: str
    detail: str
    status: str
    duration_ms: int
    created_at: datetime
    provenance: dict[str, Any] = {}


class AuditEvent(BaseModel):
    id: str
    actor: str
    action: str
    resource: str
    detail: dict[str, Any] = {}
    timestamp: datetime
    research_seal: str
