import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, "StudentPerformanceFactors_CLEANED.csv")

def load_data():
    return pd.read_csv(DATA_PATH)

def get_summary():
    df = load_data()
    return df.describe().to_dict()

def score_to_gpa(score):
    if score >= 85:
        return 4.0
    elif score >= 75:
        return 3.7
    elif score >= 65:
        return 3.0
    elif score >= 50:
        return 2.0
    else:
        return 1.0

def academic_effort_only():
    df = load_data()

    df["GPA"] = df["Exam_Score"].apply(score_to_gpa)

    cols = [
        "Hours_Studied",
        "Attendance",
        "Sleep_Hours",
        "Exam_Score",
        "Tutoring_Sessions",
        "GPA"
    ]
    return df[cols]

def get_correlation():
    df = academic_effort_only()
    return df.corr(method="pearson").to_dict()

def generate_ai_insights(df):
  
    model, _ = train_model(df) 

    features = ["Hours_Studied", "Attendance", "Sleep_Hours"]
    
    importance = dict(zip(features, model.coef_))

    insights = []
    for f, coef in importance.items():
        if coef > 0:
            insights.append(f"Increasing {f} improves exam scores.")
        else:
            insights.append(f"{f} has a negative effect on exam scores.")

    return {
        "feature_importance": importance,
        "insights": insights
    }

def train_model(df):
    features = ["Hours_Studied", "Attendance", "Sleep_Hours"]
    target = "Exam_Score"

    df = df.dropna(subset=features + [target])

    X = df[features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = LinearRegression()
    model.fit(X_train_scaled, y_train)

    accuracy = model.score(X_test_scaled, y_test)
    print(f"Model Training Complete. Accuracy: {round(accuracy * 100, 2)}%")

    return model, scaler

df_init = academic_effort_only()
trained_model, data_scaler = train_model(df_init)


def get_study_vs_exam():
    df = load_data()
    return df[["Hours_Studied", "Exam_Score"]].dropna().to_dict(orient="records")
