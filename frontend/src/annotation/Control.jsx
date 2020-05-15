import React, { useEffect, useState } from "react";
import { Card, Elevation, Icon, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import "./Control.sass";
import PropTypes from "prop-types";
import Dropzone from "./Dropzone";
import AnnotationForm from "./AnnotationForm";
import API from "../api";
import Scores from "./Scores";

const AnnotationControl = ({
  tokens,
  scores,
  annotations,
  onAnnotationsChange,
  onFileDrop,
  onCancel,
  isLoading,
}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    API.get("nlp/tags/").then((response) => {
      setTags(response.data);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  }, []);

  return (
    <Card className="annotation-card" elevation={Elevation.ONE}>
      {isLoading && <Spinner />}
      {tokens.length === 0 && !isLoading && (
        <Dropzone onFileDrop={onFileDrop} />
      )}
      {tokens.length > 0 && tags.length > 0 && (
        <AnnotationForm
          tokens={tokens}
          annotations={annotations}
          onAnnotationsChange={onAnnotationsChange}
          tags={tags}
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
      {tokens.length > 0 && Object.keys(scores).length > 0 && (
        <Scores scores={scores} />
      )}
    </Card>
  );
};

AnnotationControl.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  scores: PropTypes.objectOf(PropTypes.any),
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAnnotationsChange: PropTypes.func.isRequired,
  onFileDrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

AnnotationControl.defaultProps = {
  scores: {},
};

export default AnnotationControl;
