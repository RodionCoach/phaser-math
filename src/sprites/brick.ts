export default class Brick extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);

        this.setDisplaySize(Brick.Config().size.x, Brick.Config().size.y);

        this.scoreCheckOnceFlag = true;
    }

    update(time, delta, speedIncrementer) {
        if (this.canMove) {
            const currentSpeed = Phaser.Math.Clamp(
                Brick.Config().moveAmount.min + speedIncrementer,
                Brick.Config().moveAmount.min, Brick.Config().moveAmount.max
            );
            this.y += currentSpeed * (delta / 1000);
        }

        if (this.DidPassedPlayer() && this.scoreCheckOnceFlag) {
            this.scene.UpdateScore();
            this.scoreCheckOnceFlag = false;
        }

        this.CheckForReset();

        this.scene.physics.world.overlap(this, this.scene.car, this.carHit.bind(this));
    }

    CheckForReset() {
        if (this.y > this.scene.game.renderer.height + Brick.Config().size.y) {
            this.canMove = false;
        }
    }

    DidPassedPlayer() {
        if (this.y > this.scene.car.y + Brick.Config().size.y) {
            return true;
        }

        return false;
    }

    SetStatus(status) {
        this.canMove = status;
        this.y = Brick.Config().startPos.y;
        this.scoreCheckOnceFlag = true;
    }

    carHit(enemy, carHit) {
        this.scene.ResetGame();
    }

    static Config() {
        return {
            size: {
                x: 25,
                y: 25
            },
            moveAmount: {
                min: 100,
                max: 400
            },
            startPos: {
                x: 0,
                y: -25
            }
        };
    }
}
