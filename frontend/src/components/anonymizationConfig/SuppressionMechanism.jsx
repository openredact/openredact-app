import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";

const SuppressionMechanism = ({
  mechanismConfig,
  updateMechanismConfig,
  tag,
}) => {
  const t = useContext(PolyglotContext);

  const [customLengthValid, setCustomLengthValid] = useState(true);

  const onUpdateSuppressionChar = (value) => {
    updateMechanismConfig({
      ...mechanismConfig,
      suppressionChar: value,
    });
  };

  const validateCustomLength = (customLength) => {
    return (
      customLength === undefined ||
      (customLength !== "" &&
        Number.isInteger(customLength) &&
        customLength >= 1)
    );
  };

  const onUpdateCustomLength = (valueAsNumber, valueAsString) => {
    if (valueAsString === "" || Number.isNaN(valueAsNumber)) {
      if (valueAsString === "") setCustomLengthValid(true);
      const clone = { ...mechanismConfig };
      delete clone.customLength;
      updateMechanismConfig(clone);
      return;
    }

    if (!validateCustomLength(valueAsNumber)) {
      setCustomLengthValid(false);
      return;
    }

    setCustomLengthValid(true);
    updateMechanismConfig({
      ...mechanismConfig,
      customLength: valueAsNumber,
    });
  };

  return (
    <div>
      <FormGroup
        label={t("anonymization.suppression.suppression_char")}
        labelFor={`${tag}-suppression-char-input`}
      >
        <InputGroup
          id={`${tag}-suppression-char-input`}
          value={mechanismConfig.suppressionChar}
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
            mechanismConfig.customLength !== undefined
              ? mechanismConfig.customLength
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
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default SuppressionMechanism;
