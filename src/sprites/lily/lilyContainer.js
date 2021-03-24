import { SIGNS } from "../../utils/constants";
import { configObjects } from "../../utils/configObjects";

export default class lilyContainer extends Phaser.GameObjects.Container {
  static config = {
    startPos: {
      x: configObjects.lilySpawner.startPos.x,
      y: configObjects.lilySpawner.startPos.y,
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
      .sprite(
        configObjects.lilySpawner.divisionSign.x,
        configObjects.lilySpawner.divisionSign.y,
        configObjects.lilySpawner.divisionSign.texture,
      )
      .setOrigin(configObjects.lilySpawner.divisionSign.origin.x, configObjects.lilySpawner.divisionSign.origin.y)
      .setScale(configObjects.lilySpawner.divisionSign.scale.x, configObjects.lilySpawner.divisionSign.scale.y)
      .disableInteractive()
      .setVisible(false);
    this.add(this.divisionSign);

    this.canMove = false;
    this.answer = null;

    this.rt = this.scene.add
      .renderTexture(
        configObjects.lilySpawner.rt.x,
        configObjects.lilySpawner.rt.y,
        configObjects.lilySpawner.rt.width,
        configObjects.lilySpawner.rt.height,
      )
      .setVisible(false);
    this.rt.saveTexture("spriteText");
    this.spriteText = this.scene.add.sprite(0, 0, "spriteText");
    this.add(this.spriteText);
  }

  UpdateExampleTexture() {
    this.rt.clear();
    this.rt.beginDraw();
    this.rt.batchDraw(
      this.textObject,
      configObjects.lilySpawner.rt.textObject.x,
      configObjects.lilySpawner.rt.textObject.y,
    );
    if (this.textObjectForSign.text !== SIGNS[3]) {
      this.rt.batchDraw(
        this.textObjectForSign,
        configObjects.lilySpawner.rt.textObjectForSign.x,
        configObjects.lilySpawner.rt.textObjectForSign.y,
      );
    } else {
      this.rt.batchDraw(
        this.divisionSign,
        configObjects.lilySpawner.rt.divisionSign.x,
        configObjects.lilySpawner.rt.divisionSign.y,
      );
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
