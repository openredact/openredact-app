import React from "react";
import { render } from "@testing-library/react";
import Scores from "./Scores";

it("renders a score", () => {
  const { getByText } = render(<Scores scores={{ total: { f2: 1.0 } }} />);
  const f2Score = getByText(/f2/i);
  expect(f2Score).toBeInTheDocument();
});
