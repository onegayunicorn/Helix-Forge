"""Helix Forge configuration — research informatics only."""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Helix Forge API"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    research_safety_seal: str = "RESEARCH INFORMATICS ONLY — NOT FOR CLINICAL DIAGNOSIS"

    # Auth
    secret_key: str = "change-me-in-production-helix-forge-dev-secret"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 8  # 8 h operator shift

    # External evidence adapters (empty = synthetic offline mode)
    lovd_api_base: str = ""
    lovd_api_key: str = ""
    clinvar_api_base: str = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
    clinvar_api_key: str = ""

    # Persistence
    database_url: str = "sqlite+aiosqlite:///./helix_forge.db"
    redis_url: str = "redis://localhost:6379/0"

    # CORS for portal
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://helixforge-eoefmcgu.manus.space",
    ]


@lru_cache
def get_settings() -> Settings:
    return Settings()
