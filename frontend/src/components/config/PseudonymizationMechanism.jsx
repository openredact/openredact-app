import React, { useContext } from "react";
import PropTypes from "prop-types";
import { InputGroup, Label, NumericInput } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const PseudonymizationMechanism = ({
  mechanismConfig,
  updateMechanismConfig,
}) => {
  const t = useContext(PolyglotContext);

  let myMechanismConfig = mechanismConfig;
  if (!hasConfigurations(myMechanismConfig)) {
    myMechanismConfig = {
      ...myMechanismConfig,
      formatString: "{}",
      initialCounterValue: 1,
    };
  }

  const onUpdateFormatString = (event) => {
    updateMechanismConfig({
      ...myMechanismConfig,
      formatString: event.target.value,
    });
  };

  const onUpdateInitialCounterValue = (valueAsInt) => {
    updateMechanismConfig({
      ...myMechanismConfig,
      initialCounterValue: valueAsInt,
    });
  };

  return (
    <div>
      <Label>
        {t("anonymization.pseudonymization.format_string")}*
        <InputGroup
          value={myMechanismConfig.formatString}
          onChange={onUpdateFormatString}
        />
      </Label>
      <Label>
        {t("anonymization.pseudonymization.initial_counter_value")}
        <NumericInput
          min={1}
          minorStepSize={1}
          value={myMechanismConfig.initialCounterValue}
          onValueChange={onUpdateInitialCounterValue}
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
