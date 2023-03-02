import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/Social-Media-App">
    <App />
  </BrowserRouter>
);
// replaced browserrouter with hashrouter because the the homepage was 404 not found
