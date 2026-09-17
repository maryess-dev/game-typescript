type Tile = "main" | "tree" | "wall" | "grass" | "character";
export type GameObjectType = "tree" | "character" | "grass";

export const MAP_W = 40;
export const MAP_H = 22;
export const TILE_SIZE = 48;
export const FRAME_SIZE = 32;

const range = (size: number) => [...Array(size).keys()];

export const map: Tile[][] = range(MAP_H).map(() =>
  range(MAP_W).map(() => "main"),
);

export const gameObjects: Array<{
  id: number;
  type: GameObjectType;
  x: number;
  y: number;
}> = [
  { id: 1, type: "tree", x: 5, y: 5 },
  { id: 2, type: "tree", x: 8, y: 3 },
  { id: 3, type: "character", x: 12, y: 7 },
  { id: 4, type: "grass", x: 15, y: 8 },
];
