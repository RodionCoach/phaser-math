import { InitData } from "../types";
declare class EndScene extends Phaser.Scene {
    currentScore: number;
    soundControl: Phaser.GameObjects.Image;
    constructor();
    init(data: InitData): void;
    create(): void;
    IsBestScore(): string;
    RestartGame(): void;
    ReturnToMainMenu(): void;
}
export default EndScene;
