import React from "react";
import { render } from "@testing-library/react";
import ScoresDialog from "./ScoresDialog";

it("renders a score", () => {
  const { getByRole, getByText } = render(
    <ScoresDialog scores={{ total: { f2: 1.0 } }} />
  );
  const button = getByRole("button");
  button.click();
  const score = getByText(/f2/i);
  expect(score).toBeInTheDocument();
});
