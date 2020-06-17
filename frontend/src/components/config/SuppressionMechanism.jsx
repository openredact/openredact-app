import React, { useContext } from "react";
import PropTypes from "prop-types";
import { InputGroup, Label, NumericInput } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const SuppressionMechanism = ({ mechanismConfig, updateMechanismConfig }) => {
  const t = useContext(PolyglotContext);

  let myMechanismConfig = mechanismConfig;
  if (!hasConfigurations(myMechanismConfig)) {
    myMechanismConfig = {
      ...myMechanismConfig,
      suppressionChar: "X",
      customLength: 1,
    };
  }

  const onUpdateSuppressionChar = (event) => {
    updateMechanismConfig({
      ...myMechanismConfig,
      suppressionChar: event.target.value,
    });
  };

  const onUpdateCustomLength = (valueAsInt) => {
    updateMechanismConfig({
      ...myMechanismConfig,
      customLength: valueAsInt,
    });
  };

  return (
    <div>
      <Label>
        {t("anonymization.suppression.suppression_char")}
        <InputGroup
          value={myMechanismConfig.suppressionChar}
          onChange={onUpdateSuppressionChar}
        />
      </Label>
      <Label>
        {t("anonymization.suppression.custom_length")}
        <NumericInput
          min={1}
          minorStepSize={1}
          value={myMechanismConfig.customLength}
          onValueChange={onUpdateCustomLength}
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
