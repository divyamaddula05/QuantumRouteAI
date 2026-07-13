import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { GraphProvider } from "./context/GraphContext";
import { EventProvider } from "./context/EventContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <EventProvider>
        <GraphProvider>
          <App />
        </GraphProvider>
      </EventProvider>
    </BrowserRouter>
  </React.StrictMode>
);