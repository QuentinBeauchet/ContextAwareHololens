const { isLightTooBright, isSoundTooLoud } = require("./utils");
const { displayImage, displayVideo, displayObject, resetScene } = require("./commands/displayElement");

function manage(context) {
  let preocupations = {
    subtitles: false,
    casting: false,
  };

  if (isLightTooBright(context)) {
    preocupations.casting = true;
  }

  if (isSoundTooLoud(context)) {
    preocupations.subtitles = true;
  }

  distributeDirectives(
    context.find((c) => c.type == "task"),
    preocupations
  );
}

function distributeDirectives(task, preocupations) {
  resetScene();
  for (let obj in task.display) {
    displayObject(obj, preocupations);
  }
  if (task.media) displayMedia(task.media, preocupations);
}

function displayMedia(media, preocupations) {
  const extension = media.split(".").pop();

  if (["mp4"].includes(extension)) {
    displayVideo(media, preocupations);
  }

  if (["png"].includes(extension)) {
    displayImage(media, preocupations);
  }
}

module.exports = {
  manage,
};
