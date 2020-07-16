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
