import React from "react";
import { Card, EditableText, Elevation } from "@blueprintjs/core";
import PropTypes from "prop-types";
import "./TextPreview.sass";

const TextPreview = ({ text }) => {
  return (
    <EditableText
      disabled
      multiline
      className="preview-text"
      placeholder=""
      value={text}
    />
  );
};

TextPreview.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextPreview;
