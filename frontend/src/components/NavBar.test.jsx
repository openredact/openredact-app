import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import PolyglotContext from "../js/polyglotContext";

it("renders help", () => {
  const { getByTitle } = render(
    <PolyglotContext.Provider value={{ t: (x) => x }}>
      <NavBar />
    </PolyglotContext.Provider>
  );
  const help = getByTitle(/help/i);
  expect(help).toBeInTheDocument();
});
