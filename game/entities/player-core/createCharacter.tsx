import { TILE_SIZE } from "../../config/GenerateMap";

type Props = {
  ctx: CanvasRenderingContext2D | null;
  drawX: number;
  drawY: number;
  image: CanvasImageSource;
  frameX?: number; // Индекс колонки (0 .. 5)
  frameY?: number; // Индекс строки (0 .. 1)
  isRotate?: boolean;
};

// Размеры одного кадра на спрайт-шите (256x256, сетка 6x2)
const FRAME_WIDTH = 256 / 6;  // ~42.666px
const FRAME_HEIGHT = 128;      // 256 / 2

// Вычисляем размеры персонажа на холсте с сохранением пропорций (1:3)
const DRAW_HEIGHT = TILE_SIZE * 3.6; 
const DRAW_WIDTH = DRAW_HEIGHT * (FRAME_WIDTH / FRAME_HEIGHT); // ~1.2 * TILE_SIZE

export const createCharacterDraw = ({
  ctx,
  drawX,
  drawY,
  image,
  frameX = 0,
  frameY = 0,
  isRotate = false,
}: Props) => {
  if (!ctx) return;

  // Вычисляем координаты кадра на спрайт-шите
  const sourceX = frameX * FRAME_WIDTH;
  const sourceY = frameY * FRAME_HEIGHT;

  // Центрируем персонажа по горизонтали относительно плитки
  const offsetX = (DRAW_WIDTH - TILE_SIZE) / 2;
  const targetX = drawX - offsetX;
  const targetY = drawY - DRAW_HEIGHT + TILE_SIZE;

  ctx.save();

  if (isRotate) {
    ctx.scale(-1, 1);
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      -targetX - DRAW_WIDTH,
      targetY,
      DRAW_WIDTH,
      DRAW_HEIGHT
    );
  } else {
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      targetX,
      targetY,
      DRAW_WIDTH,
      DRAW_HEIGHT
    );
  }

  ctx.restore();
};