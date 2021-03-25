import { ToggleAudio } from "../sceneHooks/ToggleAudio";
import { DEPTH_LAYERS } from "../utils/constants";
import GameScene from "../scenes/GameScene";
import PauseScene from "../scenes/PauseScene";
import RulesScene from "../scenes/RulesScene";
import StartScene from "../scenes/StartScene";
import EndScene from "../scenes/EndScene";

export default class SoundButton extends Phaser.GameObjects.Image {
  constructor(
    scene: GameScene | PauseScene | RulesScene | StartScene | EndScene,
    x: number,
    y: number,
    texture: string,
    frameOn: string,
    frameOff: string,
  ) {
    super(scene, x, y, texture, scene.sound.mute ? frameOff : frameOn);
    scene.add.existing(this);

    this.setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        ToggleAudio(scene, texture, frameOn, frameOff);
      })
      ?.setDepth(DEPTH_LAYERS.one);
  }
}
