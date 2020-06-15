import React, { useEffect } from "react";
import { Card, Divider, Label } from "@blueprintjs/core";
import "./ConfigMenu.sass";
import PropTypes from "prop-types";
import Item from "./Item";
import MechanismConfig from "./MechanismConfig";
import useLocalStorage from "../../js/useLocalStorage";

const ConfigMenu = ({ tags }) => {
  const [config, setConfig] = useLocalStorage("anonymizationConfig", {
    defaultMechanism: { mechanism: "suppression" },
    mechanismsByTag: {},
  });
  const [configHistory, setConfigHistory] = useLocalStorage(
    "anonymizationConfigHistory",
    {
      suppression: {},
      generalization: {},
      pseudonymization: {},
      stateful: {},
    }
  );

  useEffect(() => {
    tags.forEach((tag) => {
      if (!Object.prototype.hasOwnProperty.call(config.mechanismsByTag, tag)) {
        const clone = { ...config };
        clone.mechanismsByTag[tag] = { mechanism: "none" };
        setConfig(clone);
      }
    });
  }, [tags, config, setConfig]);

  const updateConfigHistory = (newMechanism, tag) => {
    if (newMechanism.mechanism === "none") {
      return;
    }
    const historyClone = { ...configHistory };
    historyClone[newMechanism.mechanism][tag] = newMechanism;
    setConfigHistory(historyClone);
  };

  const updateConfig = (newMechanism, tag = null) => {
    if (tag == null) {
      // update default
      setConfig({ ...config, defaultMechanism: newMechanism });
      if (Object.keys(newMechanism).length > 1)
        updateConfigHistory(newMechanism, "default");
      return;
    }

    // update mechanism for tag
    const configClone = { ...config };
    configClone.mechanismsByTag[tag] = newMechanism;
    setConfig(configClone);
    if (Object.keys(newMechanism).length > 1)
      updateConfigHistory(newMechanism, tag);
  };

  const configHistoryForTag = (tag) => (mechanism) => {
    return configHistory[mechanism][tag];
  };

  const augmentWithHistory = (tag, selectedMechanism) => {
    if (selectedMechanism.mechanism === "none") return selectedMechanism;

    const hist = configHistoryForTag(tag)(selectedMechanism.mechanism);

    if (Object.keys(selectedMechanism).length <= 1 && hist) {
      // TODO extract function
      return hist;
    }

    return selectedMechanism;
  };

  const listItems = Object.entries(config.mechanismsByTag).map(
    ([key, value]) => {
      return (
        <li key={key}>
          <Item
            tag={key}
            mechanismConfig={augmentWithHistory(key, value)}
            updateMechanismConfig={(mechanism) => updateConfig(mechanism, key)}
          />
        </li>
      );
    }
  );

  return (
    <Card className="config-menu">
      <Label>
        Default
        <MechanismConfig
          mechanismConfig={augmentWithHistory(
            "default",
            config.defaultMechanism
          )}
          updateMechanismConfig={updateConfig}
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
