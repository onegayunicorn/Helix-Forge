"""In-memory audit log (scaffold). Replace with PostgreSQL in production."""

from datetime import datetime, timezone
from uuid import uuid4

from app.core.config import get_settings
from app.models.schemas import AuditEvent

_AUDIT: list[AuditEvent] = []


def record(actor: str, action: str, resource: str, detail: dict | None = None) -> AuditEvent:
    settings = get_settings()
    event = AuditEvent(
        id=str(uuid4()),
        actor=actor,
        action=action,
        resource=resource,
        detail=detail or {},
        timestamp=datetime.now(timezone.utc),
        research_seal=settings.research_safety_seal,
    )
    _AUDIT.append(event)
    # Keep last 500 for demo
    if len(_AUDIT) > 500:
        _AUDIT.pop(0)
    return event


def list_events(limit: int = 50) -> list[AuditEvent]:
    return list(reversed(_AUDIT[-limit:]))
