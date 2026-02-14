import { useState } from "react";
import {
  Calculator,
  RotateCcw,
  Target,
  GraduationCap,
  Clock,
  Percent,
  Moon,
  Sparkles
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Prediction() {
  const initialFormState = {
    Hours_Studied: 10,
    Attendance: 80,
    Sleep_Hours: 7,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionHistory, setPredictionHistory] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setResult(null);
    setPredictionHistory([]);
  };

  const getRecommendation = (gpa) => {
    if (gpa >= 4.0) return { text: "Elite Performance! Top academic bracket.", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (gpa >= 3.7) return { text: "Excellent! Dean's List potential.", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (gpa >= 3.0) return { text: "Good. Increase study hours for 4.0.", color: "text-indigo-500", bg: "bg-indigo-500/10" };
    if (gpa >= 2.0) return { text: "Average. Improve attendance.", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { text: "High Risk! Academic intervention needed.", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Hours_Studied: parseFloat(formData.Hours_Studied),
          Attendance: parseFloat(formData.Attendance),
          Sleep_Hours: parseFloat(formData.Sleep_Hours),
        }),
      });

      const data = await response.json();
      setResult(data);

      // Save prediction history for chart
      setPredictionHistory((prev) => [
        ...prev,
        {
          Hours_Studied: formData.Hours_Studied,
          Predicted_Score: data.predicted_exam_score,
        },
      ]);

    } catch (error) {
      console.error("Prediction error:", error);
      alert("Backend error. Make sure FastAPI is running.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border">

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
            <Calculator size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold"> Grade Prediction Module</h2>
            <p className="text-gray-900 text-sm">Simulate student habits & predict academic performance</p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Clock size={16} className="text-blue-500" /> Study Hours / Week
            </label>
            <input type="range" min="0" max="50" name="Hours_Studied" value={formData.Hours_Studied} onChange={handleChange} className="w-full accent-blue-600" />
            <p className="text-sm text-gray-500">{formData.Hours_Studied} hours</p>
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Percent size={16} className="text-green-500" /> Attendance %
            </label>
            <input type="range" min="0" max="100" name="Attendance" value={formData.Attendance} onChange={handleChange} className="w-full accent-green-600" />
            <p className="text-sm text-gray-500">{formData.Attendance}%</p>
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Moon size={16} className="text-purple-500" /> Sleep Hours / Day
            </label>
            <input type="range" min="0" max="12" name="Sleep_Hours" value={formData.Sleep_Hours} onChange={handleChange} className="w-full accent-purple-600" />
            <p className="text-sm text-gray-500">{formData.Sleep_Hours} hours</p>
          </div>

        </div>

        <div className="flex gap-4 mt-8">
          <button onClick={handlePredict} disabled={loading} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg">
            {loading ? "AI Processing..." : "Predict Academic Performance"}
          </button>

          <button onClick={handleReset} className="px-6 py-4 border rounded-xl flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800">
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </div>
      

      {result && (
        <div className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl">
              <span className="font-bold">Predicted Exam Score</span>
              <p className="text-5xl font-black mt-2">{result.predicted_exam_score}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-2xl text-white shadow-xl">
              <span className="font-bold">Projected GPA</span>
              <p className="text-5xl font-black mt-2">{result.predicted_gpa}</p>
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${getRecommendation(result.predicted_gpa).bg}`}>
            <p className={`text-xl font-bold ${getRecommendation(result.predicted_gpa).color}`}>
              {getRecommendation(result.predicted_gpa).text}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-xl text-black font-bold mb-4">📈 Prediction Simulation Chart</h3>

            {predictionHistory.length === 0 ? (
              <p className="text-gray-900">Run prediction to visualize  simulation trend.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Hours_Studied" label={{ value: "Study Hours", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Predicted Score", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Predicted_Score" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Prediction;
