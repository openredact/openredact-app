import React, { useContext } from "react";
import PropTypes from "prop-types";
import { InputGroup, Label } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const GeneralizationMechanism = ({
  mechanismConfig,
  updateMechanismConfig,
}) => {
  const t = useContext(PolyglotContext);

  let myMechanismConfig = mechanismConfig;
  if (!hasConfigurations(myMechanismConfig)) {
    myMechanismConfig = {
      ...myMechanismConfig,
      replacement: "<>",
    };
  }

  const onUpdateReplacement = (event) => {
    updateMechanismConfig({
      ...myMechanismConfig,
      replacement: event.target.value,
    });
  };

  return (
    <div>
      <Label>
        {t("anonymization.generalization.replacement")}*
        <InputGroup
          value={myMechanismConfig.replacement}
          onChange={onUpdateReplacement}
        />
      </Label>
    </div>
  );
};

GeneralizationMechanism.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
};

export default GeneralizationMechanism;
