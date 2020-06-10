import React from "react";
import PropTypes from "prop-types";
import SuppressionMechanism from "./SuppressionMechanism";

const MechanismConfig = ({ mechanismConfig, updateConfig, tag }) => {
  let mechanismComponent;
  switch (mechanismConfig.mechanism) {
    case "suppression":
      mechanismComponent = <SuppressionMechanism />;
      break;
    default:
      mechanismComponent = <div />;
  }

  const onSelect = (event) => {
    if (tag != null) updateConfig({ mechanism: event.target.value }, tag);
    else updateConfig({ mechanism: event.target.value });
  };

  return (
    <div>
      <select
        value={mechanismConfig.mechanism}
        onBlur={() => {}}
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
  updateConfig: PropTypes.func.isRequired,
  tag: PropTypes.string,
};

MechanismConfig.defaultProps = {
  tag: null,
};

export default MechanismConfig;
