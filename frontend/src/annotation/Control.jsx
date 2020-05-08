import React from "react";
import { Card, Elevation, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import "./Control.sass";
import PropTypes from "prop-types";
import Dropzone from "./Dropzone";
import AnnotationForm from "./AnnotationForm";

const TAGS = ["PER", "LOC", "ORG", "MISC"];

const AnnotationControl = ({
  tokens,
  annotations,
  onAnnotationsChange,
  onFileDrop,
  onCancel,
}) => {
  return (
    <Card className="annotation-card" elevation={Elevation.ONE}>
      {tokens.length === 0 && <Dropzone onFileDrop={onFileDrop} />}
      {tokens.length > 0 && (
        <AnnotationForm
          tokens={tokens}
          annotations={annotations}
          onAnnotationsChange={onAnnotationsChange}
          tags={TAGS}
        />
      )}
      {tokens.length > 0 && (
        <Icon
          className="cancel"
          icon={IconNames.CROSS}
          iconSize={Icon.SIZE_LARGE}
          onClick={onCancel}
        />
      )}
    </Card>
  );
};

AnnotationControl.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAnnotationsChange: PropTypes.func.isRequired,
  onFileDrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AnnotationControl;
