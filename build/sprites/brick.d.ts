export default class Brick extends Phaser.GameObjects.Sprite {
    constructor(config: any);
    update(time: any, delta: any, speedIncrementer: any): void;
    CheckForReset(): void;
    DidPassedPlayer(): boolean;
    SetStatus(status: any): void;
    carHit(enemy: any, carHit: any): void;
    static Config(): {
        size: {
            x: number;
            y: number;
        };
        moveAmount: {
            min: number;
            max: number;
        };
        startPos: {
            x: number;
            y: number;
        };
    };
}
