import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, Label, NumericInput } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const SuppressionMechanism = ({ mechanismConfig, updateMechanismConfig }) => {
  const t = useContext(PolyglotContext);

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!hasConfigurations(mechanismConfig)) {
      updateMechanismConfig({
        ...mechanismConfig,
        suppressionChar: "X",
      });
    }
  });

  const onUpdateSuppressionChar = (event) => {
    updateMechanismConfig({
      ...mechanismConfig,
      suppressionChar: event.target.value,
    });
  };

  const isValidCustomLength = (customLength) => {
    return (
      customLength === undefined ||
      (customLength !== "" &&
        Number.isInteger(customLength) &&
        customLength >= 1)
    );
  };

  const onUpdateCustomLength = (valueAsNumber, valueAsString) => {
    if (valueAsString === "" || Number.isNaN(valueAsNumber)) {
      const clone = { ...mechanismConfig };
      delete clone.customLength;
      updateMechanismConfig(clone);
      return;
    }

    if (!isValidCustomLength(valueAsNumber)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    updateMechanismConfig({
      ...mechanismConfig,
      customLength: valueAsNumber,
    });
  };

  return (
    <div>
      <Label>
        {t("anonymization.suppression.suppression_char")}
        <InputGroup
          value={
            mechanismConfig.suppressionChar !== undefined
              ? mechanismConfig.suppressionChar
              : ""
          }
          onChange={onUpdateSuppressionChar}
        />
      </Label>
      <Label>
        {t("anonymization.suppression.custom_length")}
        <NumericInput
          min={1}
          minorStepSize={1}
          value={
            mechanismConfig.customLength !== undefined
              ? mechanismConfig.customLength
              : ""
          }
          onValueChange={onUpdateCustomLength}
          placeholder={t("anonymization.suppression.as_original")}
          intent={isValid ? "default" : "danger"}
        />
      </Label>
    </div>
  );
};

SuppressionMechanism.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
};

export default SuppressionMechanism;
