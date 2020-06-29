import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, Label, NumericInput, Tooltip } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const PseudonymizationMechanism = ({
  mechanismConfig,
  updateMechanismConfig,
}) => {
  const t = useContext(PolyglotContext);

  const [formatStringValid, setFormatStringValid] = useState(true);
  const [initialCounterValid, setInitialCounterValid] = useState(true);

  useEffect(() => {
    if (!hasConfigurations(mechanismConfig)) {
      updateMechanismConfig({
        ...mechanismConfig,
        formatString: "{}",
        initialCounterValue: 1,
      });
    }
  });

  const validateFormatString = (string) => {
    const regex = RegExp("^[^{}]*{}[^{}]*$");
    return regex.test(string);
  };

  const onUpdateFormatString = (value) => {
    if (!validateFormatString(value)) {
      setFormatStringValid(false);
    } else {
      setFormatStringValid(true);
    }

    updateMechanismConfig({
      ...mechanismConfig,
      formatString: value,
    });
  };

  const validateInitialCounterValue = (initialCounterValue) => {
    return Number.isInteger(initialCounterValue) && initialCounterValue >= 1;
  };

  const onUpdateInitialCounterValue = (valueAsNumber) => {
    if (!validateInitialCounterValue(valueAsNumber)) {
      setInitialCounterValid(false);
      return;
    }

    setInitialCounterValid(true);
    updateMechanismConfig({
      ...mechanismConfig,
      initialCounterValue: valueAsNumber,
    });
  };

  if (!hasConfigurations(mechanismConfig)) return null;

  return (
    <div>
      <Label>
        {t("anonymization.pseudonymization.format_string")}
        <Tooltip
          content={t("anonymization.pseudonymization.format_string_tooltip")}
        >
          <InputGroup
            value={mechanismConfig.formatString}
            onChange={(event) => onUpdateFormatString(event.target.value)}
            intent={formatStringValid ? "default" : "danger"}
          />
        </Tooltip>
      </Label>
      <Label>
        {t("anonymization.pseudonymization.initial_counter_value")}
        <NumericInput
          min={1}
          minorStepSize={1}
          value={mechanismConfig.initialCounterValue}
          onValueChange={onUpdateInitialCounterValue}
          intent={initialCounterValid ? "default" : "danger"}
        />
      </Label>
    </div>
  );
};

PseudonymizationMechanism.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
};

export default PseudonymizationMechanism;
