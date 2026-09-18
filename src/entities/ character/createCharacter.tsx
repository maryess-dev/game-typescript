import { FRAME_SIZE, TILE_SIZE } from "../../games/GenerateMap";

type Props = {
  ctx: CanvasRenderingContext2D | null;
  drawX: number;
  drawY: number;
  image: CanvasImageSource;
  frameX?: number;
  frameY?: number;
  isRotate?: boolean;
};

const CHARACTER_SIZE = TILE_SIZE * 3.6;

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

  const characterOffset = (CHARACTER_SIZE - TILE_SIZE) / 2;

  if (isRotate) {
    ctx.save();
    ctx.scale(-1, 1);

    ctx.drawImage(
      image,
      frameX * FRAME_SIZE,
      frameY * FRAME_SIZE,
      FRAME_SIZE,
      FRAME_SIZE,
      -(drawX - characterOffset) - CHARACTER_SIZE,
      drawY - CHARACTER_SIZE + TILE_SIZE,
      CHARACTER_SIZE,
      CHARACTER_SIZE,
    );

    ctx.restore();
    return;
  } else {
    ctx.drawImage(
      image,
      frameX * FRAME_SIZE,
      frameY * FRAME_SIZE,
      FRAME_SIZE,
      FRAME_SIZE,
      drawX - characterOffset,
      drawY - CHARACTER_SIZE + TILE_SIZE,
      CHARACTER_SIZE,
      CHARACTER_SIZE,
    );
  }
};
