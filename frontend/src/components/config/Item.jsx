import React from "react";
import PropTypes from "prop-types";
import { Label } from "@blueprintjs/core";
import MechanismConfig from "./MechanismConfig";

const Item = ({ mechanismConfig, updateConfig, tag }) => {
  const updateMechanismConfig = (myTag) => (mechanism) => {
    updateConfig(mechanism, myTag);
  };

  return (
    <Label>
      {tag}
      <MechanismConfig
        mechanismConfig={mechanismConfig}
        updateMechanismConfig={updateMechanismConfig(tag)}
      />
    </Label>
  );
};

Item.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateConfig: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Item;
