const fetch = require("node-fetch");
const { castVideo } = require("./chromecast");

function displayVideo(video, preocupations) {
  if (preocupations.casting) {
    castVideo(`http://192.168.43.20:3000/assets/${video}`, preocupations.subtitles);
  } else {
    fetch(`http://192.168.43.50:3000/displayVideo?name=${video}`)
      .then((res) => res.text())
      .then((text) => console.log(text))
      .catch(() => {
        console.log("Can't reach the Hololens at /displayVideo");
      });
  }
}

function displayImage(image, preocupations) {
  fetch(`http://192.168.43.50:3000/displayImage?name=${image}`)
    .then((res) => res.text())
    .then((text) => console.log(text))
    .catch(() => {
      console.log("Can't reach the Hololens at /displayImage");
    });
}

function displayObject(obj, preocupations) {
  fetch(`http://192.168.43.50:3000/displayObject?name=${obj}`)
    .then((res) => res.text())
    .then((text) => console.log(text))
    .catch(() => {
      console.log("Can't reach the Hololens at /displayObject");
    });
}

function resetScene() {
  fetch(`http://192.168.43.50:3000/reset`)
    .then((res) => res.text())
    .then((text) => console.log(text))
    .catch(() => {
      console.log("Can't reach the Hololens at /reset");
    });
}

module.exports = {
  displayVideo,
  displayImage,
  displayObject,
  resetScene,
};
