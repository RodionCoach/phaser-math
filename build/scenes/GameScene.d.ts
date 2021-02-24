declare class GameScene extends Phaser.Scene {
    constructor();
    create(): void;
    update(time: any, delta: any): void;
    SpawnObjects(): void;
    SetAudio(): void;
    SetHUD(): void;
    UpdateScore(): void;
    ResetGame(): void;
    ResetMusic(): void;
    ResetScore(): void;
}
export default GameScene;
