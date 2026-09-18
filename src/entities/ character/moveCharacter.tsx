import { MAP_H, MAP_W, TILE_SIZE } from "../../games/GenerateMap";
import { isBlockedCell } from "../map/collision";
import type { ICharacter } from "./types";

type MovePlayerProps = {
  player: ICharacter;
  dx: number;
  dy: number;
  frameY: number;
};

type MoveByPressedKeyProps = {
  player: ICharacter;
  keys: Set<string>;
};

export const movePlayer = ({ player, dx, dy, frameY }: MovePlayerProps) => {
  if (player.isMoving) return;

  const nextTargetX = Math.min(
    Math.max(player.targetX + dx * TILE_SIZE, 0),
    (MAP_W - 1) * TILE_SIZE,
  );
  const nextTargetY = Math.min(
    Math.max(player.targetY + dy * TILE_SIZE, 0),
    (MAP_H - 1) * TILE_SIZE,
  );
  const nextCellX = nextTargetX / TILE_SIZE;
  const nextCellY = nextTargetY / TILE_SIZE;

  if (nextTargetX === player.targetX && nextTargetY === player.targetY) {
    return;
  }

  if (isBlockedCell(nextCellX, nextCellY)) {
    return;
  }

  player.targetX = nextTargetX;
  player.targetY = nextTargetY;
  player.frameY = frameY;
  player.isMoving = true;
};

export const moveByPressedKey = ({ player, keys }: MoveByPressedKeyProps) => {
  if (keys.has("ArrowDown") || keys.has("s")) {
    movePlayer({ player, dx: 0, dy: 1, frameY: 0 });
    return;
  }

  if (keys.has("ArrowUp") || keys.has("w")) {
    movePlayer({ player, dx: 0, dy: -1, frameY: 1 });
    return;
  }

  if (keys.has("ArrowRight") || keys.has("d")) {
    movePlayer({ player, dx: 1, dy: 0, frameY: 2 });
    return;
  }

  if (keys.has("ArrowLeft") || keys.has("a")) {
    movePlayer({ player, dx: -1, dy: 0, frameY: 2 });
  }
};
