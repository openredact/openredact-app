import React, { useContext, useEffect } from "react";
import { Card, Divider, Label } from "@blueprintjs/core";
import "./ConfigMenu.sass";
import PropTypes from "prop-types";
import Item from "./Item";
import MechanismConfig from "./MechanismConfig";
import useLocalStorage from "../../js/useLocalStorage";
import PolyglotContext from "../../js/polyglotContext";

function hasProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

function hasConfigurations(mechanism) {
  /**
   * Each mechanism has the property mechanism (with values "generalization", "suppression", ...).
   * Any other property of a mechanism is its configuration (e.g. `suppressionChar`).
   */
  return Object.keys(mechanism).length > 1;
}

const ConfigMenu = ({ tags }) => {
  const t = useContext(PolyglotContext);

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
      if (!hasProperty(config.mechanismsByTag, tag)) {
        const clone = { ...config };
        clone.mechanismsByTag[tag] = { mechanism: "none" };
        setConfig(clone);
      }
    });
  }, [tags, config, setConfig]);

  const updateConfigHistoryIfConfigured = (newMechanism, tag) => {
    if (newMechanism.mechanism === "none" || !hasConfigurations(newMechanism)) {
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
      updateConfigHistoryIfConfigured(newMechanism, "default");
      return;
    }

    // update mechanism for tag
    const configClone = { ...config };
    configClone.mechanismsByTag[tag] = newMechanism;
    setConfig(configClone);
    updateConfigHistoryIfConfigured(newMechanism, tag);
  };

  const getConfigHistoryForTag = (tag) => (mechanism) => {
    return configHistory[mechanism][tag];
  };

  const addCachedChoices = (tag, selectedMechanism) => {
    if (
      selectedMechanism.mechanism !== "none" &&
      !hasConfigurations(selectedMechanism) &&
      getConfigHistoryForTag(tag)(selectedMechanism.mechanism)
    ) {
      return getConfigHistoryForTag(tag)(selectedMechanism.mechanism);
    }

    return selectedMechanism;
  };

  const listItems = Object.entries(config.mechanismsByTag)
    .sort()
    .map(([key, value]) => {
      return (
        <li key={key}>
          <Item
            tag={key}
            mechanismConfig={addCachedChoices(key, value)}
            updateMechanismConfig={(mechanism) => updateConfig(mechanism, key)}
          />
        </li>
      );
    });

  return (
    <Card className="config-menu">
      <Label>
        {t("anonymization.default")}
        <MechanismConfig
          mechanismConfig={addCachedChoices("default", config.defaultMechanism)}
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
