import React from "react";
import "./SeparatorArrow.sass";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

const SeparatorArrow = () => {
  return <Icon className="separator-arrow" icon={IconNames.CHEVRON_RIGHT} />;
};

export default SeparatorArrow;
