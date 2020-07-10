import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";

it("renders help", () => {
  const { getByTitle } = render(
    <NavBar
      availableRecognizers={[]}
      activatedRecognizers={[]}
      setActivatedRecognizers={[]}
    />
  );
  const help = getByTitle(/help/i);
  expect(help).toBeInTheDocument();
});
