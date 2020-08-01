import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormGroup,
  NumericInput,
  Position,
  Tooltip,
} from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import constants from "../../js/constants";

const LaplaceNoiseMechanism = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

  const [epsilonValid, setEpsilonValid] = useState(true);

  function validateEpsilon(value) {
    return value > 0;
  }

  function onUpdateEpsilon(valueAsNumber) {
    if (!validateEpsilon(valueAsNumber)) {
      setEpsilonValid(false);
      return;
    }

    setEpsilonValid(true);
    const mechanismClone = { ...mechanism };
    mechanismClone.config.epsilon = valueAsNumber;
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
      <Tooltip
        content={t("anonymization.laplace_noise.epsilon_tooltip")}
        position={Position.BOTTOM_RIGHT}
        hoverOpenDelay={constants.tooltipHoverOpenDelay}
      >
        <FormGroup
          label={t("anonymization.laplace_noise.epsilon")}
          helperText={
            epsilonValid
              ? undefined
              : t("anonymization.laplace_noise.epsilon_hint")
          }
          intent={epsilonValid ? "default" : "danger"}
          labelFor={`${tag}-epsilon-input`}
        >
          <NumericInput
            id={`${tag}-epsilon-input`}
            min={Number.MIN_VALUE}
            stepSize={0.01}
            minorStepSize={0.001}
            value={mechanism.config.epsilon}
            onValueChange={onUpdateEpsilon}
            intent={epsilonValid ? "default" : "danger"}
            fill
          />
        </FormGroup>
      </Tooltip>
    </div>
  );
};

LaplaceNoiseMechanism.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default LaplaceNoiseMechanism;
