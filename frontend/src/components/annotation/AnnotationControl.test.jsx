import React from "react";
import { render } from "@testing-library/react";
import AnnotationControl from "./AnnotationControl";

it("renders", () => {
  render(
    <AnnotationControl
      tokens={[]}
      annotations={[]}
      computedAnnotations={[]}
      onAnnotationsChange={() => {}}
      onFileDrop={() => {}}
      onCancel={() => {}}
      isLoading={false}
      tags={[]}
    />
  );
});
