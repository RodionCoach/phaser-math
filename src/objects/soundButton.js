import { ToggleAudio } from "../sceneHooks/SetAudio";

export default class SoundButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);

    this.setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        ToggleAudio(scene);
      })
      ?.setDepth(1);
  }
}
