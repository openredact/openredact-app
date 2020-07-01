import React from "react";
import PolyglotContext from "../js/polyglotContext";
import App from "./App";
import { polyglot, updateLocale } from "../translations/utils";

const t = (key, options) => polyglot.t(key, options);

const LocalizationWrapper = () => {
  updateLocale(polyglot);

  return (
    <PolyglotContext.Provider value={t}>
      <App />
    </PolyglotContext.Provider>
  );
};

export default LocalizationWrapper;
