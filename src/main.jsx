import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GetApi from "./Service/GetApi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GetApi>
      <App />
    </GetApi>
  </React.StrictMode>
);
