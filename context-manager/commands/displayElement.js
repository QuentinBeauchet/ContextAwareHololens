const fetch = require("node-fetch");
const { castVideo } = require("./chromecast");

const LOCAL_IP = "192.168.0.134";
const HOLOLENS_URL = "http://192.168.0.134:8080";

function displayVideo(video, preocupations) {
  if (preocupations.casting) {
    castVideo(`http://${LOCAL_IP}:3000/assets/${video}`, preocupations.subtitles);
  } else {
    fetch(`${HOLOLENS_URL}/displayVideo?name=${video}`).catch(() => {
      console.log("Can't reach the Hololens at /displayVideo");
    });
  }
}

function displayImage(image, preocupations) {
  fetch(`${HOLOLENS_URL}/displayImage?name=${image}`).catch(() => {
    console.log("Can't reach the Hololens at /displayImage");
  });
}

function displayObject(obj, preocupations) {
  fetch(`${HOLOLENS_URL}/displayObject?name=${obj}`).catch(() => {
    console.log("Can't reach the Hololens at /displayObject");
  });
}

function resetScene() {
  fetch(`${HOLOLENS_URL}/reset`).catch(() => {
    console.log("Can't reach the Hololens at /reset");
  });
}

module.exports = {
  displayVideo,
  displayImage,
  displayObject,
  resetScene,
};
