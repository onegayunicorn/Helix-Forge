"""Helix Forge FastAPI entrypoint."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints import router as v1_router
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description=(
        "Digital twin workbench for DMD genomic research. "
        "All outputs are research informatics predictions with full provenance — "
        "NOT clinical diagnostic determinations."
    ),
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router, prefix=settings.api_v1_prefix)


@app.get("/")
async def root():
    return {
        "service": settings.app_name,
        "docs": "/docs",
        "api": settings.api_v1_prefix,
        "seal": settings.research_safety_seal,
    }
