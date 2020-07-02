import React from "react";
import { render } from "@testing-library/react";
import ScoresDialogBody from "./ScoresDialogBody";

it("renders", () => {
  const { getByText } = render(
    <ScoresDialogBody annotations={[]} goldAnnotations={[]} />
  );
  const text = getByText(/annotation\.scores/);
  expect(text).toBeInTheDocument();
});
