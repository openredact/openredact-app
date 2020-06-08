import React from "react";
import ReactDOM from "react-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import "./index.css";
import App from "./components/App";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
