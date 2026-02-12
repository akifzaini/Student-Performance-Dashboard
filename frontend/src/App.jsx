import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StatsCards from "./components/StatsCards";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Overview from "./Pages/Overview";
import CorrelationHeatmap from "./Pages/CorrelationHeatmap";
import StudyVsExam from "./Pages/StudyVsExam";
import AdvancedAI from "./Pages/AdvancedAI";

function App() {
  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">

        <Sidebar />

        <div className="flex-1">
          <Header />

          <div className="p-6">
            <StatsCards />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/study-vs-exam" element={<StudyVsExam />} />
              <Route path="/correlation" element={<CorrelationHeatmap />} />
              <Route path="/ai-advanced" element={<AdvancedAI />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
