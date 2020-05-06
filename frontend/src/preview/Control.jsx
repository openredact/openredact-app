import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import "./Control.sass";
import PreviewText from "./Text";

const PreviewControl = () => {
  return (
    <Card className="preview-card" elevation={Elevation.ONE}>
      <PreviewText />
    </Card>
  );
};

export default PreviewControl;
