import { TILE_SIZE } from "../../games/GenerateMap";

type Props = {
  ctx: CanvasRenderingContext2D | null;
  drawX: number;
  drawY: number;
  image: CanvasImageSource;
  frameX?: number;
};

const TREE_FRAME_WIDTH = 32;
const TREE_FRAME_HEIGHT = 48;
const TREE_WIDTH = TILE_SIZE * 5;
const TREE_HEIGHT = TILE_SIZE * 7;

export const drawTree = ({ ctx, drawX, drawY, image, frameX = 2 }: Props) => {
  if (!ctx) return;

  const treeOffset = (TREE_WIDTH - TILE_SIZE) / 2;

  ctx.drawImage(
    image,
    frameX * TREE_FRAME_WIDTH,
    0,
    TREE_FRAME_WIDTH,
    TREE_FRAME_HEIGHT,
    drawX - treeOffset,
    drawY - TREE_HEIGHT + TILE_SIZE,
    TREE_WIDTH,
    TREE_HEIGHT,
  );
};
