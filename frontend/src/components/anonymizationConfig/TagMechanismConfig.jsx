import React, { useContext } from "react";
import PropTypes from "prop-types";
import { HTMLSelect } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import { getMechanismComponent } from "./anonymizationConfig";

const TagMechanismConfig = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

  const mechanismComponent = getMechanismComponent(
    mechanism,
    updateMechanism,
    tag
  );

  function onSelect(event) {
    updateMechanism({ mechanism: event.target.value });
  }

  return (
    <div className="advanced-mechanism-options">
      <HTMLSelect
        value={mechanism.mechanism}
        onChange={onSelect}
        id={`${tag}-mechanism-config`}
        fill
      >
        <option value="useDefault">{t("anonymization.use_default")}</option>
        <option value="none">{t("anonymization.do_not_anonymize")}</option>
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

TagMechanismConfig.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default TagMechanismConfig;
