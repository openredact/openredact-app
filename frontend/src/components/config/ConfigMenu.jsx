import React, { useEffect, useState } from "react";
import { Card, Divider, Label } from "@blueprintjs/core";
import "./ConfigMenu.sass";
import PropTypes from "prop-types";
import Item from "./Item";
import MechanismConfig from "./MechanismConfig";

const ConfigMenu = ({ tags }) => {
  const [config, setConfig] = useState({
    defaultMechanism: { mechanism: "suppression" },
    mechanismsByTag: {},
  });

  useEffect(() => {
    tags.forEach((tag) => {
      if (!Object.prototype.hasOwnProperty.call(config.mechanismsByTag, tag)) {
        const clone = { ...config };
        clone.mechanismsByTag[tag] = { mechanism: "none" };
        setConfig(clone);
      }
    });
  }, [tags, config]);

  const updateConfig = (newMechanism, tag) => {
    if (tag == null) {
      // update default
      setConfig({ ...config, defaultMechanism: newMechanism });
    }

    // update mechanism for tag
    const clone = { ...config };
    clone.mechanismsByTag[tag] = newMechanism;
    setConfig(clone);
  };

  const listItems = Object.entries(config.mechanismsByTag).map(
    ([key, value]) => {
      return (
        <li key={key}>
          <Item tag={key} mechanismConfig={value} updateConfig={updateConfig} />
        </li>
      );
    }
  );

  return (
    <Card className="config-menu">
      <Label>
        Default
        <MechanismConfig
          mechanismConfig={config.defaultMechanism}
          updateConfig={updateConfig}
        />
      </Label>

      <Divider />
      <ul>{listItems}</ul>
    </Card>
  );
};

ConfigMenu.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ConfigMenu;
