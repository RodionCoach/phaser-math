import { GAME_RESOLUTION } from "../utils/constants";
import { COUNTDOWN_STYLE } from "../utils/stylies";
import { configObjects } from "../utils/configObjects";

class CountdownScene extends Phaser.Scene {
  constructor() {
    super({
      key: "CountdownScene",
    });
  }

  create() {
    this.add.shader(
      configObjects.waterShader.name,
      GAME_RESOLUTION.width / 2,
      GAME_RESOLUTION.height / 2,
      GAME_RESOLUTION.width,
      GAME_RESOLUTION.height,
      [configObjects.waterShader.iChannel0, configObjects.waterShader.iChannel1, configObjects.waterShader.iChannel2],
    );
    this.add
      .image(
        configObjects.menuWaterLily.x,
        configObjects.menuWaterLily.y,
        configObjects.menuWaterLily.texture,
        configObjects.menuWaterLily.frame,
      )
      .setOrigin(configObjects.menuWaterLily.origin.x, configObjects.menuWaterLily.origin.y)
      .setAngle(configObjects.menuWaterLily.angle)
      .setFlipY(configObjects.menuWaterLily.setFlipY);

    let count = configObjects.countDown.count;

    const halfScreenWidth = GAME_RESOLUTION.width / 2;
    const halfScreenHeight = GAME_RESOLUTION.height / 2;
    const countdownText = this.add.text(
      configObjects.countDown.x,
      configObjects.countDown.y,
      `${count}`,
      COUNTDOWN_STYLE,
    );
    countdownText
      .setPosition(halfScreenWidth, halfScreenHeight)
      .setOrigin(configObjects.countDown.origin.x, configObjects.countDown.origin.y);
    countdownText.setScale(configObjects.countDown.scale.x, configObjects.countDown.scale.y);
    this.tweens.add({
      targets: countdownText,
      props: {
        alpha: {
          value: {
            getStart: (target, key, value) => {
              return value + configObjects.countDown.startedDelta;
            },
            getEnd: () => {
              return 0;
            },
          },
          duration: configObjects.countDown.alphaDuration,
          yoyo: false,
          repeat: 0,
          loop: count - 1,
          ease: configObjects.countDown.ease,
        },
        scaleX: {
          value: configObjects.countDown.scaleTween.x,
          duration: configObjects.countDown.scaleDuration,
          yoyo: true,
          repeat: 0,
          loop: count - 1,
          ease: configObjects.countDown.ease,
        },
        scaleY: {
          value: configObjects.countDown.scaleTween.y,
          duration: configObjects.countDown.scaleDuration,
          yoyo: true,
          repeat: 0,
          loop: count - 1,
          ease: configObjects.countDown.ease,
        },
      },
      loop: count - 1,
      onLoop: () => {
        count--;
        countdownText.setText(`${count}`);
      },
      onComplete: () => {
        this.scene.stop("CountdownScene");
        this.scene.start("GameScene");
      },
    });
  }
}

export default CountdownScene;
