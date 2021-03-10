import { COUNTDOWN_STYLE, GAME_RESOLUTION } from "../utils/constants";

class CountdownScene extends Phaser.Scene {
  constructor() {
    super({
      key: "CountdownScene",
    });
  }

  create() {
    this.add.image(0, 0, "background", "background.png").setOrigin(0);
    this.add.image(349, 85, "background", "wave1.png").setOrigin(0);
    this.add.image(136, 97, "background", "wave2.png").setOrigin(0);
    this.add.image(429, 141, "background", "wave2.png").setOrigin(0);
    this.add.image(702, 217, "background", "wave3.png").setOrigin(0);
    this.add.image(615, 430, "background", "wave4.png").setOrigin(0);
    this.add.image(128, 443, "background", "wave5.png").setOrigin(0);
    this.add.image(632, 72, "background", "wave6.png").setOrigin(0);
    this.add.image(149, 207, "background", "wave6.png").setOrigin(0);
    this.add.image(371, 229, "background", "wave6.png").setOrigin(0);
    this.add.image(301, 351, "background", "wave7.png").setOrigin(0);
    this.add.image(608, 316, "background", "wave7.png").setOrigin(0);
    this.add.image(770, 670, "actors", "water_lily.png").setOrigin(0).setAngle(-135.0).setFlipY(true);

    let count = 3;

    const halfScreenWidth = GAME_RESOLUTION.width / 2;
    const halfScreenHeight = GAME_RESOLUTION.height / 2;
    const countdownText = this.add.text(0, 0, `${count}`, COUNTDOWN_STYLE);
    countdownText.setPosition(halfScreenWidth, halfScreenHeight).setOrigin(0.5, 0.5);
    countdownText.setScale(0.4, 0.4);
    this.tweens.add({
      targets: countdownText,
      props: {
        alpha: {
          value: {
            getStart: (target, key, value) => {
              return value + 0.75;
            },
            getEnd: () => {
              return 0;
            },
          },
          duration: 1000,
          yoyo: false,
          repeat: 0,
          loop: count - 1,
          ease: "Quad.easeInOut",
        },
        scaleX: {
          value: "1.0",
          duration: 500,
          yoyo: true,
          repeat: 0,
          loop: count - 1,
          ease: "Quad.easeInOut",
        },
        scaleY: {
          value: "1.0",
          duration: 500,
          yoyo: true,
          repeat: 0,
          loop: count - 1,
          ease: "Quad.easeInOut",
        },
      },
      loop: count - 1,
      onLoop: () => {
        count--;
        countdownText.setText(`${count}`);
      },
      onComplete: () => {
        this.scene.start("GameScene");
      },
    });
  }

  update() {}

  SetAudio() {
    // Add and play the music
    this.music = this.sound.add("intro");
    this.music.play({
      loop: true,
    });
  }

  ReturnToMainMenu() {
    this.scene.start("StartScene");
  }
}

export default CountdownScene;
