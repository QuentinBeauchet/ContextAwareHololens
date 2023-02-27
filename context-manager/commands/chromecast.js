const ChromecastAPI = require("chromecast-api");

const client = new ChromecastAPI();
var currentDevice;

client.on("device", (device) => {
  if (!device.friendlyName == "UbiTV01") return;

  currentDevice = device;

  console.log("Device connected");
});

function castVideo(url, subtitlesOn = false, startTime = 0) {
  if (!currentDevice) {
    console.log("No device found");
    return;
  }

  let media = {
    url,
  };

  if (subtitlesOn) {
    media.subtitles = [
      {
        language: "en-US",
        url: `${url}.vtt`,
        name: "English",
      },
    ];
  }

  currentDevice.stop();
  currentDevice.play(
    media,
    {
      startTime,
    },
    (err) => {
      if (err) return;
      console.log("Video playing");
    }
  );
}

module.exports = {
  castVideo,
};
