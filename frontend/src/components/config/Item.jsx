import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Label } from "@blueprintjs/core";
import MechanismConfig from "./MechanismConfig";
import PolyglotContext from "../../js/polyglotContext";

const Item = ({ mechanismConfig, updateMechanismConfig, tag }) => {
  const t = useContext(PolyglotContext);

  return (
    <Label>
      {t(`tags.${tag.toLowerCase()}`)}
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
