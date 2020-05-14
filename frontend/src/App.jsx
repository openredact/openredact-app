import React from "react";
import "./App.sass";
import NavBar from "./NavBar";
import ConfigMenu from "./ConfigMenu";
import MainView from "./MainView";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="grid-container">
        <ConfigMenu />
        <MainView />
      </div>
    </div>
  );
};

export default App;
