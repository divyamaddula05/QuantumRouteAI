import {
  Home,
  Network,
  BarChart3,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  return (

    <div className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        QuantumRoute AI
      </div>

      <div className="p-4 space-y-3">

        <Link
          to="/"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            location.pathname === "/"
              ? "bg-slate-800"
              : "hover:bg-slate-800"
          }`}
        >
          <Home size={20} />
          Dashboard
        </Link>

        <Link
          to="/network"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            location.pathname === "/network"
              ? "bg-slate-800"
              : "hover:bg-slate-800"
          }`}
        >
          <Network size={20} />
          Quantum Network
        </Link>

        <Link
          to="/analytics"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            location.pathname === "/analytics"
              ? "bg-slate-800"
              : "hover:bg-slate-800"
          }`}
        >
          <BarChart3 size={20} />
          Analytics
        </Link>

      </div>

    </div>

  );
}

export default Sidebar;