import React from "react";
import "./App.sass";
import NavBar from "./NavBar";
import ConfigMenu from "./ConfigMenu";
import Main from "./Main";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="grid-container">
        <ConfigMenu />
        <Main />
      </div>
    </div>
  );
};

export default App;
