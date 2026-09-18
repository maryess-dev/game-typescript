import { TILE_SIZE } from "../../games/GenerateMap";

type Props = {
  ctx: CanvasRenderingContext2D | null;
  drawX: number;
  drawY: number;
  image: CanvasImageSource;
};

const HOUSE_SOURCE_X = 144;
const HOUSE_SOURCE_Y = 0;
const HOUSE_SOURCE_WIDTH = 80;
const HOUSE_SOURCE_HEIGHT = 112;
const HOUSE_WIDTH = TILE_SIZE * 4.5;
const HOUSE_HEIGHT = TILE_SIZE * 6.5;
const HOUSE_TOP_SOURCE_HEIGHT = 64;
const HOUSE_BASE_SOURCE_Y = HOUSE_TOP_SOURCE_HEIGHT;
const HOUSE_BASE_SOURCE_HEIGHT = HOUSE_SOURCE_HEIGHT - HOUSE_BASE_SOURCE_Y;

const drawHousePart = ({
  ctx,
  drawX,
  drawY,
  image,
  sourceY,
  sourceHeight,
}: Props & {
  sourceY: number;
  sourceHeight: number;
}) => {
  if (!ctx) return;

  const houseOffset = (HOUSE_WIDTH - TILE_SIZE) / 2;
  const scaleY = HOUSE_HEIGHT / HOUSE_SOURCE_HEIGHT;
  const destinationX = drawX - houseOffset;
  const destinationY = drawY - HOUSE_HEIGHT + TILE_SIZE + sourceY * scaleY;

  ctx.drawImage(
    image,
    HOUSE_SOURCE_X,
    HOUSE_SOURCE_Y + sourceY,
    HOUSE_SOURCE_WIDTH,
    sourceHeight,
    destinationX,
    destinationY,
    HOUSE_WIDTH,
    sourceHeight * scaleY,
  );
};

export const drawHouseBase = (props: Props) => {
  drawHousePart({
    ...props,
    sourceY: HOUSE_BASE_SOURCE_Y,
    sourceHeight: HOUSE_BASE_SOURCE_HEIGHT,
  });
};

export const drawHouseTop = (props: Props) => {
  drawHousePart({
    ...props,
    sourceY: 0,
    sourceHeight: HOUSE_TOP_SOURCE_HEIGHT,
  });
};
