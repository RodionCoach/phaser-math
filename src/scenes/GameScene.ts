import Car from '../sprites/car';
import BrickSpawner from '../sprites/brickSpawner';

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });

        this.currentScoreDelay = 0;
    }

    create() {
        this.SpawnObjects();
        this.SetAudio();
        this.SetHUD();

        this.keys = {
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            rightArrow: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            leftArrow: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        };
    }

    update(time, delta) {
        this.car.update(this.keys, time, delta);
        this.brickSpawner.update(time, delta);
    }

    SpawnObjects() {
        this.bg = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'road');
        this.bg.setDisplaySize(this.game.config.width, this.game.config.height);

        this.car = new Car({
            scene: this,
            key: 'car',
            x: 50,
            y: this.game.renderer.height - 150
        });

        this.brickSpawner = new BrickSpawner({
            scene: this
        });
    }

    SetAudio() {
        // Add and play the music
        this.music = this.sound.add('mars-slow');
        this.music.play({
            loop: true
        });
    }

    SetHUD() {
        this.score = {
            pts: 0,
            textObject: this.make.text({
                x: this.game.renderer.width - 60,
                y: 60,
                text: '0',
                origin: {
                    x: 1,
                    y: 0.5
                },
                style: {
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    align: 'right'
                },
                add: true
            })
        };
    }

    UpdateScore() {
        this.score.pts += 1;
        this.score.textObject.setText(this.score.pts);
    }

    ResetGame() {
        const score = this.score.pts;
        this.ResetMusic();
        this.ResetScore();

        this.scene.start('EndScene', {
            score: score
        });
    }

    ResetMusic() {
        this.music.pause();
        this.music.seek = 0;
    }

    ResetScore () {
        this.score.pts = 0;
        this.score.textObject.setText(0);
    }
}

export default GameScene;
