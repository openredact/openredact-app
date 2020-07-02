import React from "react";
import { render } from "@testing-library/react";
import ScoresDialog from "./ScoresDialog";

it("renders button", () => {
  const { getByRole } = render(
    <ScoresDialog annotations={[]} goldAnnotations={[]} />
  );
  const button = getByRole("button");
  expect(button).toBeInTheDocument();
});
