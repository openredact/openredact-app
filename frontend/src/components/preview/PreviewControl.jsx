import React, { useContext } from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import "./PreviewControl.sass";
import PropTypes from "prop-types";
import TextPreview from "./TextPreview";
import PolyglotContext from "../../js/polyglotContext";

const PreviewControl = ({ tokens, anonymizations, onDownload }) => {
  const t = useContext(PolyglotContext);

  const anonymize = (myTokens, myAnonymizations) => {
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
      return token.text;
    });

    return anonymizedTokens.reduce(
      (acc, cur, idx) =>
        acc + cur + (cur !== "" && tokens[idx].hasWhitespace ? " " : ""),
      ""
    );
  };

  const text = anonymize(tokens, anonymizations);

  return (
    <Card className="preview-card" elevation={Elevation.ONE}>
      <TextPreview text={text} />
      {text !== "" && (
        <Button
          className="download-button"
          intent="success"
          onClick={onDownload}
        >
          {t("preview.download")}
        </Button>
      )}
    </Card>
  );
};

PreviewControl.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  anonymizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default PreviewControl;
