import React, { useContext, useEffect } from "react";
import { Card, Divider, FormGroup } from "@blueprintjs/core";
import "./AnonymizationConfigMenu.sass";
import PropTypes from "prop-types";
import Item from "./Item";
import MechanismConfig from "./MechanismConfig";
import useLocalStorage from "../../js/useLocalStorage";
import PolyglotContext from "../../js/polyglotContext";
import {
  isConfigured,
  hasProperty,
  setFromHistoryOrDefault,
} from "../../js/anonymizationConfig";

const AnonymizationConfigMenu = ({ tags, config, setConfig }) => {
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
    const configClone = { ...config };
    let changed = false;

    tags.forEach((tag) => {
      if (!hasProperty(config.mechanismsByTag, tag)) {
        configClone.mechanismsByTag[tag] = { mechanism: "useDefault" };
        changed = true;
      }
    });

    if (changed) setConfig(configClone);
  }, [tags, config, setConfig]);

  function updateConfigHistory(mechanismConfig, tag) {
    const historyClone = { ...configHistory };
    historyClone[mechanismConfig.mechanism][tag] = mechanismConfig;
    setConfigHistory(historyClone);
  }

  function updateConfig(mechanismConfig, tag = "default") {
    const mechanismName = mechanismConfig.mechanism;
    let myMechanismConfig = mechanismConfig;
    if (
      !isConfigured(mechanismConfig) &&
      mechanismName !== "none" &&
      mechanismName !== "useDefault"
    ) {
      myMechanismConfig = setFromHistoryOrDefault(
        configHistory,
        tag,
        mechanismName
      );
    }

    if (tag === "default") {
      setConfig({ ...config, defaultMechanism: myMechanismConfig });
    } else {
      const configClone = { ...config };
      configClone.mechanismsByTag[tag] = myMechanismConfig;
      setConfig(configClone);
    }

    if (isConfigured(mechanismConfig))
      updateConfigHistory(mechanismConfig, tag);
  }

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

AnonymizationConfigMenu.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  setConfig: PropTypes.func.isRequired,
};

export default AnonymizationConfigMenu;
