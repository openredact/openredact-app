import React from "react";
import { render } from "@testing-library/react";
import AnnotationControl from "./AnnotationControl";

it("renders", () => {
  render(
    <AnnotationControl
      paragraphs={[]}
      annotations={[]}
      onAnnotationsChange={() => {}}
      onFileDrop={() => {}}
      isLoading={false}
      tags={[]}
    />
  );
});
