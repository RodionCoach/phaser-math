export const ToggleAudio = (scene, texture, frameOn, frameOff) => {
  if (!scene.sound.mute) {
    scene.soundControl.setTexture(texture, frameOff);
  } else {
    scene.soundControl.setTexture(texture, frameOn);
  }
  scene.sound.mute = !scene.sound.mute;
};
