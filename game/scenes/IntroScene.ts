import Phaser from "phaser";
const saraIdleFrames = Object.entries(
  import.meta.glob<string>(
    [
      "../assets/characters/sarah/frames/frame_000[0-9].png",
      "../assets/characters/sarah/frames/frame_001[0-5].png",
    ],
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  ),
)
  .filter(([path]) => /frame_00(?:0\d|1[0-5])\.png$/.test(path))
  .sort(([left], [right]) => left.localeCompare(right));

const saraIdleFrameKeys = saraIdleFrames.map(
  (frame) => `sara-idle-${frame[0].match(/frame_(\d+)\.png$/)?.[1] ?? "0"}`,
);
// Обратный проход возвращает анимацию к первому кадру без резкого скачка.
const saraIdleAnimationFrames = [
  ...saraIdleFrameKeys,
  ...saraIdleFrameKeys.slice(1, -1).reverse(),
];

const INTRO_LINES = [
  "FindOut. A chance to start over.",
  "This sounds... suspiciously easy.",
  "What if I give it a try?",
  "Well, if I'm going to die, at least it'll be somewhere beautiful.",
];

export class IntroScene extends Phaser.Scene {
  private sara!: Phaser.GameObjects.Sprite;
  private dialogueText!: Phaser.GameObjects.Text;
  private currentLine = 0;

  constructor() {
    // Ключ сцены используется Phaser при запуске и переключении сцен.
    super("IntroScene");
  }

  /** Загружает кадры idle-анимации до создания игровых объектов. */
  preload() {
    this.load.on("loaderror", (file: Phaser.Loader.File) => {
      console.error("Ошибка загрузки:", file.key, file.src);
    });

    saraIdleFrames.forEach((frame, index) => {
      this.load.image(saraIdleFrameKeys[index], frame[1]);
    });
  }

  /** Создаёт фон, заголовок, персонажа и панель диалога. */
  create() {
    const { width, height } = this.scale;

    // Цвет фона основной камеры сцены.
    this.cameras.main.setBackgroundColor("#11151d");

    // Заголовок плавно появляется при старте сцены.
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

    // 12 кадров/с дают умеренный темп; обратный проход смягчает повтор цикла.
    this.anims.create({
      key: "sara-idle",
      frames: saraIdleAnimationFrames.map((key) => ({ key })),
      frameRate: 12,
      repeat: -1,
    });

    this.sara = this.add
      .sprite(width / 2, height * 0.43, saraIdleFrameKeys[0])
      .setScale(0.8)
      .play("sara-idle");

    this.tweens.add({
      targets: this.sara,
      alpha: 1,
      duration: 800,
      delay: 500,
      ease: "Linear",
    });

    // Панель диалога и текстовые игровые объекты поверх фона.
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

    this.dialogueText = this.add.text(panelX + 16, panelY + 38, "", {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#ffffff",
      wordWrap: { width: panelWidth - 32 },
      lineSpacing: 6,
    });

    this.add
      .text(width - 44, panelY + panelHeight - 12, "▼", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#c7d2fe",
      })
      .setOrigin(1, 1);

    this.showLine();

    // Диалог можно продолжать кликом мыши или клавишами Space и Enter.
    this.input.on("pointerdown", () => this.nextLine());

    this.input.keyboard?.on("keydown-SPACE", () => this.nextLine());
    this.input.keyboard?.on("keydown-ENTER", () => this.nextLine());
  }

  /** Показывает текущую реплику в панели диалога. */
  private showLine() {
    this.dialogueText.setText(INTRO_LINES[this.currentLine]);
  }

  /** Переключает реплику или запускает следующую сцену после последней. */
  private nextLine() {
    if (this.currentLine < INTRO_LINES.length - 1) {
      this.currentLine += 1;
      this.showLine();
      return;
    }

    // После последней реплики передаём управление игровой сцене.
    this.scene.start("GameScene");
  }
}
