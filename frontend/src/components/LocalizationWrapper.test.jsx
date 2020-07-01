import React from "react";
import { render } from "@testing-library/react";
import LocalizationWrapper from "./LocalizationWrapper";

it("shows translations in the correct language", () => {
  // mock language
  Object.defineProperty(navigator, "language", {
    get() {
      return "de";
    },
  });

  const { getByTitle } = render(<LocalizationWrapper />);
  const help = getByTitle(/Hilfe/);
  expect(help).toBeInTheDocument();
});
