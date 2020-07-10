/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { HTMLSelect } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import SuppressionMechanism from "./SuppressionMechanism";
import PseudonymizationMechanism from "./PseudonymizationMechanism";
import GeneralizationMechanism from "./GeneralizationMechanism";

const MechanismConfig = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

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
      <HTMLSelect
        value={mechanism.mechanism}
        onChange={onSelect}
        id={`${tag}-mechanism-config`}
        fill
      >
        {tag !== "default" && (
          <option value="useDefault">{t("anonymization.use_default")}</option>
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
      </HTMLSelect>
      {mechanismComponent}
    </div>
  );
};

MechanismConfig.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default MechanismConfig;
