import Phaser from "phaser";

class IntroScene extends Phaser.Scene
{
    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v410');
        this.load.image('pic', 'assets/pics/baal-loader.png');
    }

    create ()
    {
        this.add.image(400, 300, 'pic');

        const text = this.add.text(80, 550, '', { font: '16px Courier' });

        text.setText([
            `Game Title: ${game.config.gameTitle}`,
            `Version: ${game.config.gameVersion}`
        ]);
    }
}

const config = {
    scale: { mode: Phaser.Scale.FIT },
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    scene: IntroScene,

    //  Open the Dev Tools
    //  Notice that it no longer says Phaser, or the Phaser version, in the banner
    banner: {
        hidePhaser: true
    }
};

const game = new Phaser.Game(config);