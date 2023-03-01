const { isLightTooBright, isSoundTooLoud } = require("./predicates");
const { displayImage, displayVideo, displayObject, resetScene } = require("./commands/displayElement");

/**
 * The main function that will say what to do for the current context.
 * @param {Object} context
 */
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

/**
 * Distribute the directives for each element in the task.
 * @param {Object} task
 * @param {Object} preocupations
 */
function distributeDirectives(task, preocupations) {
  resetScene();
  for (let obj in task.display) {
    displayObject(obj, preocupations);
  }
  if (task.media) displayMedia(task.media, preocupations);
}

/**
 * Call the right display order for the type of the media.
 * @param {string} media
 * @param {Object} preocupations
 */
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
