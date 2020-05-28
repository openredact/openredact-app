import React from "react";
import { render } from "@testing-library/react";
import TextPreview from "./TextPreview";

it("renders preview text", () => {
  const text = "This is a sample text.";
  const { getByText } = render(<TextPreview text={text} />);
  const element = getByText(text);
  expect(element).toBeInTheDocument();
});
