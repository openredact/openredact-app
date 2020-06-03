import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

it("renders", () => {
  render(<App />);
});

it("shows translations in the correct language", () => {
  // mock language
  Object.defineProperty(navigator, "language", {
    get() {
      return "de";
    },
  });

  const { getByTitle } = render(<App />);
  const help = getByTitle(/Hilfe/);
  expect(help).toBeInTheDocument();
});
