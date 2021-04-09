/// <reference types="phaser" />
import LilyContainer from "./lilyContainer";
export default class LilySpawner extends Phaser.GameObjects.GameObject {
    speedIncrementer: number;
    delta: number;
    currentLiliesCount: number;
    lilies: LilyContainer[];
    notGuessedCount: number;
    guessedCount: number;
    visibleLiliesCount: number;
    constructor(scene: Phaser.Scene);
    checkSomeExample(answerText: number): number;
    GetLily(HeartsCallBack?: () => void): void;
}
