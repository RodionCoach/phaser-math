export const SetAudio = (scene, soundName = "background", volume = 0.4, loop = false) => {
  scene.sound.get(`${soundName}`).play({ loop: loop });
  scene.sound.get(`${soundName}`).volume = volume;
};

export const ToggleAudio = scene => {
  if (!scene.sound.mute) {
    scene.soundControl.setTexture("gui", "sound_off_light.svg");
  } else {
    scene.soundControl.setTexture("gui", "sound_on.svg");
  }
  scene.sound.mute = !scene.sound.mute;
};
