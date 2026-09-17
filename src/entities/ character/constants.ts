import { TILE_SIZE } from "../../games/GenerateMap";

const WALK_FRAMES = 6;
const IDLE_FRAMES = 4;
const WALK_FRAME_TIME = 70;
const IDLE_FRAME_TIME = 160;
const PLAYER_SPEED = 150;
const startPosition = {
  x: 12 * TILE_SIZE,
  y: 7 * TILE_SIZE,
};
const movementKeys = new Set([
  "ArrowDown",
  "ArrowUp",
  "ArrowRight",
  "ArrowLeft",
  "s",
  "w",
  "d",
  "a",
]);

export {
  IDLE_FRAME_TIME,
  IDLE_FRAMES,
  movementKeys,
  PLAYER_SPEED,
  startPosition,
  WALK_FRAME_TIME,
  WALK_FRAMES,
};
