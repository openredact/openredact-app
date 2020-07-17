import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup, Tooltip, Position, H6 } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import constants from "../../js/constants";
import { getMechanismComponent } from "./anonymizationConfig";

const DefaultMechanismConfig = ({ mechanism, updateMechanism }) => {
  const t = useContext(PolyglotContext);

  const mechanismComponent = getMechanismComponent(
    mechanism,
    updateMechanism,
    "default"
  );

  function onSelect(event) {
    updateMechanism({ mechanism: event.target.value });
  }

  return (
    <div className="default-mechanism">
      <RadioGroup selectedValue={mechanism.mechanism} onChange={onSelect}>
        <Radio value="generalization">
          <Tooltip
            content={t("anonymization.generalization.tooltip")}
            position={Position.BOTTOM_RIGHT}
            hoverOpenDelay={constants.tooltipHoverOpenDelay}
          >
            {t("anonymization.generalization.name")}
          </Tooltip>
        </Radio>
        <Radio value="pseudonymization">
          <Tooltip
            content={t("anonymization.pseudonymization.tooltip")}
            position={Position.BOTTOM_RIGHT}
            hoverOpenDelay={constants.tooltipHoverOpenDelay}
          >
            {t("anonymization.pseudonymization.name")}
          </Tooltip>
        </Radio>
        <Radio value="suppression">
          <Tooltip
            content={t("anonymization.suppression.tooltip")}
            position={Position.BOTTOM_RIGHT}
            hoverOpenDelay={constants.tooltipHoverOpenDelay}
          >
            {t("anonymization.suppression.name")}
          </Tooltip>
        </Radio>
      </RadioGroup>
      <H6 className="more-top-padding">{t("anonymization.options")}</H6>
      {mechanismComponent}
    </div>
  );
};

DefaultMechanismConfig.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
};

export default DefaultMechanismConfig;
