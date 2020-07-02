import React from "react";
import { render } from "@testing-library/react";
import ScoresDialogButton from "./ScoresDialogButton";

it("renders button", () => {
  const { getByRole } = render(<ScoresDialogButton setShowDialog={() => {}} />);
  const button = getByRole("button");
  expect(button).toBeInTheDocument();
});
