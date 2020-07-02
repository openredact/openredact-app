export function hasProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

export function isConfigured(mechanism) {
  /**
   * Each mechanism has the property mechanism (with values "generalization", "suppression", ...).
   * Any other property of a mechanism is its configuration (e.g. `suppressionChar`).
   */
  return Object.keys(mechanism).length > 1;
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
  generalization: { mechanism: "generalization", replacement: "<>" },
  pseudonymization: {
    mechanism: "pseudonymization",
    formatString: "{}",
    initialCounterValue: 1,
  },
  suppression: { mechanism: "suppression", suppressionChar: "X" },
};

export function setFromHistoryOrDefault(configHistory, tag, mechanismName) {
  if (hasHistoryEntry(configHistory, tag, mechanismName)) {
    return getConfigHistoryForTag(configHistory, tag, mechanismName);
  }
  return defaultConfigs[mechanismName];
}
