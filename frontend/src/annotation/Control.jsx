import React from "react";
import { Card, Elevation, FileInput } from "@blueprintjs/core";
import "./Control.sass";

const AnnotationControl = () => {
  return (
    <Card className="annotation-card" elevation={Elevation.ONE}>
      <FileInput text="Choose file..." buttonText="Browse your computer" fill />
    </Card>
  );
};

export default AnnotationControl;
