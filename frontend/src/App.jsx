import React from "react";
import "./App.css";

function App() {
  const name = "Test";
  const element = <h1>Hello, {name}</h1>;
  return <div className="App">{element}</div>;
}

export default App;
