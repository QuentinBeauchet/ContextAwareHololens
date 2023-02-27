const LIGHT_THRESHOLD = 1000;
const SOUND_THRESHOLD = 85;

function isLightTooBright(context) {
  return Object.values(context).find((c) => c.name == "Luminosité")?.value > LIGHT_THRESHOLD;
}

function isSoundTooLoud(context) {
  return Object.values(context).find((c) => c.name == "Bruit")?.value > SOUND_THRESHOLD;
}

module.exports = {
  isLightTooBright,
  isSoundTooLoud,
};
