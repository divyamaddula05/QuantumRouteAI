import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { useGraph } from "../context/GraphContext";
import { calculateNetworkHealth } from "../utils/networkHealth";
import FailurePrediction from "../components/FailurePrediction";
function Analytics() {
  const { nodes, edges } = useGraph();

  const health = calculateNetworkHealth(edges);

  const fidelityData = edges.map((edge: any) => ({
    name: `${edge.source}→${edge.target}`,
    fidelity: Number(
      ((edge.data?.fidelity ?? 0.95) * 100).toFixed(1)
    ),
  }));

  const probabilityData = edges.map((edge: any) => ({
    name: `${edge.source}→${edge.target}`,
    probability: Number(
      ((edge.data?.probability ?? 0.95) * 100).toFixed(1)
    ),
  }));

  const distanceData = edges.map((edge: any) => ({
    name: `${edge.source}→${edge.target}`,
    distance:
      edge.data?.distance ??
      Number(String(edge.label).replace(" km", "")) ??
      0,
  }));

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Topbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            📊 Quantum Analytics Dashboard
          </h1>

          <div className="grid grid-cols-2 gap-6">

            {/* Fidelity */}

            <div className="bg-white rounded-xl shadow p-5">

              <h2 className="text-xl font-bold mb-5">
                Fidelity Trend
              </h2>

              <ResponsiveContainer width="100%" height={300}>

                <LineChart data={fidelityData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis domain={[0, 100]} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="fidelity"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

            {/* Probability */}

            <div className="bg-white rounded-xl shadow p-5">

              <h2 className="text-xl font-bold mb-5">
                Success Probability
              </h2>

              <ResponsiveContainer width="100%" height={300}>

                <BarChart data={probabilityData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis domain={[0, 100]} />

                  <Tooltip />

                  <Bar
                    dataKey="probability"
                    fill="#16a34a"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

            {/* Distance */}

            <div className="bg-white rounded-xl shadow p-5">

              <h2 className="text-xl font-bold mb-5">
                Link Distance
              </h2>

              <ResponsiveContainer width="100%" height={300}>

                <BarChart data={distanceData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="distance"
                    fill="#f97316"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

            {/* Network Summary */}

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold mb-6">
                🌐 Network Summary
              </h2>

              <div className="grid grid-cols-2 gap-5">

                <div>
                  <p className="text-gray-500">Nodes</p>
                  <h3 className="text-2xl font-bold">
                    {nodes.length}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">Links</p>
                  <h3 className="text-2xl font-bold">
                    {edges.length}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Weak Links
                  </p>
                  <h3 className="text-2xl font-bold text-red-600">
                    {health.weakLinks}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Average Fidelity
                  </p>

                  <h3 className="text-2xl font-bold">
                    {(health.averageFidelity * 100).toFixed(1)}%
                  </h3>

                </div>

                <div>
                  <p className="text-gray-500">
                    Average Probability
                  </p>

                  <h3 className="text-2xl font-bold">
                    {(health.averageProbability * 100).toFixed(1)}%
                  </h3>

                </div>

                <div>
                  <p className="text-gray-500">
                    Estimated Latency
                  </p>

                  <h3 className="text-2xl font-bold">
                    {health.latency} ms
                  </h3>

                </div>

              </div>


              <div className="mt-8">

                <p className="text-gray-500">
                  Network Status
                </p>

                <span
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    health.status === "Healthy"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {health.status}
                </span>

              </div>
              <FailurePrediction />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;