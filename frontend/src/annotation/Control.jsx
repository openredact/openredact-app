import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import "./Control.sass";
import Dropzone from "./Dropzone";

const AnnotationControl = () => {
  return (
    <Card className="annotation-card" elevation={Elevation.ONE}>
      <Dropzone />
    </Card>
  );
};

export default AnnotationControl;
