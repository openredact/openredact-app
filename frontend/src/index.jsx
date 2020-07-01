import React from "react";
import ReactDOM from "react-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import "./index.css";
import LocalizationWrapper from "./components/LocalizationWrapper";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <React.StrictMode>
    <LocalizationWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);
