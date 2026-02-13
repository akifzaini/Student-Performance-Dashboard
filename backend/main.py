import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 

from backend.analysis import (
    get_summary,
    academic_effort_only,
    get_correlation,
    generate_ai_insights,
    get_study_vs_exam,
    trained_model, 
    data_scaler,       
    score_to_gpa          
)

app = FastAPI(title="Student Academic Performance API")

df = pd.read_csv("backend/StudentPerformanceFactors_CLEANED.csv")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictInput(BaseModel):
    Hours_Studied: float
    Attendance: float
    Sleep_Hours: float

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
        return {"total": 0}
    return {
        "total": len(df),
        "average_exam_score": round(df["Exam_Score"].mean(), 2)
    }

@app.post("/predict-score")
def predict_score(data: PredictInput):
    try:
        input_data = [[data.Hours_Studied, data.Attendance, data.Sleep_Hours]]
        
        scaled_input = data_scaler.transform(input_data)
        
        prediction = trained_model.predict(scaled_input)[0]

        prediction = max(0, min(100, prediction))
        
        gpa = score_to_gpa(prediction)

        return {
            "predicted_exam_score": round(float(prediction), 2),
            "predicted_gpa": gpa
        }
    except Exception as e:
        return {"error": str(e)}, 500

@app.get("/ai-advanced")
def ai_advanced():
    df_model = academic_effort_only()
    return generate_ai_insights(df_model)

@app.get("/study-vs-exam")
def study_vs_exam():
    return get_study_vs_exam()
