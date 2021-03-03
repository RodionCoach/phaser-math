class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene'
        });
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        const text = 'SCORE: ' + this.score + ' \n\n PRESS SPACE \n TO RESTART';

        this.startGameKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.textObject = this.make.text({
            x: this.game.renderer.width / 2,
            y: this.game.renderer.height / 2,
            text: text,
            origin: 0.5,
            style: {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
                wordWrap: {
                    width: this.game.renderer.width / 2, useAdvancedWrap: true
                }
            },
            add: true
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.startGameKey)) {
            this.StartGame();
        }
    }

    StartGame() {
        this.scene.start('GameScene');
    }
}

export default EndScene;
