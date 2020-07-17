import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormGroup,
  InputGroup,
  NumericInput,
} from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";

const PseudonymizationMechanism = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

  const [formatStringValid, setFormatStringValid] = useState(true);
  const [counterValid, setCounterValid] = useState(true);

  function validateFormatString(string) {
    const regex = RegExp("^[^{}]*{}[^{}]*$");
    return regex.test(string);
  }

  function onUpdateFormatString(value) {
    if (!validateFormatString(value)) {
      setFormatStringValid(false);
    } else {
      setFormatStringValid(true);
    }

    const mechanismClone = { ...mechanism };
    mechanismClone.config.formatString = value;
    updateMechanism(mechanismClone);
  }

  function validateCounterValue(counterValue) {
    return Number.isInteger(counterValue) && counterValue >= 1;
  }

  function onUpdateCounterValue(valueAsNumber) {
    if (!validateCounterValue(valueAsNumber)) {
      setCounterValid(false);
      return;
    }

    setCounterValid(true);
    const mechanismClone = { ...mechanism };
    mechanismClone.config.counter = valueAsNumber;
    updateMechanism(mechanismClone);
  }

  function onUpdateStateful() {
    const mechanismClone = { ...mechanism };
    mechanismClone.config.stateful = !mechanism.config.stateful;
    updateMechanism(mechanismClone);
  }

  return (
    <div className="mechanism-options">
      <Checkbox
        label={t("anonymization.stateful")}
        checked={mechanism.config.stateful}
        onChange={onUpdateStateful}
      />
      <FormGroup
        label={t("anonymization.pseudonymization.format_string")}
        helperText={
          formatStringValid
            ? undefined
            : t("anonymization.pseudonymization.format_string_hint")
        }
        intent={formatStringValid ? "default" : "danger"}
        labelFor={`${tag}-format-string-input`}
      >
        <InputGroup
          id={`${tag}-format-string-input`}
          value={mechanism.config.formatString}
          onChange={(event) => onUpdateFormatString(event.target.value)}
          intent={formatStringValid ? "default" : "danger"}
          fill
        />
      </FormGroup>
      <FormGroup
        label={t("anonymization.pseudonymization.counter_value")}
        labelFor={`${tag}-counter-value-input`}
        helperText={
          counterValid
            ? undefined
            : t("anonymization.pseudonymization.counter_value_hint")
        }
        intent={counterValid ? "default" : "danger"}
      >
        <NumericInput
          id={`${tag}-counter-value-input`}
          min={1}
          minorStepSize={1}
          value={mechanism.config.counter}
          onValueChange={onUpdateCounterValue}
          intent={counterValid ? "default" : "danger"}
          fill
        />
      </FormGroup>
    </div>
  );
};

PseudonymizationMechanism.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default PseudonymizationMechanism;
