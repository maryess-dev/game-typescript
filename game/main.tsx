import Phaser from "phaser";
import { IntroScene } from "./scenes/IntroScene";

/** Создаёт экземпляр Phaser и запускает вступительную сцену внутри контейнера. */
export function createGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 1960,
    height: 1080,
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
