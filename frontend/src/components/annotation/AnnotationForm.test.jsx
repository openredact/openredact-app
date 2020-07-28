import React from "react";
import { render } from "@testing-library/react";
import AnnotationForm from "./AnnotationForm";

it("shows a token", () => {
  const { getByText } = render(
    <AnnotationForm
      paragraphs={[
        {
          htmlProps: {},
          tokens: [
            {
              startChar: 0,
              endChar: 7,
              text: "MyToken",
              hasWs: false,
              hasBr: false,
            },
          ],
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
      paragraphs={[]}
      annotations={[]}
      onAnnotationsChange={() => {}}
      tags={["MyTag"]}
    />
  );
  const tag = getByText("MyTag");
  expect(tag).toBeInTheDocument();
});
