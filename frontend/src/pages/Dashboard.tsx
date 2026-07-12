import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCards from "../components/DashboardCards";
import NetworkCanvas from "../components/NetworkCanvas";
import RoutingPanel from "../components/RoutingPanel";
import RouteResult from "../components/RouteResult";
import { calculateNetworkHealth } from "../utils/networkHealth";
import { useGraph } from "../context/GraphContext";
import NetworkHealth from "../components/NetworkHealth";
import api from "../services/api";

function Dashboard() {
  const { nodes, edges } = useGraph();
  const health = calculateNetworkHealth(edges);


  const [route, setRoute] = useState<any>(null);

  const [source, setSource] = useState("Alice");

  const [destination, setDestination] = useState("Bob");

  const [algorithm, setAlgorithm] = useState("Shortest Path");

  const findRoute = async () => {
    try {
      const response = await api.post("/best-route", {
        nodes: nodes.map((node: any) => ({
          id: node.id,
          label: node.data.label,
        })),

        edges: edges.map((edge: any) => ({
            source: edge.source,
            target: edge.target,
            distance: edge.data?.distance ?? 40,
            fidelity: edge.data?.fidelity ?? 0.95,
            probability: edge.data?.probability ?? 0.95,
        })),

        source,
        destination,
        algorithm,
      });

      console.log(response.data);

      setRoute(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to calculate route");
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Topbar />

        <div className="p-6">

          <DashboardCards
              nodes={nodes.length}
              links={edges.length}
              fidelity={health.averageFidelity}
              success={health.averageProbability * 100}
          />

          <div className="grid grid-cols-4 gap-5 mt-6">

            <div className="col-span-3">

              <NetworkCanvas
                route={route}
              />

            </div>

            <div className="space-y-5">

              <RoutingPanel
                source={source}
                destination={destination}
                algorithm={algorithm}
                setSource={setSource}
                setDestination={setDestination}
                setAlgorithm={setAlgorithm}
                findRoute={findRoute}
              />

              <RouteResult
                route={route}
              />
              <NetworkHealth
                health={health}
                nodes={nodes.length}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;