import React from "react";
import "./App.sass";
import NavBar from "./NavBar";
import ConfigMenu from "./ConfigMenu";
import MainView from "./MainView";

function App() {
  return (
    <div>
      <NavBar />
      <ConfigMenu />
      <MainView />
    </div>
  );
}

export default App;
