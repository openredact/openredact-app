import React from "react";
import "./App.sass";
import NavBar from "./NavBar";
import ConfigMenu from "./ConfigMenu";
import Main from "./Main";
import PolyglotContext from "../js/polyglotContext";
import { polyglot, updateLocale } from "../translations/utils";

const App = () => {
  updateLocale(polyglot);

  return (
    <PolyglotContext.Provider
      value={(key, options) => polyglot.t(key, options)}
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
