export function hasProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

export function hasConfigurations(mechanism) {
  /**
   * Each mechanism has the property mechanism (with values "generalization", "suppression", ...).
   * Any other property of a mechanism is its configuration (e.g. `suppressionChar`).
   */
  return Object.keys(mechanism).length > 1;
}
