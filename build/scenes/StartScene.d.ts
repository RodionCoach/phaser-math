declare class StartScene extends Phaser.Scene {
    private startGameKey;
    private textButtonStart;
    private textButtonRules;
    constructor();
    create(): void;
    update(): void;
    StartGame(): void;
    HowToPlay(): void;
}
export default StartScene;
