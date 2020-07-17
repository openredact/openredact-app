import React, { useContext } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormGroup } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";

const GeneralizationMechanism = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

  function onUpdateReplacement(value) {
    const mechanismClone = { ...mechanism };
    mechanismClone.config.replacement = value;
    updateMechanism(mechanismClone);
  }

  return (
    <div className="mechanism-options">
      <FormGroup
        label={t("anonymization.generalization.replacement")}
        labelFor={`${tag}-replacement-input`}
      >
        <InputGroup
          id={`${tag}-replacement-input`}
          value={mechanism.config.replacement}
          onChange={(event) => onUpdateReplacement(event.target.value)}
          fill
        />
      </FormGroup>
    </div>
  );
};

GeneralizationMechanism.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default GeneralizationMechanism;
