import React from "react";
import "./App.sass";
import Polyglot from "node-polyglot";
import NavBar from "./NavBar";
import ConfigMenu from "./ConfigMenu";
import Main from "./Main";
import de from "../translations/de";
import PolyglotContext from "../js/polyglotContext";

const polyglot = new Polyglot({ phrases: de, locale: "de" });

const App = () => {
  return (
    <PolyglotContext.Provider
      value={{ t: (key, options) => polyglot.t(key, options) }}
    >
      <NavBar />
      <div className="grid-container">
        <ConfigMenu />
        <Main />
      </div>
    </PolyglotContext.Provider>
  );
};

export default App;
