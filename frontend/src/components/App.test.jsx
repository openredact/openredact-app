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
