import {
  Home,
  Network,
  BarChart3,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        QuantumRoute AI
      </div>

      <div className="p-4 space-y-3">

        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800">
          <Home size={20} />
          Dashboard
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
          <Network size={20} />
          Quantum Network
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
          <BarChart3 size={20} />
          Analytics
        </div>

      </div>

    </div>
  );
}

export default Sidebar;