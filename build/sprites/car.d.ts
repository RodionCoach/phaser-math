export default class Car extends Phaser.GameObjects.Sprite {
    constructor(config: any);
    update(keys: any, time: any, delta: any): void;
    static Config(): {
        size: {
            x: number;
            y: number;
        };
        moveAmount: number;
    };
}
