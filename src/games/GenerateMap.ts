type Tile =
  | "main"
  | "tree"
  | "wall"
  | "grass"
  | "character"
  | "idleCharacter"
  | "road"
  | "house";
export type GameObjectType = "tree" | "character" | "grass" | "road" | "house";

export const MAP_W = 54;
export const MAP_H = 32;
export const TILE_SIZE = 32;
export const FRAME_SIZE = 32;

const range = (size: number) => [...Array(size).keys()];

export const map: Tile[][] = range(MAP_H).map(() =>
  range(MAP_W).map(() => "main"),
);

const random = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const gameObjects: Array<{
  id: number;
  type: GameObjectType;
  x: number;
  y: number;
}> = [
  { id: 1, type: "tree", x: random(MAP_W), y: random(MAP_H) },
  { id: 2, type: "tree", x: 8, y: 3 },
  { id: 3, type: "character", x: 12, y: 7 },
  { id: 4, type: "grass", x: 15, y: 8 },
  { id: 5, type: "road", x: 10, y: 5 },
  { id: 6, type: "house", x: 16, y: 7 },
];
