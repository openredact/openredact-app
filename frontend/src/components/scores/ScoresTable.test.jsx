import React from "react";
import { render } from "@testing-library/react";
import ScoresTable from "./ScoresTable";

it("renders", () => {
  const { getByText } = render(
    <ScoresTable scores={{ total: { f2: 1.0 }, tags: {} }} />
  );
  const tag = getByText(/total/i);
  expect(tag).toBeInTheDocument();
  const metric = getByText(/f2/i);
  expect(metric).toBeInTheDocument();
  const value = getByText("1.00");
  expect(value).toBeInTheDocument();
});
