import GameScene from "../scenes/GameScene";
import PauseScene from "../scenes/PauseScene";
import RulesScene from "../scenes/RulesScene";
import StartScene from "../scenes/StartScene";
import EndScene from "../scenes/EndScene";

export const ToggleAudio = (
  scene: GameScene | PauseScene | RulesScene | StartScene | EndScene,
  texture: string,
  frameOn: string,
  frameOff: string,
): void => {
  if (!scene.sound.mute) {
    scene.soundControl.setTexture(texture, frameOff);
  } else {
    scene.soundControl.setTexture(texture, frameOn);
  }
  scene.sound.mute = !scene.sound.mute;
};
