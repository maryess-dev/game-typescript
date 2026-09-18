import { gameObjects } from "../../games/GenerateMap";

type CollisionArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const objectCollisionAreas: Partial<
  Record<
    "tree" | "house",
    Omit<CollisionArea, "x" | "y"> & {
      offsetX: number;
      offsetY: number;
    }
  >
> = {
  tree: {
    offsetX: 0,
    offsetY: -2,
    width: 2,
    height: 3,
  },
  house: {
    offsetX: -2,
    offsetY: -3,
    width: 5,
    height: 3,
  },
};

const getBlockingAreas = (): CollisionArea[] =>
  gameObjects.flatMap((object) => {
    if (object.type !== "tree" && object.type !== "house") return [];

    const area = objectCollisionAreas[object.type];
    if (!area) return [];

    return {
      x: object.x + area.offsetX,
      y: object.y + area.offsetY,
      width: area.width,
      height: area.height,
    };
  });

export const isBlockedCell = (x: number, y: number) =>
  getBlockingAreas().some(
    (area) =>
      x >= area.x &&
      x < area.x + area.width &&
      y >= area.y &&
      y < area.y + area.height,
  );
