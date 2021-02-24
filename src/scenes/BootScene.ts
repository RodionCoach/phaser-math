class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value: number) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, +this.sys.game.config.height / 2, +this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('TitleScene');
        });

        this.load.image('car', 'assets/images/car.png'); // 16-bit later
        this.load.image('brick', 'assets/images/brick.png');
        this.load.image('road', 'assets/images/road.png');

        this.load.audio('mars-slow', 'assets/sound/Mars.wav');
        this.load.audio('intro', 'assets/sound/Intro.wav');
    }
}

export default BootScene;
