import React from "react";
import { render } from "@testing-library/react";
import Dropzone from "./Dropzone";

it("renders", () => {
  const { getByText } = render(<Dropzone onFileDrop={() => {}} />);
  const dropzone = getByText(/\.txt/i);
  expect(dropzone).toBeInTheDocument();
});
