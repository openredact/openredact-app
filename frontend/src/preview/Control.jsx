import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import "./Control.sass";
import PropTypes from "prop-types";
import PreviewText from "./Text";

const PreviewControl = ({ tokens, anonymizations }) => {
  const anonymize = (myTokens, myAnonymizations) => {
    if (myAnonymizations.length === 0) return " ";

    // TODO
    return `This is an example ${myAnonymizations[0].text}`;
  };

  const text = anonymize(tokens, anonymizations);

  return (
    <Card className="preview-card" elevation={Elevation.ONE}>
      <PreviewText text={text} />
    </Card>
  );
};

PreviewControl.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
  anonymizations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PreviewControl;
