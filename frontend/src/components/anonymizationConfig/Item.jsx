import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FormGroup } from "@blueprintjs/core";
import MechanismConfig from "./MechanismConfig";
import PolyglotContext from "../../js/polyglotContext";

const Item = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

  return (
    <FormGroup
      label={t(`tags.${tag.toLowerCase()}`)}
      labelFor={`${tag}-mechanism-config`}
    >
      <MechanismConfig
        mechanism={mechanism}
        updateMechanism={updateMechanism}
        tag={tag}
      />
    </FormGroup>
  );
};

Item.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Item;
