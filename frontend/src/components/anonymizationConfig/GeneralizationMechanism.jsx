import React, { useContext } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormGroup } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";

const GeneralizationMechanism = ({
  mechanismConfig,
  updateMechanismConfig,
  tag,
}) => {
  const t = useContext(PolyglotContext);

  const onUpdateReplacement = (value) => {
    updateMechanismConfig({
      ...mechanismConfig,
      replacement: value,
    });
  };

  return (
    <div>
      <FormGroup
        label={t("anonymization.generalization.replacement")}
        labelFor={`${tag}-replacement-input`}
      >
        <InputGroup
          id={`${tag}-replacement-input`}
          value={mechanismConfig.replacement}
          onChange={(event) => onUpdateReplacement(event.target.value)}
          fill
        />
      </FormGroup>
    </div>
  );
};

GeneralizationMechanism.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default GeneralizationMechanism;
