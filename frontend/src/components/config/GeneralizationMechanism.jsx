import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { InputGroup, Label } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations } from "../../js/anonymizationConfig";

const GeneralizationMechanism = ({
  mechanismConfig,
  updateMechanismConfig,
}) => {
  const t = useContext(PolyglotContext);

  useEffect(() => {
    if (!hasConfigurations(mechanismConfig)) {
      updateMechanismConfig({
        ...mechanismConfig,
        replacement: "<>",
      });
    }
  });

  const onUpdateReplacement = (value) => {
    updateMechanismConfig({
      ...mechanismConfig,
      replacement: value,
    });
  };

  return (
    <div>
      <Label>
        {t("anonymization.generalization.replacement")}
        <InputGroup
          value={mechanismConfig.replacement}
          onChange={(event) => onUpdateReplacement(event.target.value)}
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
