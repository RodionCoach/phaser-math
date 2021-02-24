export default class Car extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);

        this.canInput = true;
        this.setDisplaySize(Car.Config().size.x, Car.Config().size.y);
    }

    update(keys, time, delta) {
        if (Phaser.Input.Keyboard.JustDown(keys.right)) {
            this.x += Car.Config().moveAmount;
        } else if (Phaser.Input.Keyboard.JustDown(keys.rightArrow)) {
            this.x += Car.Config().moveAmount;
        }

        if (Phaser.Input.Keyboard.JustDown(keys.left)) {
            this.x -= Car.Config().moveAmount;
        } else if (Phaser.Input.Keyboard.JustDown(keys.leftArrow)) {
            this.x -= Car.Config().moveAmount;
        }

        this.x = Phaser.Math.Clamp(this.x, 50, 350);
    }

    static Config() {
        return {
            size: {
                x: 40,
                y: 60
            },
            moveAmount: 100
        };
    }
}
