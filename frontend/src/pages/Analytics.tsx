import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const fidelityData = [
  { name: "1", fidelity: 94 },
  { name: "2", fidelity: 92 },
  { name: "3", fidelity: 95 },
  { name: "4", fidelity: 93 },
  { name: "5", fidelity: 97 },
];

const probabilityData = [
  { name: "R1", probability: 96 },
  { name: "R2", probability: 93 },
  { name: "R3", probability: 89 },
];

function Analytics() {

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">

        📊 Quantum Analytics

      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="font-bold mb-5">

            Fidelity Trend

          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={fidelityData}>

              <XAxis dataKey="name"/>

              <YAxis/>

              <Tooltip/>

              <Line
                dataKey="fidelity"
                stroke="#2563eb"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="font-bold mb-5">

            Link Probability

          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={probabilityData}>

              <XAxis dataKey="name"/>

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="probability"
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}

export default Analytics;