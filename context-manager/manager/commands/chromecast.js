const ChromecastAPI = require("chromecast-api");

const client = new ChromecastAPI();
var currentDevice;

/**
 * Connect to the device, generally a television.
 * It could be made so the device name is linked to the predicates.
 */
client.on("device", (device) => {
  if (!device.friendlyName == "UbiTV01") return;
  currentDevice = device;
  console.log("Device connected");
});

/**
 * Cast a video to the connected device.
 * @param {string} url The url of the video file.
 * @param {boolean} subtitlesOn If there is subtitles, it will be fetch from `${the url of the video}.vtt`
 * @param {number} startTime The time in seconds where the video should start.
 * @returns
 */
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
