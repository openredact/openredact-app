import React from "react";
import { EditableText } from "@blueprintjs/core";
import PropTypes from "prop-types";

const PreviewText = ({ text }) => {
  return <EditableText disabled value={text} />;
};

PreviewText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PreviewText;
