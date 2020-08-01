import React from "react";
import GeneralizationMechanism from "./GeneralizationMechanism";
import PseudonymizationMechanism from "./PseudonymizationMechanism";
import SuppressionMechanism from "./SuppressionMechanism";
import LaplaceNoiseMechanism from "./LaplaceNoiseMechanism";
import RandomizedResponseMechanism from "./RandomizedResponseMechanism";
import randomizedResponseCountryDemoValues from "./randomizedResponseCountryDemoValues";

export function hasProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

export function getConfigHistoryForTag(configHistory, tag, mechanismName) {
  return configHistory[mechanismName][tag];
}

export function hasHistoryEntry(configHistory, tag, mechanismName) {
  return (
    getConfigHistoryForTag(configHistory, tag, mechanismName) !== undefined
  );
}

const defaultConfigs = {
  generalization: { replacement: "<>" },
  laplaceNoise: { epsilon: 0.1 },
  pseudonymization: { stateful: true, formatString: "{}", counter: 1 },
  randomizedResponse: {
    mode: "dp",
    epsilon: 0.1,
    values: randomizedResponseCountryDemoValues,
    defaultValue: "<>",
  },
  suppression: { suppressionChar: "X" },
};

const laplaceNoiseParameters = {
  DATE: { sensitivity: 1000, encoder: "datetime" },
  NUMBER: { sensitivity: 1, encoder: "delimitedNumber" },
  MONEY: { sensitivity: 1, encoder: "delimitedNumber" },
  PHONE: { sensitivity: 100000, encoder: "delimitedNumber" },
};

export function setFromHistoryOrDefault(configHistory, tag, mechanismName) {
  if (hasHistoryEntry(configHistory, tag, mechanismName)) {
    return { ...getConfigHistoryForTag(configHistory, tag, mechanismName) };
  }

  let config = { ...defaultConfigs[mechanismName] };

  // add tag-specific properties
  if (
    mechanismName === "laplaceNoise" &&
    Object.keys(laplaceNoiseParameters).includes(tag)
  )
    config = { ...config, ...laplaceNoiseParameters[tag] };

  return config;
}

export function getMechanismComponent(mechanism, updateMechanism, tag) {
  const props = { mechanism, updateMechanism, tag };

  let mechanismComponent;
  /* eslint-disable react/jsx-props-no-spreading */
  switch (mechanism.mechanism) {
    case "generalization":
      mechanismComponent = <GeneralizationMechanism {...props} />;
      break;
    case "pseudonymization":
      mechanismComponent = <PseudonymizationMechanism {...props} />;
      break;
    case "suppression":
      mechanismComponent = <SuppressionMechanism {...props} />;
      break;
    case "laplaceNoise":
      mechanismComponent = <LaplaceNoiseMechanism {...props} />;
      break;
    case "randomizedResponse":
      mechanismComponent = <RandomizedResponseMechanism />;
      break;

    default:
      mechanismComponent = null;
  }
  /* eslint-enable react/jsx-props-no-spreading */

  return mechanismComponent;
}
