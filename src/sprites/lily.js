import { LILY_BONDARY_LIMIT } from "../utils/constants";

export default class Lily extends Phaser.GameObjects.Sprite {
  static config = {
    size: {
      x: 141,
      y: 140,
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

  constructor({ scene, x, y, texture, key }) {
    super(scene, x, y, texture, key);
    scene.add.existing(this);
    //scene.physics.world.enable(this);

    this.setDisplaySize(Lily.config.size.x, Lily.config.size.y);

    this.allowUpdateScore = false;
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

    if (this.DidPassedPlayer() && this.allowUpdateScore) {
      this.scene.UpdateScore();
      this.allowUpdateScore = false;
    }

    if (this.canMove && this.CheckForReset()) {
      this.canMove = false;
      this.anims.stop();
      this.anims.play("line");
    }

    //this.scene.physics.world.overlap(this, this.DidntGuess.bind(this));
  }

  CheckForReset() {
    return this.y < LILY_BONDARY_LIMIT;
  }

  DidPassedPlayer() {
    if (this.y > LILY_BONDARY_LIMIT + Lily.config.size.y) {
      return true;
    }

    return false;
  }

  SetStatus(status, updateScore = true) {
    this.canMove = status;
    this.y = Lily.config.startPos.y;
    this.allowUpdateScore = updateScore;
  }

  DidntGuess() {}
}
