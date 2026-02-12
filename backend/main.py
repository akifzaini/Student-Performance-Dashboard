import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.analysis import (
    get_summary,
    academic_effort_only,
    get_correlation,
    generate_ai_insights,
    get_study_vs_exam
)

app = FastAPI(title="Student Academic Performance API")

df = pd.read_csv("backend/StudentPerformanceFactors_CLEANED.csv")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API is running"}

@app.get("/summary")
def summary():
    return get_summary()

@app.get("/academic-effort")
def academic_effort():
    return academic_effort_only().to_dict(orient="records")

@app.get("/correlation")
def correlation():
    return get_correlation()

@app.get("/stats")
def get_stats():
    if df.empty:
        return {"total": 0, "message": "No data available"}
    stats_data = {
        "total": len(df),
        "average_score": round(df["GPA"].mean(), 2) if "GPA" in df.columns else 0
    }
    return stats_data

@app.get("/ai-advanced") 
def ai_advanced(): 
    df = academic_effort_only() 
    return generate_ai_insights(df)

@app.get("/study-vs-exam")
def study_vs_exam():
    return get_study_vs_exam()
