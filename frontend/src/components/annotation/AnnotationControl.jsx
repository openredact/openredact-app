import React from "react";
import { Card, Elevation, Spinner } from "@blueprintjs/core";
import "./AnnotationControl.sass";
import PropTypes from "prop-types";
import Dropzone from "./Dropzone";
import AnnotationForm from "./AnnotationForm";

const AnnotationControl = ({
  paragraphs,
  annotations,
  onAnnotationsChange,
  onFileDrop,
  isLoading,
  tags,
}) => {
  return (
    <Card className="annotation-card" elevation={Elevation.ONE}>
      {isLoading && <Spinner />}
      {(paragraphs.length === 0 ||
        (paragraphs.length > 0 && paragraphs[0].tokens.length === 0)) &&
        !isLoading && <Dropzone onFileDrop={onFileDrop} />}
      {paragraphs.length > 0 &&
        paragraphs[0].tokens.length > 0 &&
        tags.length > 0 && (
          <AnnotationForm
            paragraphs={paragraphs}
            annotations={annotations}
            onAnnotationsChange={onAnnotationsChange}
            tags={tags}
          />
        )}
    </Card>
  );
};

AnnotationControl.propTypes = {
  paragraphs: PropTypes.arrayOf(PropTypes.object).isRequired,
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAnnotationsChange: PropTypes.func.isRequired,
  onFileDrop: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnnotationControl;
