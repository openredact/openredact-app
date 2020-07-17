import React, { useContext } from "react";
import PropTypes from "prop-types";
import { H6 } from "@blueprintjs/core";
import TagMechanismConfig from "./TagMechanismConfig";
import PolyglotContext from "../../js/polyglotContext";

const Item = ({ mechanism, updateMechanism, tag }) => {
  const t = useContext(PolyglotContext);

  return (
    <div>
      <H6>{t(`tags.${tag.toLowerCase()}`)}</H6>
      <TagMechanismConfig
        mechanism={mechanism}
        updateMechanism={updateMechanism}
        tag={tag}
      />
    </div>
  );
};

Item.propTypes = {
  mechanism: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMechanism: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Item;
