import { Home, BarChart2, Brain, LineChart } from "lucide-react"; 
import { Link, useLocation } from "react-router-dom"; 

function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white shadow-xl p-6 hidden md:block">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        Student Dashboard
      </h1>

      <ul className="space-y-3 text-gray-700">
        <SidebarItem 
          icon={<Home size={20} />} 
          text="Overview" 
          to="/" 
          active={location.pathname === "/"} 
        />
        <SidebarItem 
          icon={<BarChart2 size={20} />} 
          text="Correlation" 
          to="/correlation" 
          active={location.pathname === "/correlation"} 
        />
        <SidebarItem 
          icon={<Brain size={20} />} 
          text="AI Insights" 
          to="/ai-advanced" 
          active={location.pathname === "/ai-advanced"} 
        />
        <SidebarItem 
          icon={<LineChart size={20} />} 
          text="Prediction" 
          to="/prediction" 
          active={location.pathname === "/prediction"} 
        />
      </ul>
    </div>
  );
}

function SidebarItem({ icon, text, to, active }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
        ${active ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}`}
      >
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  );
}

export default Sidebar;