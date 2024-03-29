import { ToggleAudio } from "../sceneHooks/ToggleAudio";
import { DEPTH_LAYERS } from "../utils/constants";
import { ToggleAudioConfig } from "../types";

interface SoundButtonConfig extends ToggleAudioConfig {
  x: number;
  y: number;
}

export default class SoundButton extends Phaser.GameObjects.Image {
  constructor({ scene, x, y, texture, frameOn, frameOff }: SoundButtonConfig) {
    super(scene, x, y, texture, scene.sound.mute ? frameOff : frameOn);
    scene.add.existing(this);

    this.setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        ToggleAudio({ scene, texture, frameOn, frameOff });
      })
      ?.setDepth(DEPTH_LAYERS.one);
  }
}
