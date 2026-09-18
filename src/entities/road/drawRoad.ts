import { FRAME_SIZE, TILE_SIZE } from "../../games/GenerateMap";

type Props = {
  ctx: CanvasRenderingContext2D | null;
  drawX: number;
  drawY: number;
  image: CanvasImageSource;
  frameX?: number;
};

const ROAD_WIDTH = TILE_SIZE * 1;
const ROAD_HEIGHT = TILE_SIZE * 1;

export const drawRoad = ({ ctx, drawX, drawY, image, frameX = 2 }: Props) => {
  if (!ctx) return;

  // const treeOffset = (TREE_WIDTH - TILE_SIZE) / 2;

  ctx.drawImage(
    image,
    frameX,
    0,
    FRAME_SIZE,
    FRAME_SIZE,
    drawX,
    drawY + TILE_SIZE,
    ROAD_WIDTH,
    ROAD_HEIGHT,
  );
};
