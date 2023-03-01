const fetch = require("node-fetch");
const { castVideo } = require("./chromecast");
require("dotenv").config();

/**
 * Send the video display command where it should go using the preocupations.
 * @param {string} video
 * @param {Object} preocupations
 */
function displayVideo(video, preocupations) {
  if (preocupations.casting) {
    castVideo(`http://${process.env.LOCAL_IP}:3000/assets/${video}`, preocupations.subtitles);
  } else {
    fetch(`${process.env.HOLOLENS_URL}/displayVideo?name=${video}`).catch(() => {
      console.log("Can't reach the Hololens at /displayVideo");
    });
  }
}

/**
 * Send the image display command where it should go using the preocupations.
 * @param {string} image
 * @param {Object} preocupations
 */
function displayImage(image, preocupations) {
  fetch(`${process.env.HOLOLENS_URL}/displayImage?name=${image}`).catch(() => {
    console.log("Can't reach the Hololens at /displayImage");
  });
}

/**
 * Send the object display command where it should go using the preocupations.
 * @param {string} obj
 * @param {Object} preocupations
 */
function displayObject(obj, preocupations) {
  fetch(`${process.env.HOLOLENS_URL}/displayObject?name=${obj}`).catch(() => {
    console.log("Can't reach the Hololens at /displayObject");
  });
}

/**
 * Reset the scene in the hololens so a new context can be implmented.
 */
function resetScene() {
  fetch(`${process.env.HOLOLENS_URL}/reset`).catch(() => {
    console.log("Can't reach the Hololens at /reset");
  });
}

module.exports = {
  displayVideo,
  displayImage,
  displayObject,
  resetScene,
};
