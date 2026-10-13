
import Phaser from "phaser";
import saraSheetUrl from "../assets/characters/sarah/spritesheet.png";

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 1440;
const LAST_IDLE_FRAME = 15;

const INTRO_LINES = [
  "FindOut. A chance to start over.",
  "This sounds... suspiciously easy.",
  "What if I give it a try?",
  "Well, if I'm going to die, at least it'll be somewhere beautiful.",
];

export class IntroScene extends Phaser.Scene {
  private sara!: Phaser.GameObjects.Sprite;
  private dialogueText!: Phaser.GameObjects.Text;
  private continueText!: Phaser.GameObjects.Text;
  private currentLine = 0;

  constructor() {
    super("IntroScene");
  }

preload() {
  this.load.on("filecomplete", (key: string) => {
    if (key === "sara") {
      console.log("Спрайтшит Сары загружен");
    }
  });

  this.load.on("loaderror", (file: Phaser.Loader.File) => {
    console.error("Ошибка загрузки:", file.key, file.src);
  });

  this.load.spritesheet("sara", saraSheetUrl, {
    frameWidth: FRAME_WIDTH,
    frameHeight: FRAME_HEIGHT,
  });
}

  create() {
    const { width, height } = this.scale;

    // Background
    this.cameras.main.setBackgroundColor("#11151d");

    // Company title
    const title = this.add
      .text(width / 2, 42, "F I N D O U T", {
        fontFamily: "monospace",
        fontSize: "24px",
        color: "#c7d2fe",
      })
      .setOrigin(0.5);

    title.setAlpha(0);

    this.tweens.add({
      targets: title,
      alpha: 1,
      duration: 1200,
      ease: "Linear",
    });

    // Sara's idle animation
    this.anims.create({
      key: "sara-idle",
      frames: this.anims.generateFrameNumbers("sara", {
        start: 0,
        end: LAST_IDLE_FRAME,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.add.image(100, 100, "sara", 0);

    this.sara = this.add
    .sprite(width / 2, height * 0.43, "sara", 0)
    .setScale(0.1);


    this.tweens.add({
      targets: this.sara,
      alpha: 1,
      duration: 800,
      delay: 500,
      ease: "Linear",
    });

    // Dialogue panel
    const panelX = 24;
    const panelY = height - 142;
    const panelWidth = width - 48;
    const panelHeight = 112;

    this.add
      .rectangle(
        width / 2,
        panelY + panelHeight / 2,
        panelWidth,
        panelHeight,
        0x20283a,
        0.96,
      )
      .setStrokeStyle(2, 0x7885aa);

    this.add.text(panelX + 16, panelY + 12, "SARA", {
      fontFamily: "monospace",
      fontSize: "14px",
      color: "#a5b4fc",
    });

    this.dialogueText = this.add.text(
      panelX + 16,
      panelY + 38,
      "",
      {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffff",
        wordWrap: { width: panelWidth - 32 },
        lineSpacing: 6,
      },
    );

    this.continueText = this.add
      .text(
        width - 44,
        panelY + panelHeight - 12,
        "▼",
        {
          fontFamily: "monospace",
          fontSize: "16px",
          color: "#c7d2fe",
        },
      )
      .setOrigin(1, 1);

    this.showLine();

    // Click or press Space / Enter to continue
    this.input.on("pointerdown", () => this.nextLine());

    this.input.keyboard?.on("keydown-SPACE", () => this.nextLine());
    this.input.keyboard?.on("keydown-ENTER", () => this.nextLine());
  }

  private showLine() {
    this.dialogueText.setText(INTRO_LINES[this.currentLine]);
  }

  private nextLine() {
    if (this.currentLine < INTRO_LINES.length - 1) {
      this.currentLine += 1;
      this.showLine();
      return;
    }

    // Placeholder for the next scene
    this.scene.start("GameScene");
  }
}
