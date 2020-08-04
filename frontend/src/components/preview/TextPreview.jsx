import React from "react";
import { Card, EditableText } from "@blueprintjs/core";
import PropTypes from "prop-types";
import "./TextPreview.sass";
import { Elevation } from "@blueprintjs/core/lib/esnext/common/elevation";

const TextPreview = ({ text }) => {
  return (
    <Card elevation={Elevation.TWO} className="document-outline">
      <EditableText
        disabled
        multiline
        className="preview-text"
        placeholder=""
        value={text}
      />
    </Card>
  );
};

TextPreview.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextPreview;
