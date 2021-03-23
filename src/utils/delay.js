export const delay = (scene, delay, callBack) => {
  scene.time.addEvent({
    delay: delay,
    callback: () => callBack(),
    callbackScope: scene,
  });
};
