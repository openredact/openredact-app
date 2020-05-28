import React from "react";
import { render } from "@testing-library/react";
import AnnotationForm from "./AnnotationForm";

it("shows a token", () => {
  const { getByText } = render(
    <AnnotationForm
      tokens={[
        {
          start_char: 0,
          end_char: 7,
          text: "MyToken",
          has_ws: false,
        },
      ]}
      annotations={[]}
      onAnnotationsChange={() => {}}
      tags={[]}
    />
  );
  const token = getByText("MyToken");
  expect(token).toBeInTheDocument();
});

it("shows a tag", () => {
  const { getByText } = render(
    <AnnotationForm
      tokens={[]}
      annotations={[]}
      onAnnotationsChange={() => {}}
      tags={["MyTag"]}
    />
  );
  const tag = getByText("MyTag");
  expect(tag).toBeInTheDocument();
});
