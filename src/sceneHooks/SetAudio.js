export const SetAudio = (scene, soundName = "background", volume = 0.4, loop = false) => {
  scene.sound.get(`${soundName}`).play({ loop: loop });
  scene.sound.get(`${soundName}`).volume = volume;
};
