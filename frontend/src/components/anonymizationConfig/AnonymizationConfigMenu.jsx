import React, { useContext, useEffect } from "react";
import { Card, Divider, FormGroup } from "@blueprintjs/core";
import "./AnonymizationConfigMenu.sass";
import PropTypes from "prop-types";
import Item from "./Item";
import MechanismConfig from "./MechanismConfig";
import useLocalStorage from "../../js/useLocalStorage";
import PolyglotContext from "../../js/polyglotContext";
import {
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
    }
  );

  useEffect(() => {
    // initialize mechanism configs
    const configClone = { ...config };
    let changed = false;

    tags.forEach((tag) => {
      if (!hasProperty(config.mechanismsByTag, tag)) {
        configClone.mechanismsByTag[tag] = {
          mechanism: "useDefault",
          config: {},
        };
        changed = true;
      }
    });

    if (changed) setConfig(configClone);
  }, [tags, config, setConfig]);

  function updateConfigHistory(mechanism, tag) {
    const historyClone = { ...configHistory };
    historyClone[mechanism.mechanism][tag] = mechanism.config;
    setConfigHistory(historyClone);
  }

  function updateConfig(mechanism, tag = "default") {
    const mechanismName = mechanism.mechanism;
    let mechanismConfig = mechanism.config;
    if (
      mechanismConfig === undefined ||
      (Object.keys(mechanismConfig).length === 0 &&
        mechanismName !== "none" &&
        mechanismName !== "useDefault")
    ) {
      mechanismConfig = setFromHistoryOrDefault(
        configHistory,
        tag,
        mechanismName
      );
    }

    const myMechanism = { mechanism: mechanismName, config: mechanismConfig };
    if (tag === "default") {
      setConfig({ ...config, defaultMechanism: myMechanism });
    } else {
      const configClone = { ...config };
      configClone.mechanismsByTag[tag] = myMechanism;
      setConfig(configClone);
    }

    if (Object.keys(mechanismConfig).length > 0)
      updateConfigHistory(myMechanism, tag);
  }

  const listItems = Object.entries(config.mechanismsByTag)
    .sort()
    .map(([tag, mechanism]) => {
      return (
        <li key={tag}>
          <Item
            tag={tag}
            mechanism={mechanism}
            updateMechanism={(myMechanism) => updateConfig(myMechanism, tag)}
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
          mechanism={config.defaultMechanism}
          updateMechanism={updateConfig}
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
