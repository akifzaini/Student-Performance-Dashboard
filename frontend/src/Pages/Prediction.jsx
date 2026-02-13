import { useState } from "react";
import { Calculator, RotateCcw, Target, GraduationCap, Clock, Percent, Moon, Sparkles } from "lucide-react";

function Prediction() {
  const initialFormState = {
    Hours_Studied: "",
    Attendance: "",
    Sleep_Hours: "",
  };

  const [formData, setFromData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFromData(initialFormState);
    setResult(null);
  };

  const getRecommendation = (gpa) => {
    if (gpa >= 4.0) return { text: "Elite Performance! You're hitting the highest bracket.", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (gpa >= 3.7) return { text: "Excellent! You are safely in the Dean's List range.", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (gpa >= 3.0) return { text: "Solid Standing. A few more study hours could push you to 4.0.", color: "text-indigo-500", bg: "bg-indigo-500/10" };
    if (gpa >= 2.0) return { text: "Passing. Focus on increasing attendance to boost your score.", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { text: "Urgent: Significant improvement in study habits needed.", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const handlePredict = async () => {
    if (!formData.Hours_Studied || !formData.Attendance || !formData.Sleep_Hours) {
      alert("Please fill in all habits before calculating.");
      return;
    }

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
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Backend error. Make sure your Python server is running.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 text-white rounded-lg">
            <Calculator size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Grade Predictor</h2>
            <p className="text-gray-500 text-sm">Based on historical student performance data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Clock size={16} className="text-blue-500" /> Study Hours
            </label>
            <input
              type="number"
              name="Hours_Studied"
              value={formData.Hours_Studied}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Percent size={16} className="text-green-500" /> Attendance (%)
            </label>
            <input
              type="number"
              name="Attendance"
              value={formData.Attendance}
              onChange={handleChange}
              placeholder="0-100"
              className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Moon size={16} className="text-purple-500" /> Sleep Hours
            </label>
            <input
              type="number"
              name="Sleep_Hours"
              value={formData.Sleep_Hours}
              onChange={handleChange}
              placeholder="e.g. 7"
              className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {loading ? "Processing..." : "Calculate Prediction"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition flex items-center gap-2 font-medium"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-100 text-sm font-bold uppercase tracking-wider">Estimated Score</span>
                <Target size={24} className="text-blue-200" />
              </div>
              <p className="text-5xl font-black">{result.predicted_exam_score}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-2xl text-white shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-emerald-100 text-sm font-bold uppercase tracking-wider">Projected GPA</span>
                <GraduationCap size={24} className="text-emerald-200" />
              </div>
              <p className="text-5xl font-black">{result.predicted_gpa}</p>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border-2 flex items-center gap-4 ${getRecommendation(result.predicted_gpa).bg} ${getRecommendation(result.predicted_gpa).color.replace('text', 'border')} shadow-sm`}>
             <Sparkles size={28} />
             <p className={`text-xl font-bold`}>
               {getRecommendation(result.predicted_gpa).text}
             </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prediction;