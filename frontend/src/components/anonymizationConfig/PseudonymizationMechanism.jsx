import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const PseudonymizationMechanism = ({
  mechanismConfig,
  updateMechanismConfig,
}) => {
  const t = useContext(PolyglotContext);

  const [formatStringValid, setFormatStringValid] = useState(true);
  const [initialCounterValid, setInitialCounterValid] = useState(true);

  const isConfigured = hasConfigurations(mechanismConfig);

  useEffect(() => {
    if (!isConfigured) {
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

  if (!isConfigured) return null;

  return (
    <div>
      <FormGroup
        label={t("anonymization.pseudonymization.format_string")}
        helperText={
          formatStringValid
            ? undefined
            : t("anonymization.pseudonymization.format_string_hint")
        }
        intent={formatStringValid ? "default" : "danger"}
        labelFor="format-string-input"
      >
        <InputGroup
          id="format-string-input"
          value={mechanismConfig.formatString}
          onChange={(event) => onUpdateFormatString(event.target.value)}
          intent={formatStringValid ? "default" : "danger"}
          fill
        />
      </FormGroup>
      <FormGroup
        label={t("anonymization.pseudonymization.initial_counter_value")}
        labelFor="initial-counter-value-input"
        helperText={
          initialCounterValid
            ? undefined
            : t("anonymization.pseudonymization.initial_counter_value_hint")
        }
        intent={initialCounterValid ? "default" : "danger"}
      >
        <NumericInput
          id="initial-counter-value-input"
          min={1}
          minorStepSize={1}
          value={mechanismConfig.initialCounterValue}
          onValueChange={onUpdateInitialCounterValue}
          intent={initialCounterValid ? "default" : "danger"}
          fill
        />
      </FormGroup>
    </div>
  );
};

PseudonymizationMechanism.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
};

export default PseudonymizationMechanism;
