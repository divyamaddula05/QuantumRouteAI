import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import QuantumNetwork from "../components/QuantumNetwork";
import LinkEditor from "../components/LinkEditor";

function QuantumNetworkPage() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Topbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Quantum Network Designer
          </h1>

          <QuantumNetwork route={null} />

        </div>

      </div>

    </div>
  );
}

export default QuantumNetworkPage;