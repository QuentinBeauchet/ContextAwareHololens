const LIGHT_THRESHOLD = 1000;
const SOUND_THRESHOLD = 85;

function isLightTooBright(context) {
  return context.findOne((c) => c.name == "Luminosité")?.value > LIGHT_THRESHOLD;
}

function isSoundTooLoud(context) {
  return context.findOne((c) => c.name == "Bruit")?.value > SOUND_THRESHOLD;
}

module.exports = {
  isLightTooBright,
  isSoundTooLoud,
};
