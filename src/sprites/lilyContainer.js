import { LILY_BONDARY_LIMIT } from "../utils/constants";

export default class lilyContainer extends Phaser.GameObjects.Container {
  static config = {
    size: {
      x: 80,
      y: 80,
    },
    moveAmount: {
      min: 80,
      max: 400,
    },
    startPos: {
      x: 0,
      y: 600,
    },
  };

  constructor({ scene, x, y, children }) {
    super(scene, x, y, children);
    scene.add.existing(this);
    //scene.physics.world.enable(this);

    this.setSize(lilyContainer.config.size.x, lilyContainer.config.size.y);

    this.sprite = scene.add.sprite(0, 0, "", "").disableInteractive();
    this.add(this.sprite);
    this.textObject = scene.add.text(0, 0, "", {}).disableInteractive();
    this.add(this.textObject);
    this.textObjectForSign = scene.add.text(0, 0, "", {}).disableInteractive();
    this.add(this.textObjectForSign);

    let line = new Phaser.Geom.Line(-30, 35, 20, 35);
    this.graphics = scene.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
    this.graphics.strokeLineShape(line);
    this.graphics.lineStyle(2, 0x00aa00);
    this.add(this.graphics);
    this.allowUpdateScore = false;
  }

  CheckForReset() {
    return this.y < LILY_BONDARY_LIMIT;
  }

  DidPassedPlayer() {
    if (this.y > LILY_BONDARY_LIMIT + lilyContainer.config.size.y) {
      return true;
    }

    return false;
  }

  SetStatus(status, updateScore = true) {
    this.canMove = status;
    this.y = lilyContainer.config.startPos.y;
    this.allowUpdateScore = updateScore;
  }

  DidntGuess() {}
}
