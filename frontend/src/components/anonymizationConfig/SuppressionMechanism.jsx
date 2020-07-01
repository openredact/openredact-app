import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const SuppressionMechanism = ({ mechanismConfig, updateMechanismConfig }) => {
  const t = useContext(PolyglotContext);

  const [customLengthValid, setCustomLengthValid] = useState(true);

  const isConfigured = hasConfigurations(mechanismConfig);

  useEffect(() => {
    if (!isConfigured) {
      updateMechanismConfig({
        ...mechanismConfig,
        suppressionChar: "X",
      });
    }
  });

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

  if (!isConfigured) return null;

  return (
    <div>
      <FormGroup
        label={t("anonymization.suppression.suppression_char")}
        labelFor="suppression-char-input"
      >
        <InputGroup
          id="suppression-char-input"
          value={mechanismConfig.suppressionChar}
          onChange={(event) => onUpdateSuppressionChar(event.target.value)}
          fill
        />
      </FormGroup>
      <FormGroup
        label={t("anonymization.suppression.custom_length")}
        labelFor="custom-length-input"
        helperText={
          customLengthValid
            ? undefined
            : t("anonymization.suppression.custom_length_hint")
        }
        intent={customLengthValid ? "default" : "danger"}
      >
        <NumericInput
          id="custom-length-input"
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
};

export default SuppressionMechanism;
