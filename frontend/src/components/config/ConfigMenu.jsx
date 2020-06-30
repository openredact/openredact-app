import React, { useContext, useEffect } from "react";
import { Card, Divider, FormGroup } from "@blueprintjs/core";
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
    // initialize mechanism configs
    tags.forEach((tag) => {
      if (!hasProperty(config.mechanismsByTag, tag)) {
        const clone = { ...config };
        clone.mechanismsByTag[tag] = { mechanism: "useDefault" };
        setConfig(clone);
      }
    });
  }, [tags, config, setConfig]);

  useEffect(() => {
    // set config from history if possible
    const getConfigHistoryForTag = (tag) => (mechanism) => {
      return configHistory[mechanism][tag];
    };

    const configClone = { ...config };
    let loadedFromHistory = false;

    const isNotConfiguredAndHasHistory = (mechanismConfig, tag) => {
      return (
        mechanismConfig.mechanism !== "none" &&
        mechanismConfig.mechanism !== "useDefault" &&
        !hasConfigurations(mechanismConfig) &&
        getConfigHistoryForTag(tag)(mechanismConfig.mechanism)
      );
    };

    if (isNotConfiguredAndHasHistory(config.defaultMechanism, "default")) {
      loadedFromHistory = true;
      configClone.defaultMechanism = getConfigHistoryForTag("default")(
        config.defaultMechanism.mechanism
      );
    }

    Object.entries(config.mechanismsByTag).forEach(([tag, mechanismConfig]) => {
      if (isNotConfiguredAndHasHistory(mechanismConfig, tag)) {
        loadedFromHistory = true;
        configClone.mechanismsByTag[tag] = getConfigHistoryForTag(tag)(
          mechanismConfig.mechanism
        );
      }
    });

    if (loadedFromHistory) {
      setConfig(configClone);
    }
  }, [config, setConfig, configHistory]);

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

  const listItems = Object.entries(config.mechanismsByTag)
    .sort()
    .map(([tag, mechanismConfig]) => {
      return (
        <li key={tag}>
          <Item
            tag={tag}
            mechanismConfig={mechanismConfig}
            updateMechanismConfig={(mechanism) => updateConfig(mechanism, tag)}
          />
        </li>
      );
    });

  return (
    <Card className="config-menu">
      <FormGroup
        label={t("anonymization.default")}
        labelFor="default-mechanism-config"
      >
        <MechanismConfig
          mechanismConfig={config.defaultMechanism}
          updateMechanismConfig={updateConfig}
          tag="default"
        />
      </FormGroup>

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
