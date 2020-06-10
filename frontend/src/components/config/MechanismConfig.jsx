import React from "react";
import PropTypes from "prop-types";
import SuppressionMechanism from "./SuppressionMechanism";

const MechanismConfig = ({ mechanismConfig, updateMechanismConfig }) => {
  let mechanismComponent;
  switch (mechanismConfig.mechanism) {
    case "suppression":
      mechanismComponent = (
        <SuppressionMechanism
          mechanismConfig={mechanismConfig}
          updateMechanismConfig={updateMechanismConfig}
        />
      );
      break;
    default:
      mechanismComponent = <div />;
  }

  const onSelect = (event) => {
    updateMechanismConfig({ mechanism: event.target.value });
  };

  return (
    <div>
      <select
        value={mechanismConfig.mechanism}
        onBlur={() => {}} // TODO handle blur
        onChange={onSelect}
      >
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
