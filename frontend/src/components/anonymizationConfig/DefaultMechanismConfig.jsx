/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup } from "@blueprintjs/core";
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
    <div className="mechanism">
      <RadioGroup selectedValue={mechanism.mechanism} onChange={onSelect}>
        <Radio
          label={t("anonymization.generalization.name")}
          value="generalization"
        />
        <Radio
          label={t("anonymization.pseudonymization.name")}
          value="pseudonymization"
        />
        <Radio
          label={t("anonymization.suppression.name")}
          value="suppression"
        />
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
