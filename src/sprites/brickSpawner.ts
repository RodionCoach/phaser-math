import Brick from './brick';
import Car from './car';

const TOTAL_BRICKS = 10;

export default class BrickSpawner extends Phaser.GameObjects.GameObject {
    constructor(config) {
        super(config.scene);
        config.scene.add.existing(this);

        this.speedIncrementer = 0;
        this.currentBrick = 0;
        this.bricks = [];

        for (let i = 0; i < TOTAL_BRICKS; i++) {
            this.bricks.push(new Brick({
                scene: config.scene,
                key: 'brick',
                x: Brick.Config().startPos.x,
                y: Brick.Config().startPos.y
            }));
        }

        this.GetBrick();
    }

    update(time, delta) {
        const activeBrick = Phaser.Math.Clamp(this.currentBrick - 1, 0, TOTAL_BRICKS);
        if (this.bricks[activeBrick].y > Car.Config().size.y * 2) {
            this.GetBrick();
        }

        this.speedIncrementer += (delta / 1000) * 0.5;

        this.bricks.forEach(brick => {
            brick.update(time, delta, this.speedIncrementer);
        });
    }

    GetBrick() {
        this.currentBrick %= TOTAL_BRICKS;

        const randInt = Phaser.Math.RND.integerInRange(0, 3);
        const brick = this.bricks[this.currentBrick];
        brick.SetStatus(true);
        brick.x = 50 + 100 * randInt;

        this.currentBrick++;
    }
}
