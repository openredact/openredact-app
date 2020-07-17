import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";

const SuppressionMechanism = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

  const [customLengthValid, setCustomLengthValid] = useState(true);

  function onUpdateSuppressionChar(value) {
    const mechanismClone = { ...mechanism };
    mechanismClone.config.suppressionChar = value;
    updateMechanism(mechanismClone);
  }

  function validateCustomLength(customLength) {
    return (
      customLength === undefined ||
      (customLength !== "" &&
        Number.isInteger(customLength) &&
        customLength >= 1)
    );
  }

  function onUpdateCustomLength(valueAsNumber, valueAsString) {
    if (valueAsString === "" || Number.isNaN(valueAsNumber)) {
      if (valueAsString === "") setCustomLengthValid(true);
      const mechanismClone = { ...mechanism };
      delete mechanismClone.config.customLength;
      updateMechanism(mechanismClone);
      return;
    }

    if (!validateCustomLength(valueAsNumber)) {
      setCustomLengthValid(false);
      return;
    }

    setCustomLengthValid(true);
    const mechanismClone = { ...mechanism };
    mechanismClone.config.customLength = valueAsNumber;
    updateMechanism(mechanismClone);
  }

  return (
    <div className="mechanism-options">
      <FormGroup
        label={t("anonymization.suppression.suppression_char")}
        labelFor={`${tag}-suppression-char-input`}
      >
        <InputGroup
          id={`${tag}-suppression-char-input`}
          value={mechanism.config.suppressionChar}
          onChange={(event) => onUpdateSuppressionChar(event.target.value)}
          fill
        />
      </FormGroup>
      <FormGroup
        label={t("anonymization.suppression.custom_length")}
        labelFor={`${tag}-custom-length-input`}
        helperText={
          customLengthValid
            ? undefined
            : t("anonymization.suppression.custom_length_hint")
        }
        intent={customLengthValid ? "default" : "danger"}
      >
        <NumericInput
          id={`${tag}-custom-length-input`}
          min={1}
          minorStepSize={1}
          value={
            mechanism.config.customLength !== undefined
              ? mechanism.config.customLength
              : ""
          }
          onValueChange={onUpdateCustomLength}
          placeholder={t("anonymization.suppression.as_original")}
          intent={customLengthValid ? "default" : "danger"}
          fill
        />
      </FormGroup>
    </div>
  );
};

SuppressionMechanism.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default SuppressionMechanism;
