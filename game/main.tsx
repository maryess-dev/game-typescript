
import Phaser from "phaser";
import { IntroScene } from "./scenes/IntroScene";

export function createGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 540,
    backgroundColor: "#11151d",

    // Pixel-art rendering
    pixelArt: true,
    antialias: false,
    roundPixels: true,

    scene: [IntroScene],

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  });
}
