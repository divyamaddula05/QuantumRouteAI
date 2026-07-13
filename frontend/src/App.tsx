import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import QuantumNetworkPage from "./pages/QuantumNetworkPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/network" element={<QuantumNetworkPage />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;