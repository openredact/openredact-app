/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup, Tooltip, Position } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import SuppressionMechanism from "./SuppressionMechanism";
import PseudonymizationMechanism from "./PseudonymizationMechanism";
import GeneralizationMechanism from "./GeneralizationMechanism";

const DefaultMechanismConfig = ({ mechanism, updateMechanism }) => {
  const t = useContext(PolyglotContext);

  const tag = "default";
  const props = { mechanism, updateMechanism, tag };

  let mechanismComponent;
  switch (mechanism.mechanism) {
    case "generalization":
      mechanismComponent = <GeneralizationMechanism {...props} />;
      break;
    case "pseudonymization":
      mechanismComponent = <PseudonymizationMechanism {...props} />;
      break;
    case "suppression":
      mechanismComponent = <SuppressionMechanism {...props} />;
      break;

    default:
      mechanismComponent = null;
  }

  function onSelect(event) {
    updateMechanism({ mechanism: event.target.value });
  }

  return (
    <div>
      <RadioGroup selectedValue={mechanism.mechanism} onChange={onSelect}>
        <Radio value="generalization">
          <Tooltip
            content={t("anonymization.generalization.tooltip")}
            position={Position.BOTTOM_RIGHT}
          >
            {t("anonymization.generalization.name")}
          </Tooltip>
        </Radio>
        <Radio value="pseudonymization">
          <Tooltip
            content={t("anonymization.pseudonymization.tooltip")}
            position={Position.BOTTOM_RIGHT}
          >
            {t("anonymization.pseudonymization.name")}
          </Tooltip>
        </Radio>
        <Radio value="suppression">
          <Tooltip
            content={t("anonymization.suppression.tooltip")}
            position={Position.BOTTOM_RIGHT}
          >
            {t("anonymization.suppression.name")}
          </Tooltip>
        </Radio>
      </RadioGroup>
      {mechanismComponent}
    </div>
  );
};

DefaultMechanismConfig.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
};

export default DefaultMechanismConfig;
