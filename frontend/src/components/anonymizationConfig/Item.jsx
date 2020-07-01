import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FormGroup } from "@blueprintjs/core";
import MechanismConfig from "./MechanismConfig";
import PolyglotContext from "../../js/polyglotContext";

const Item = ({ mechanismConfig, updateMechanismConfig, tag }) => {
  const t = useContext(PolyglotContext);

  return (
    <FormGroup
      label={t(`tags.${tag.toLowerCase()}`)}
      labelFor={`${tag}-mechanism-config`}
    >
      <MechanismConfig
        mechanismConfig={mechanismConfig}
        updateMechanismConfig={updateMechanismConfig}
        tag={tag}
      />
    </FormGroup>
  );
};

Item.propTypes = {
  mechanismConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanismConfig: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Item;
