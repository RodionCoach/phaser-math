/// <reference types="phaser" />
import LilySpawner from "../sprites/lily/lilySpawner";
import SoundButton from "../objects/soundButton";
import { Score } from "../types";
declare class GameScene extends Phaser.Scene {
    currentLifes: number;
    prevHealthPoints: number;
    heartsGroup: Phaser.GameObjects.Container;
    lilySpawner: LilySpawner;
    plusPts: Phaser.GameObjects.Text;
    soundControl: SoundButton;
    prevNotGuessed: number;
    score: Score;
    constructor();
    create(): void;
    update(): void;
    HeartsCallBack(): void;
    SpawnObjects(): void;
    ResetAnswerText(inputTextObject: Phaser.GameObjects.Text, inputFieldObject: Phaser.GameObjects.Sprite, text?: string): void;
    WrongAnswerText(inputTextObject: Phaser.GameObjects.Text, inputFieldObject: Phaser.GameObjects.Sprite): void;
    SetAnswerText(subString: string, inputTextObject: Phaser.GameObjects.Text, inputFieldObject: Phaser.GameObjects.Sprite): void;
    CheckAnswer(inputTextObject: Phaser.GameObjects.Text, inputFieldObject: Phaser.GameObjects.Sprite): void;
    PlaySolvedSound(): void;
    PlayWrongSound(): void;
    PlayMissedSound(): void;
    SetScore(): void;
    UpdateScore(scores: number): void;
    ResetGame(): void;
}
export default GameScene;
