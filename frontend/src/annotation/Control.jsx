import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import "./Control.sass";
import Dropzone from "./Dropzone";
import AnnotationForm from "./AnnotationForm";

const AnnotationControl = () => {
  return (
    <Card className="annotation-card" elevation={Elevation.ONE}>
      <Dropzone />
      <AnnotationForm
        initialAnnotations={[{ start: 2, end: 4, tag: "PERSON" }]}
        tokens={[
          "My",
          "text",
          "needs",
          "annotating",
          "for",
          "NLP",
          "training",
          ".",
          "And",
          "much",
          "more",
          "!!!",
        ]}
        tags={["ORG", "PERSON", "LOC", "TIME"]}
      />
    </Card>
  );
};

export default AnnotationControl;
