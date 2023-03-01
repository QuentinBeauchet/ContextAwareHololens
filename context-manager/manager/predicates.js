const predicates = require("./parameters/predicates.json");

/**
 * If the light is more than a threshold it will return true;
 * @param {Object} context
 * @returns
 */
function isLightTooBright(context) {
  return Object.values(context).find((c) => c.name == "Luminosité")?.value > predicates.LIGHT_THRESHOLD;
}

/**
 * If the sound is more than a threshold it will return true;
 * @param {Object} context
 * @returns
 */
function isSoundTooLoud(context) {
  return Object.values(context).find((c) => c.name == "Bruit")?.value > predicates.SOUND_THRESHOLD;
}

module.exports = {
  isLightTooBright,
  isSoundTooLoud,
};
