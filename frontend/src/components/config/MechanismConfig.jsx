/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import PolyglotContext from "../../js/polyglotContext";
import SuppressionMechanism from "./SuppressionMechanism";
import PseudonymizationMechanism from "./PseudonymizationMechanism";
import GeneralizationMechanism from "./GeneralizationMechanism";

const MechanismConfig = ({ mechanismConfig, updateMechanismConfig, tag }) => {
  const t = useContext(PolyglotContext);

  const props = { mechanismConfig, updateMechanismConfig };

  let mechanismComponent;
  switch (mechanismConfig.mechanism) {
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

  const onSelect = (event) => {
    updateMechanismConfig({ mechanism: event.target.value });
  };

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select value={mechanismConfig.mechanism} onChange={onSelect}>
        {tag !== "default" && (
          <option value="useDefault">{t("anonymization.default")}</option>
        )}
        {tag !== "default" && (
          <option value="none">{t("anonymization.do_not_anonymize")}</option>
        )}
        <option value="generalization">
          {t("anonymization.generalization.name")}
        </option>
        <option value="pseudonymization">
          {t("anonymization.pseudonymization.name")}
        </option>
        <option value="suppression">
          {t("anonymization.suppression.name")}
        </option>
      </select>
      {mechanismComponent}
    </div>
  );
};

MechanismConfig.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default MechanismConfig;
