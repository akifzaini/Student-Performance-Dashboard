import { useEffect, useState } from "react";

function AdvancedAI(){
    const [ai, setAI] = useState(null);

    useEffect(() => {
    fetch("http://127.0.0.1:8000/ai-advanced")
      .then(res => res.json())
      .then(data => setAI(data));
    }, []);

  if (!ai) return <p>Loading AI insights...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">AI Insights</h2>

      <h3 className="font-semibold">Feature Importance:</h3>
      <ul className="mb-4">
        {Object.entries(ai.feature_importance).map(([key, val]) => (
          <li key={key}>
            {key}: {val.toFixed(3)}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold">Interpretation:</h3>
      <ul className="list-disc ml-5">
        {ai.insights.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdvancedAI;