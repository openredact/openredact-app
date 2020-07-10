import React from "react";
import { render } from "@testing-library/react";
import { fetchRecognizers, fetchTags } from "../api/routes";
import App from "./App";

jest.mock("../api/routes");
fetchTags.mockResolvedValue({ data: ["PER"] });
fetchRecognizers.mockResolvedValue({ data: ["DummyRecognizer"] });

afterEach(() => {
  jest.clearAllMocks();
});

it("renders", () => {
  render(<App />);
  expect(fetchTags).toHaveBeenCalledTimes(1);
  expect(fetchRecognizers).toHaveBeenCalledTimes(1);
});
