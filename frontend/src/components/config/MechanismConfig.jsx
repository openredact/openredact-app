/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import SuppressionMechanism from "./SuppressionMechanism";

const MechanismConfig = ({ mechanismConfig, updateMechanismConfig }) => {
  const props = { mechanismConfig, updateMechanismConfig };

  let mechanismComponent;
  switch (mechanismConfig.mechanism) {
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
        <option value="none">Do not anonymize</option>
        <option value="suppression">Suppression</option>
        <option value="generalization">Generalization</option>
        <option value="pseudonymization">Pseudonymization</option>
        <option value="stateful">Stateful</option>
      </select>
      {mechanismComponent}
    </div>
  );
};

MechanismConfig.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
};

export default MechanismConfig;
