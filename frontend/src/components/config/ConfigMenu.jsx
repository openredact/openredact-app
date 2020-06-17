import React, { useContext, useEffect } from "react";
import { Card, Divider, Label } from "@blueprintjs/core";
import "./ConfigMenu.sass";
import PropTypes from "prop-types";
import Item from "./Item";
import MechanismConfig from "./MechanismConfig";
import useLocalStorage from "../../js/useLocalStorage";
import PolyglotContext from "../../js/polyglotContext";
import { hasConfigurations, hasProperty } from "../../js/anonymizationConfig";

const ConfigMenu = ({ tags, config, setConfig }) => {
  const t = useContext(PolyglotContext);

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
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  setConfig: PropTypes.func.isRequired,
};

export default ConfigMenu;