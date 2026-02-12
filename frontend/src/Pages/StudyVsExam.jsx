import { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function StudyVsExam() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/study-vs-exam")
        .then(res => res.json())
        .then(data => {
            console.log("Study vs Exam API:", data); 
            setData(data); 
        })
        .catch(err => console.error("API Error:", err));
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Study Hours vs Exam Score</h2>

            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="Hours_Studied" name="Study Hours" unit="hrs" /> 
                        <YAxis type="number" dataKey="Exam_Score" name="Exam Score" unit="%" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Student Data" data={data} fill="#6366f1" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StudyVsExam;