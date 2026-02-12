import { useEffect, useState } from "react";

function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/summary")
      .then(res => res.json())
      .then(data => {
        console.log("Summary API:", data);
        setStats(data);
      })
      .catch(err => console.error("API Error:", err));
  }, []);

  if (!stats) return <p className="text-center text-gray-500">Loading stats...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h3 className="text-sm text-gray-500">Avg Exam Score</h3>
        <p className="text-3xl font-bold text-blue-600">
          {stats.Exam_Score.mean?.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h3 className="text-sm text-gray-500">Avg Study Hours</h3>
        <p className="text-3xl font-bold text-green-600">
          {stats.Hours_Studied?.mean?.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h3 className="text-sm text-gray-500">Avg Attendance</h3>
        <p className="text-3xl font-bold text-purple-600">
          {stats.Attendance?.mean?.toFixed(2)}%
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h3 className="text-sm text-gray-500">Total Students</h3>
        <p className="text-3xl font-bold text-red-600">
          {stats.Exam_Score?.count}
        </p>
      </div>

    </div>
  );
}

export default StatsCards;
