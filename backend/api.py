from __future__ import annotations

import logging
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from pipeline import run_research_pipeline

app = FastAPI(title="ResearchFlow AI API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ResearchRequest(BaseModel):
    topic: str = Field(min_length=3, max_length=500)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/research")
def research(request: ResearchRequest) -> dict[str, Any]:
    topic = request.topic.strip()
    if len(topic) < 3:
        raise HTTPException(status_code=422, detail="Enter a topic with at least 3 characters.")
    try:
        result = run_research_pipeline(topic)
        return {
            "topic": topic,
            "search_results": result["search_results"],
            "scraped_content": result["scraped_content"],
            "report": result["report"],
            "feedback": result["feedback"],
        }
    except Exception as exc:
        logging.exception("Research pipeline failed")
        raise HTTPException(
            status_code=500,
            detail=f"The research pipeline failed: {type(exc).__name__}. Check the backend logs and API configuration.",
        ) from exc
