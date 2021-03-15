import LilyContainer from "./lilyContainer";

import { LILY_BONDARY_LIMIT, EXAMPLES_STYLE, EXAMPLES, TOTAL_LILIES } from "../../utils/constants";

export default class LilySpawner extends Phaser.GameObjects.GameObject {
  static notGuessedCount = 0;

  constructor(scene) {
    super(scene);

    scene.add.existing(this);
    this.speedIncrementer = 1;
    this.currentLiliesCount = 0;
    this.lilies = [];
    this.indexActiveLily = 0;
    this.currentExample = 0;

    let frameNamesWave = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 4,
      zeroPad: 4,
      prefix: "wave/",
      suffix: ".png",
    });
    scene.anims.create({ key: "wave", frames: frameNamesWave, frameRate: 4, repeat: -1 });

    let frameNamesSolved = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 11,
      zeroPad: 4,
      prefix: "solved/",
      suffix: ".png",
    });
    scene.anims.create({ key: "solved", frames: frameNamesSolved, frameRate: 10, repeat: 0 });

    let frameNamesLine = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 5,
      zeroPad: 4,
      prefix: "line/",
      suffix: ".png",
    });
    scene.anims.create({ key: "line", frames: frameNamesLine, frameRate: 15, repeat: 0 });

    for (let i = 0; i < TOTAL_LILIES; i++) {
      let lilyContainer = new LilyContainer({
        scene,
        x: LilyContainer.config.startPos.x,
        y: LilyContainer.config.startPos.y,
      });
      lilyContainer.sprite.setTexture("lily", "wave/0001.png").setScale(1.1, 1.1);
      lilyContainer.sprite.on(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        () => {
          lilyContainer.SetStatus(false);
        },
        this,
      );
      lilyContainer.textObject.setStyle(EXAMPLES_STYLE).setOrigin(1, 0.5).setPosition(20, 0);
      lilyContainer.textObjectForSign.setStyle(EXAMPLES_STYLE).setOrigin(0, 0.5);
      this.lilies.push(lilyContainer);
    }

    this.GetLily();
  }

  update(delta) {
    const activeLily = Phaser.Math.Clamp(this.currentLiliesCount - 1, 0, TOTAL_LILIES);

    if (this.lilies[activeLily].y < this.scene.game?.config?.height - 240) {
      this.GetLily();
    }

    this.speedIncrementer += (delta / 1000) * 0.005;

    this.lilies.forEach(lily => {
      if (lily.tweenMove) {
        lily.tweenMove.timeScale = this.speedIncrementer;
      }
    });
  }

  checkExample(answerText) {
    const currentLiliesAnswer = this.lilies[this.indexActiveLily].answer;
    if (+answerText === currentLiliesAnswer) {
      this.lilies[this.indexActiveLily].tweenMove.stop();
      this.lilies[this.indexActiveLily].textObject.setText("");
      this.lilies[this.indexActiveLily].textObjectForSign.setText("");
      this.lilies[this.indexActiveLily].sprite.anims.play({
        key: "solved",
        frameRate: Phaser.Math.Between(15, 20),
      });
      this.indexActiveLily += 1;
      this.indexActiveLily %= TOTAL_LILIES;
      return true;
    } else {
      return false;
    }
  }

  GetLily() {
    this.currentExample = Phaser.Math.Between(0, EXAMPLES.length - 1);
    this.currentLiliesCount %= TOTAL_LILIES;
    const randInt = Phaser.Math.RND.integerInRange(186, 650);
    const lily = this.lilies[this.currentLiliesCount];
    lily.SetStatus(true, EXAMPLES[this.currentExample].answer);
    lily.x = randInt;
    lily.textObject.setText(`${EXAMPLES[this.currentExample].number1}\n${EXAMPLES[this.currentExample].number2}`);
    lily.textObjectForSign.setText(EXAMPLES[this.currentExample].sign).setPosition(-lily.textObject.width, 0);
    this.currentLiliesCount += 1;
    lily.sprite.anims.play({
      key: "wave",
      frameRate: Phaser.Math.Between(2, 5),
    });
    lily.tweenMove = this.scene.tweens.add({
      targets: lily,
      y: LILY_BONDARY_LIMIT,
      duration: 10000,
      ease: "Linear",
      onComplete: () => {
        LilySpawner.notGuessedCount++;
        lily.textObject.setText("");
        lily.textObjectForSign.setText("");
        lily.sprite.anims.stop();
        lily.sprite.anims.play({
          key: "line",
          frameRate: 15,
        });
        this.indexActiveLily += 1;
        this.indexActiveLily %= TOTAL_LILIES;
      },
    });
  }
}
