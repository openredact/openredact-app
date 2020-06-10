import React from "react";
import { render } from "@testing-library/react";
import { fetchTags } from "../api/routes";
import App from "./App";

jest.mock("../api/routes");
fetchTags.mockResolvedValue({ data: ["PER"] });

afterEach(() => {
  jest.clearAllMocks();
});

it("renders", () => {
  render(<App />);
  expect(fetchTags).toHaveBeenCalledTimes(1);
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
  expect(fetchTags).toHaveBeenCalledTimes(1);
});
