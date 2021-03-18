import { SIGNS } from "../../utils/constants";

export default class lilyContainer extends Phaser.GameObjects.Container {
  static config = {
    startPos: {
      x: 0,
      y: 600,
    },
  };

  constructor({ scene, x, y, children }) {
    super(scene, x, y, children);
    scene.add.existing(this);

    this.sprite = scene.add.sprite(0, 0, "", "").disableInteractive();
    this.add(this.sprite);
    this.textObject = scene.add.text(0, 0, "", {}).disableInteractive().setVisible(false);
    this.textObjectForSign = scene.add.text(0, 0, "", {}).disableInteractive().setVisible(false);

    this.divisionSign = scene.add
      .sprite(0, 0, "divisionSign")
      .setOrigin(0.5, 0.5)
      .setScale(1.1, 1.1)
      .disableInteractive()
      .setVisible(false);
    this.add(this.divisionSign);

    this.canMove = false;
    this.answer = null;

    this.rt = this.scene.add.renderTexture(400, 300, 128, 128).setVisible(false);
    this.rt.saveTexture("spriteText");
    this.spriteText = this.scene.add.sprite(0, 0, "spriteText");
    this.add(this.spriteText);
  }

  UpdateExampleTexture() {
    this.rt.clear();
    this.rt.beginDraw();
    this.rt.batchDraw(this.textObject, 64 + 23, 64);
    if (this.textObjectForSign.text !== SIGNS[3]) {
      this.rt.batchDraw(this.textObjectForSign, 64 - 37, 64);
    } else {
      this.rt.batchDraw(this.divisionSign, 64 - 28, 65);
    }
    this.rt.endDraw();
  }

  SetStatus(status, answer) {
    this.canMove = status;
    this.y = lilyContainer.config.startPos.y;
    if (status) {
      this.answer = answer;
    }
  }
}
