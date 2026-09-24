"""FastAPI /api/v1 routes."""

from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import get_settings
from app.core.security import SEED_OPERATOR, create_access_token, decode_token, verify_password
from app.models.schemas import (
    AuditEvent,
    ConcordanceRequest,
    ConcordanceResult,
    FrameRequest,
    FrameResult,
    LoginRequest,
    OperatorOut,
    SandboxRun,
    Token,
)
from app.services import audit
from app.services.concordance import grade_claim
from app.services.frame_engine import compute_frame

router = APIRouter()
security = HTTPBearer(auto_error=False)
settings = get_settings()

# In-memory sandbox runs (scaffold)
_RUNS: list[SandboxRun] = [
    SandboxRun(
        id="run-001",
        name="whole_locus_verification",
        detail="6,319 blocks · 0 disagreements",
        status="PASS",
        duration_ms=188,
        created_at=datetime.now(timezone.utc),
        provenance={"synthetic": True},
    ),
    SandboxRun(
        id="run-002",
        name="concordance_grade_del52",
        detail="3 sources · supported",
        status="PASS",
        duration_ms=42,
        created_at=datetime.now(timezone.utc),
        provenance={"synthetic": True},
    ),
]


def get_current_operator(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> OperatorOut | None:
    """Optional auth — endpoints work without token in research mode."""
    if credentials is None:
        return None
    payload = decode_token(credentials.credentials)
    if not payload:
        return None
    return OperatorOut(
        username=payload.get("sub", "unknown"),
        role=SEED_OPERATOR["role"],
        display_name=SEED_OPERATOR["display_name"],
    )


def require_operator(
    operator: OperatorOut | None = Depends(get_current_operator),
) -> OperatorOut:
    if operator is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    return operator


@router.get("/health")
async def health():
    return {
        "status": "ok",
        "service": settings.app_name,
        "seal": settings.research_safety_seal,
        "environment": settings.environment,
    }


@router.post("/auth/login", response_model=Token)
async def login(body: LoginRequest):
    if body.username != SEED_OPERATOR["username"] or not verify_password(
        body.password, SEED_OPERATOR["hashed_password"]
    ):
        audit.record(body.username, "login_failed", "auth", {})
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(body.username)
    audit.record(body.username, "login_success", "auth", {})
    return Token(
        access_token=token,
        expires_in_minutes=settings.access_token_expire_minutes,
        role=SEED_OPERATOR["role"],
    )


@router.get("/auth/me", response_model=OperatorOut)
async def me(operator: OperatorOut = Depends(require_operator)):
    return operator


@router.post("/frame/compute", response_model=FrameResult)
async def frame_compute(
    body: FrameRequest,
    operator: OperatorOut | None = Depends(get_current_operator),
):
    result = compute_frame(body)
    actor = operator.username if operator else "anonymous"
    audit.record(
        actor,
        "frame_compute",
        f"exons_{body.start_exon}-{body.end_exon}",
        {"mod3": result.length_mod_3, "status": result.frame_status.value},
    )
    return result


@router.post("/evidence/concordance", response_model=ConcordanceResult)
async def evidence_concordance(
    body: ConcordanceRequest,
    operator: OperatorOut | None = Depends(get_current_operator),
):
    result = await grade_claim(body)
    actor = operator.username if operator else "anonymous"
    audit.record(
        actor,
        "concordance_grade",
        body.variant_claim,
        {"grade": result.grade.value, "lines": len(result.lines)},
    )
    return result


@router.get("/runs", response_model=list[SandboxRun])
async def list_runs(operator: OperatorOut | None = Depends(get_current_operator)):
    return list(reversed(_RUNS))


@router.post("/runs", response_model=SandboxRun)
async def create_run(
    name: str = "adhoc_verification",
    detail: str = "operator-triggered",
    operator: OperatorOut | None = Depends(get_current_operator),
):
    run = SandboxRun(
        id=str(uuid4()),
        name=name,
        detail=detail,
        status="PASS",
        duration_ms=42,
        created_at=datetime.now(timezone.utc),
        provenance={"synthetic": True, "actor": operator.username if operator else "anonymous"},
    )
    _RUNS.append(run)
    actor = operator.username if operator else "anonymous"
    audit.record(actor, "run_create", run.id, {"name": name})
    return run


@router.get("/audit", response_model=list[AuditEvent])
async def list_audit(
    limit: int = 50,
    operator: OperatorOut = Depends(require_operator),
):
    return audit.list_events(limit)
