import {
  gameObjects,
  map,
  MAP_H,
  MAP_W,
  TILE_SIZE,
} from "../../games/GenerateMap";
import { images } from "../../games/Images";

export type MapOffset = {
  x: number;
  y: number;
};

const mapWidth = MAP_W * TILE_SIZE;
const mapHeight = MAP_H * TILE_SIZE;

export const getMapOffset = (canvas: HTMLCanvasElement): MapOffset => ({
  x: Math.max((canvas.width - mapWidth) / 2, 0),
  y: Math.max((canvas.height - mapHeight) / 2, 0),
});

export const drawMapTiles = (
  ctx: CanvasRenderingContext2D,
  offset: MapOffset,
) => {
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const tile = map[y][x];
      const image = images[tile];

      if (!image) continue;

      ctx.drawImage(
        image,
        offset.x + x * TILE_SIZE,
        offset.y + y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
      );
    }
  }
};

export const drawMapObjects = (
  ctx: CanvasRenderingContext2D,
  offset: MapOffset,
) => {
  gameObjects.forEach((object) => {
    if (object.type === "character") return;

    const image = images[object.type];
    const drawX = offset.x + object.x * TILE_SIZE;
    const drawY = offset.y + object.y * TILE_SIZE;

    ctx.drawImage(image, drawX, drawY, TILE_SIZE, TILE_SIZE);
  });
};
