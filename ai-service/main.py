from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from evaluator import evaluate
from services.piston_client import run_code

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5203", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class EvaluateRequest(BaseModel):
    code: str
    language: str = "python"
    test_results: str | None = None  # optional: pass pre-computed results, or let us execute

@app.post("/evaluate")
def run_evaluation(payload: EvaluateRequest):
    results = payload.test_results or run_code(payload.code, payload.language)
    result = evaluate(payload.code, results)
    total = round((result["logic"] + result["style"] + result["practices"]) / 3)
    return {**result, "total": total, "execution_output": results}

@app.get("/health")
def health():
    return {"status": "ok"}