import React from "react";
import GeneralizationMechanism from "./GeneralizationMechanism";
import PseudonymizationMechanism from "./PseudonymizationMechanism";
import SuppressionMechanism from "./SuppressionMechanism";

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

export const defaultConfigs = {
  generalization: { replacement: "<>" },
  pseudonymization: { stateful: true, formatString: "{}", counter: 1 },
  suppression: { suppressionChar: "X" },
};

export function setFromHistoryOrDefault(configHistory, tag, mechanismName) {
  if (hasHistoryEntry(configHistory, tag, mechanismName)) {
    return { ...getConfigHistoryForTag(configHistory, tag, mechanismName) };
  }
  return { ...defaultConfigs[mechanismName] };
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

    default:
      mechanismComponent = null;
  }
  /* eslint-enable react/jsx-props-no-spreading */

  return mechanismComponent;
}
