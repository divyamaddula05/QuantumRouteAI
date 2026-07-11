import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCards from "../components/DashboardCards";
import RouteResult from "../components/RouteResult";
import NetworkCanvas from "../components/NetworkCanvas";
import RoutingPanel from "../components/RoutingPanel";

import api from "../services/api";

function Dashboard() {

  const [route, setRoute] = useState<any>(null);

  const [source, setSource] = useState("Alice");

  const [destination, setDestination] = useState("Bob");

  const findRoute = async () => {
  try {
    console.log("Sending request...");

    const response = await api.get("/best-route", {
      params: {
        source,
        destination,
      },
    });

    console.log("Backend Response:", response.data);

    setRoute(response.data);
  } catch (error: any) {
    console.error("API Error:", error);
    console.error("Response:", error.response);

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
            nodes={4}
            links={4}
            fidelity={route ? route.fidelity : 0}
            success={route ? route.probability * 100 : 0}
          />

          <div className="grid grid-cols-4 gap-5 mt-6">

            <div className="col-span-3">

              <NetworkCanvas route={route} />

            </div>

            <div className="space-y-5">

              <RoutingPanel
                source={source}
                destination={destination}
                setSource={setSource}
                setDestination={setDestination}
                findRoute={findRoute}
              />

              <RouteResult route={route} />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;