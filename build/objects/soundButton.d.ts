/// <reference types="phaser" />
import { ToggleAudioConfig } from "../types";
interface SoundButtonConfig extends ToggleAudioConfig {
    x: number;
    y: number;
}
export default class SoundButton extends Phaser.GameObjects.Image {
    constructor({ scene, x, y, texture, frameOn, frameOff }: SoundButtonConfig);
}
export {};
