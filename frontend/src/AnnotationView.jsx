import React from "react";
import { Card, Elevation, FileInput } from "@blueprintjs/core";
import "./AnnotationView.sass";

function AnnotationView() {
  return (
    <Card className="annotation-view" elevation={Elevation.ONE}>
      <FileInput text="Choose file..." buttonText="Browse your computer" fill />
    </Card>
  );
}

export default AnnotationView;
