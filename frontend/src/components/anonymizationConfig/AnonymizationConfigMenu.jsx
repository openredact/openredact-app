import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  H3,
  H6,
  Icon,
  Tooltip,
  UL,
} from "@blueprintjs/core";
import { Position } from "@blueprintjs/core/lib/cjs/common/position";
import "./AnonymizationConfigMenu.sass";
import PropTypes from "prop-types";
import Item from "./Item";
import useLocalStorage from "../../js/useLocalStorage";
import PolyglotContext from "../../js/polyglotContext";
import { hasProperty, setFromHistoryOrDefault } from "./anonymizationConfig";
import DefaultMechanismConfig from "./DefaultMechanismConfig";

const AnonymizationConfigMenu = ({ tags, config, setConfig }) => {
  const t = useContext(PolyglotContext);

  const [configHistory, setConfigHistory] = useLocalStorage(
    "anonymizationConfigHistory",
    {
      suppression: {},
      generalization: {},
      pseudonymization: {},
      laplaceNoise: {},
      randomizedResponse: {},
    }
  );
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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
      mechanismName !== "none" &&
      mechanismName !== "useDefault" &&
      (mechanismConfig === undefined ||
        Object.keys(mechanismConfig).length === 0)
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

    if (mechanismConfig && Object.keys(mechanismConfig).length > 0)
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
      <H3>{t("anonymization.anonymization")}</H3>
      <H6 id="default-mechanism-header" className="more-top-padding">
        {t("anonymization.default")}
        <Tooltip
          content={
            <div id="default-mechanism-info-tooltip-content">
              {t("anonymization.default_tooltip")}
            </div>
          }
          position={Position.BOTTOM_RIGHT}
        >
          <Icon id="default-mechanism-info" icon="info-sign" iconSize={14} />
        </Tooltip>
      </H6>
      <DefaultMechanismConfig
        mechanism={config.defaultMechanism}
        updateMechanism={updateConfig}
      />
      <div className="vertical-space" />
      <Button
        icon="settings"
        className="show-advanced-button"
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        active={showAdvancedOptions}
      >
        {t("anonymization.advanced_settings")}
      </Button>
      <div className="vertical-space" />
      <Collapse isOpen={showAdvancedOptions}>
        <UL>{listItems}</UL>
      </Collapse>
    </Card>
  );
};

AnonymizationConfigMenu.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  setConfig: PropTypes.func.isRequired,
};

export default AnonymizationConfigMenu;
