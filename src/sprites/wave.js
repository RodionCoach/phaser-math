import { LILY_BONDARY_LIMIT } from "../utils/constants";

export default class Lily extends Phaser.GameObjects.Sprite {
  static config = {
    size: {
      x: 141,
      y: 140,
    },
    moveAmount: {
      min: 100,
      max: 400,
    },
    startPos: {
      x: 0,
      y: 500,
    },
  };

  constructor({ scene, x, y, texture, key }) {
    super(scene, x, y, texture, key);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setDisplaySize(Lily.config.size.x, Lily.config.size.y);

    this.scoreCheckOnceFlag = true;
  }

  update(delta, speedIncrementer) {
    if (this.canMove) {
      const currentSpeed = Phaser.Math.Clamp(
        Lily.config.moveAmount.min + speedIncrementer,
        Lily.config.moveAmount.min,
        Lily.config.moveAmount.max,
      );

      this.y -= currentSpeed * (delta / 1000);
    }

    if (this.DidPassedPlayer() && this.scoreCheckOnceFlag) {
      this.scene.UpdateScore();
      this.scoreCheckOnceFlag = false;
    }

    this.CheckForReset();

    //this.scene.physics.world.overlap(this, this.DidntGuess.bind(this));
  }

  CheckForReset() {
    if (this.y < Lily.config.size.y) {
      this.canMove = false;
    }
  }

  DidPassedPlayer() {
    if (this.y < LILY_BONDARY_LIMIT + Lily.config.size.y) {
      return true;
    }

    return false;
  }

  SetStatus(status) {
    this.canMove = status;
    this.y = Lily.config.startPos.y;
    this.scoreCheckOnceFlag = true;
  }

  DidntGuess() {
    this.scene.ResetGame();
  }
}
