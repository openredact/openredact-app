import React from "react";
import PropTypes from "prop-types";
import { Label } from "@blueprintjs/core";
import MechanismConfig from "./MechanismConfig";

const Item = ({ mechanismConfig, updateMechanismConfig, tag }) => {
  return (
    <Label>
      {tag}
      <MechanismConfig
        mechanismConfig={mechanismConfig}
        updateMechanismConfig={updateMechanismConfig}
      />
    </Label>
  );
};

Item.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Item;
