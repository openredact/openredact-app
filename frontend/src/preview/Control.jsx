import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import "./Control.sass";
import PropTypes from "prop-types";
import PreviewText from "./Text";

const PreviewControl = ({ tokens, anonymizations, whitespace, onDownload }) => {
  const anonymize = (myTokens, myAnonymizations, myWhitespace) => {
    let skipNextTokens = 0;
    const anonymizedTokens = myTokens.map((token, idx) => {
      if (skipNextTokens > 0) {
        skipNextTokens -= 1;
        return "";
      }

      const anonymization = myAnonymizations.find((anon) => anon.start === idx);

      if (anonymization) {
        skipNextTokens = anonymization.end - anonymization.start - 1;
        return anonymization.text;
      }
      return token;
    });

    return anonymizedTokens.reduce(
      (acc, cur, idx) =>
        acc + cur + (cur !== "" && myWhitespace[idx] ? " " : ""),
      ""
    );
  };

  const text = anonymize(tokens, anonymizations, whitespace);

  return (
    <Card className="preview-card" elevation={Elevation.ONE}>
      <PreviewText text={text} />
      {text !== "" && (
        <Button
          className="download-button"
          intent="success"
          onClick={onDownload}
        >
          Download
        </Button>
      )}
    </Card>
  );
};

PreviewControl.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
  anonymizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  whitespace: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default PreviewControl;
