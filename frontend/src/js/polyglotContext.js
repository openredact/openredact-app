import React from "react";

const PolyglotContext = React.createContext((key, options = {}) =>
  options === {} ? key : key + JSON.stringify(options)
);

export default PolyglotContext;
