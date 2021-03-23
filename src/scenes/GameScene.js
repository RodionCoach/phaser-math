import LilySpawner from "../sprites/lily/lilySpawner";
import { GUIContainer } from "../objects/GUIContainer";
import { SetKeyboardKeys } from "../sceneHooks/SetKeyboardKeys";
import { SetAudio } from "../sceneHooks/SetAudio";
import { GAME_RESOLUTION, GAME_HEALTH_POINTS, TOTAL_LILIES } from "../utils/constants";
import { BUTTON_NUMBER_STYLE, SCORE_STYLE } from "../utils/stylies";
import SoundButton from "../objects/soundButton";
import { delay } from "../utils/delay";
import { configObjects } from "../utils/configObjects";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });

    this.currentLifes = GAME_HEALTH_POINTS;
    this.prevHealthPoints = 0;
    this.heartsGroup = null;
    this.lilySpawner = null;
    this.music = null;
    this.plusPts = null;
    this.soundControl = null;
  }

  create() {
    this.soundControl = new SoundButton(
      this,
      configObjects.soundControl.x,
      configObjects.soundControl.y,
      configObjects.soundControl.texture,
      configObjects.soundControl.frameOn,
      configObjects.soundControl.frameOff,
    );
    const pauseControl = this.add
      .image(
        configObjects.pauseControl.x,
        configObjects.pauseControl.y,
        configObjects.pauseControl.texture,
        configObjects.pauseControl.frame,
      )
      .setOrigin(configObjects.pauseControl.origin.x, configObjects.pauseControl.origin.y)
      .setInteractive({ useHandCursor: true })
      ?.setDepth(configObjects.pauseControl.depth);
    pauseControl.on("pointerdown", () => {
      this.scene.launch("PauseScene");
      this.scene.pause();
    });

    this.plusPts = this.add
      .text(configObjects.scoreText.plusPts.x, configObjects.scoreText.plusPts.y, "", SCORE_STYLE)
      .setOrigin(configObjects.scoreText.plusPts.origin.x, configObjects.scoreText.plusPts.origin.y)
      .setDepth(configObjects.scoreText.plusPts.depth)
      .setVisible(false);
    this.add
      .shader(
        configObjects.waterShader.name,
        GAME_RESOLUTION.width / 2,
        GAME_RESOLUTION.height / 2,
        GAME_RESOLUTION.width,
        GAME_RESOLUTION.height,
        [configObjects.waterShader.iChannel0, configObjects.waterShader.iChannel1, configObjects.waterShader.iChannel2],
      )
      .setUniform("isFoam.value", 1.0);

    this.add
      .image(
        configObjects.leftSand.x,
        configObjects.leftSand.y,
        configObjects.leftSand.texture,
        configObjects.leftSand.frame,
      )
      .setOrigin(configObjects.leftSand.origin.x, configObjects.leftSand.origin.y);
    this.add
      .image(
        configObjects.rightSand.x,
        configObjects.rightSand.y,
        configObjects.rightSand.texture,
        configObjects.rightSand.frame,
      )
      .setOrigin(configObjects.rightSand.origin.x, configObjects.rightSand.origin.y);
    this.add
      .image(configObjects.boat.x, configObjects.boat.y, configObjects.boat.texture, configObjects.boat.frame)
      .setAngle(configObjects.boat.angle);
    this.add
      .text(
        configObjects.scoreText.label.x,
        configObjects.scoreText.label.y,
        configObjects.scoreText.label.text,
        SCORE_STYLE,
      )
      .setOrigin(configObjects.scoreText.label.origin.x, configObjects.scoreText.label.origin.y)
      .setDepth(configObjects.scoreText.label.depth);
    this.add
      .image(configObjects.bridge.x, configObjects.bridge.y, configObjects.bridge.texture, configObjects.bridge.frame)
      .setOrigin(configObjects.bridge.origin.x, configObjects.bridge.origin.y)
      .setDepth(configObjects.bridge.depth);
    this.add
      .image(
        configObjects.rightStones.x,
        configObjects.rightStones.y,
        configObjects.rightStones.texture,
        configObjects.rightStones.frame,
      )
      .setOrigin(configObjects.rightStones.origin.x, configObjects.rightStones.origin.y)
      .setDepth(configObjects.rightStones.depth);
    this.add
      .image(
        configObjects.leftStones.x,
        configObjects.leftStones.y,
        configObjects.leftStones.texture,
        configObjects.leftStones.frame,
      )
      .setOrigin(configObjects.leftStones.origin.x, configObjects.leftStones.origin.y)
      .setDepth(configObjects.leftStones.depth);

    this.sound.add(configObjects.soundsName.background);
    this.sound.add(configObjects.soundsName.wrong);
    this.sound.add(configObjects.soundsName.missed);
    this.sound.add(configObjects.soundsName.solved);

    this.heartsGroup = this.add
      .container(configObjects.heartsGroupContainer.x, configObjects.heartsGroupContainer.y)
      .setName(configObjects.heartsGroupContainer.name)
      .setDepth(configObjects.heartsGroupContainer.depth);
    for (let i = 0; i < this.currentLifes; i++) {
      const heartFilled = this.add
        .sprite(
          0,
          i * configObjects.heartsGroupContainer.distance,
          configObjects.heartsGroupContainer.texture,
          configObjects.heartsGroupContainer.frame,
        )
        .setOrigin(configObjects.heartsGroupContainer.origin.x, configObjects.heartsGroupContainer.origin.y)
        .disableInteractive();
      this.heartsGroup.add(heartFilled);
    }

    const containerInputGUI = this.add
      .container(GAME_RESOLUTION.width / 2, configObjects.containerInputGUI.y)
      .setName(configObjects.containerInputGUI.name)
      .setDepth(configObjects.containerInputGUI.depth);

    const inputField = new GUIContainer({
      scene: this,
      x: configObjects.containerInputGUI.inputField.x,
      y: configObjects.containerInputGUI.inputField.y,
    })
      .setName(configObjects.containerInputGUI.inputField.name)
      .setDepth(configObjects.containerInputGUI.inputField.depth)
      .setSize(configObjects.containerInputGUI.inputField.size.x, configObjects.containerInputGUI.inputField.size.y)
      .disableInteractive();
    inputField.sprite.setTexture(
      configObjects.containerInputGUI.inputField.texture,
      configObjects.containerInputGUI.inputField.frame,
    );
    inputField.textObject
      .setStyle(BUTTON_NUMBER_STYLE)
      .setOrigin(
        configObjects.containerInputGUI.inputField.origin.x,
        configObjects.containerInputGUI.inputField.origin.y,
      );
    containerInputGUI.add(inputField);

    const resetButton = new GUIContainer({
      scene: this,
      x: -inputField.sprite.width / 2 - configObjects.containerInputGUI.resetButton.distance,
      y: configObjects.containerInputGUI.resetButton.y,
    })
      .setName(configObjects.containerInputGUI.resetButton.name)
      .setDepth(configObjects.containerInputGUI.resetButton.depth)
      .setSize(configObjects.containerInputGUI.resetButton.size.x, configObjects.containerInputGUI.resetButton.size.y)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.ResetAnswerText(inputField.textObject, inputField.sprite);
      });
    resetButton.sprite.setTexture(
      configObjects.containerInputGUI.resetButton.texture,
      configObjects.containerInputGUI.resetButton.frame,
    );
    containerInputGUI.add(resetButton);

    const setButton = new GUIContainer({
      scene: this,
      x: inputField.sprite.width / 2 + configObjects.containerInputGUI.setButton.distance,
      y: configObjects.containerInputGUI.setButton.y,
    })
      .setName(configObjects.containerInputGUI.setButton.name)
      .setDepth(configObjects.containerInputGUI.setButton.depth)
      .setSize(configObjects.containerInputGUI.setButton.size.x, configObjects.containerInputGUI.setButton.size.y)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.CheckAnswer(inputField.textObject, inputField.sprite);
      });
    setButton.sprite.setTexture(
      configObjects.containerInputGUI.setButton.texture,
      configObjects.containerInputGUI.setButton.frame,
    );
    containerInputGUI.add(setButton);

    const containerDigitalGUI = this.add
      .container(GAME_RESOLUTION.width / 2 - configObjects.containerDigitalGUI.x, configObjects.containerDigitalGUI.y)
      .setName(configObjects.containerDigitalGUI.name)
      .setDepth(configObjects.containerDigitalGUI.depth);
    for (let i = 0; i < 10; i++) {
      const digitalButton = new GUIContainer({
        scene: this,
        x:
          i === 0
            ? 9 * configObjects.containerDigitalGUI.digitalButton.distance
            : (i - 1) * configObjects.containerDigitalGUI.digitalButton.distance,
        y: configObjects.containerDigitalGUI.digitalButton.y,
      })
        .setName(configObjects.containerDigitalGUI.digitalButton.name)
        .setDepth(configObjects.containerDigitalGUI.digitalButton.depth)
        .setSize(
          configObjects.containerDigitalGUI.digitalButton.size.x,
          configObjects.containerDigitalGUI.digitalButton.size.y,
        )
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.SetAnswerText(i, inputField.textObject, inputField.sprite);
        });
      digitalButton.sprite.setTexture(
        configObjects.containerDigitalGUI.digitalButton.texture,
        configObjects.containerDigitalGUI.digitalButton.frame,
      );
      digitalButton.textObject
        .setStyle(BUTTON_NUMBER_STYLE)
        .setOrigin(
          configObjects.containerDigitalGUI.digitalButton.origin.x,
          configObjects.containerDigitalGUI.digitalButton.origin.y,
        );
      digitalButton.textObject.setText(i);
      containerDigitalGUI.add(digitalButton);
    }

    this.SpawnObjects();
    this.SetScore();
    SetAudio(this, configObjects.soundsName.background, 0.4, true);
    SetKeyboardKeys(this, inputField);
  }

  update(time, delta) {
    const renderedLily = Phaser.Math.Clamp(this.lilySpawner.currentLiliesCount - 1, 0, TOTAL_LILIES);
    if (
      this.lilySpawner.lilies[renderedLily].y < this.game?.config?.height - configObjects.logic.lineSpawn ||
      !this.lilySpawner.visibleLiliesCount
    ) {
      this.lilySpawner.GetLily(() => {
        this.HeartsCallBack();
      });
    }

    this.lilySpawner.lilies.forEach(lily => {
      if (lily.tweenMove) {
        lily.tweenMove.timeScale = this.lilySpawner.speedIncrementer;
      }
    });

    this.soundControl.setTexture(
      configObjects.soundControl.texture,
      this.sound.mute ? configObjects.soundControl.frameOff : configObjects.soundControl.frameOn,
    );
  }

  HeartsCallBack() {
    if (this.prevHealthPoints !== this.lilySpawner.notGuessedCount) {
      this.prevNotGuessed = this.lilySpawner.notGuessedCount;
      this.tweens.add({
        targets: this.heartsGroup.getAll()[this.prevNotGuessed - 1],
        scaleX: configObjects.heartsGroupContainer.tweenConfig.scale.x,
        scaleY: configObjects.heartsGroupContainer.tweenConfig.scale.y,
        duration: configObjects.heartsGroupContainer.tweenConfig.duration,
        yoyo: true,
        ease: configObjects.heartsGroupContainer.tweenConfig.ease,
        repeat: 0,
        onComplete: () => {
          this.PlayMissedSound();
          this.heartsGroup
            .getAll()
            [this.prevNotGuessed - 1].setTexture(
              configObjects.heartsGroupContainer.texture,
              configObjects.heartsGroupContainer.frameEmpty,
            );
        },
      });
      if (this.prevNotGuessed === this.currentLifes) {
        //ToDo: move it out
        delay(this, 500, () => this.ResetGame());
      }
    }
  }

  SpawnObjects() {
    this.lilySpawner = new LilySpawner(this);
    this.lilySpawner.GetLily(() => {
      this.HeartsCallBack();
    });
  }

  ResetAnswerText(inputTextObject, inputFieldObject, text) {
    inputTextObject.setText(text);
    inputFieldObject.setTexture(
      configObjects.containerInputGUI.inputField.texture,
      configObjects.containerInputGUI.inputField.frame,
    );
  }

  WrongAnswerText(inputTextObject, inputFieldObject) {
    inputTextObject.setText("");
    inputFieldObject.setTexture(
      configObjects.containerInputGUI.inputField.texture,
      configObjects.containerInputGUI.inputField.wrongFrame,
    );
  }

  SetAnswerText(subString, inputTextObject, inputFieldObject) {
    let text = "";
    if (inputTextObject.text.length <= configObjects.containerInputGUI.inputField.length) {
      text = inputTextObject.text + subString;
    } else {
      text = subString;
    }
    this.ResetAnswerText(inputTextObject, inputFieldObject, text);
  }

  CheckAnswer(inputTextObject, inputFieldObject) {
    if (inputTextObject.text !== "") {
      const guessedCount = this.lilySpawner.checkSomeExample(+inputTextObject.text);
      if (guessedCount) {
        this.PlaySolvedSound();
        this.UpdateScore(configObjects.scoreText.plusPts.value * guessedCount);
        this.ResetAnswerText(inputTextObject, inputFieldObject, "");
      } else {
        this.PlayWrongSound();
        this.WrongAnswerText(inputTextObject, inputFieldObject);
      }
    } else {
      this.WrongAnswerText(inputTextObject, inputFieldObject);
    }
  }

  PlaySolvedSound() {
    this.sound.get(configObjects.soundsName.solved).play();
  }

  PlayWrongSound() {
    this.sound.get(configObjects.soundsName.wrong).play();
  }

  PlayMissedSound() {
    this.sound.get(configObjects.soundsName.missed).play();
  }

  SetScore() {
    this.score = {
      pts: 0,
      textObject: this.make.text({
        x: configObjects.scoreText.valueText.x,
        y: configObjects.scoreText.valueText.y,
        textObject: "0",
        origin: {
          x: configObjects.scoreText.valueText.origin.x,
          y: configObjects.scoreText.valueText.origin.y,
        },
        style: SCORE_STYLE,
        add: true,
      }),
    };

    this.score.textObject.setText(this.score.pts);
  }

  UpdateScore(scores) {
    this.score.pts += scores;
    this.score.textObject.setText(this.score.pts);
    this.plusPts.setText(`+${scores}`).setVisible(true);
    delay(this, 1000, () => this.plusPts.setVisible(false));
  }

  ResetGame() {
    this.scene.stop("GameScene");
    this.sound.stopAll();
    this.scene.start("EndScene", {
      currentScore: this.score.pts,
    });
  }
}

export default GameScene;
