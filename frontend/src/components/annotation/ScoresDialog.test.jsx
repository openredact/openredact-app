import React from "react";
import { render } from "@testing-library/react";
import ScoresDialog from "./ScoresDialog";

it("can open dialog", () => {
  const { getByRole, getByLabelText } = render(
    <ScoresDialog annotations={[]} goldAnnotations={[]} />
  );
  const button = getByRole("button");
  button.click();
  const closeButton = getByLabelText(/close/i);
  expect(closeButton).toBeInTheDocument();
});
