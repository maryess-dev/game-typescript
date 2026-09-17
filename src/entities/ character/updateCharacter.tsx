import {
  IDLE_FRAME_TIME,
  IDLE_FRAMES,
  PLAYER_SPEED,
  WALK_FRAME_TIME,
  WALK_FRAMES,
} from "./constants";
import { moveByPressedKey } from "./moveCharacter";
import type { CharacterAnimationTimers, ICharacter } from "./types";

type Props = {
  player: ICharacter;
  pressedKeys: Set<string>;
  time: number;
  lastTime: number;
  timers: CharacterAnimationTimers;
};

export const updatePlayer = ({
  player,
  pressedKeys,
  time,
  lastTime,
  timers,
}: Props) => {
  const deltaTime = lastTime === 0 ? 0 : (time - lastTime) / 1000;
  const step = PLAYER_SPEED * deltaTime;

  if (player.x < player.targetX) {
    player.x = Math.min(player.x + step, player.targetX);
    player.isRotate = false;
  }

  if (player.x > player.targetX) {
    player.x = Math.max(player.x - step, player.targetX);
    player.isRotate = true;
  }

  if (player.y < player.targetY) {
    player.y = Math.min(player.y + step, player.targetY);
  }

  if (player.y > player.targetY) {
    player.y = Math.max(player.y - step, player.targetY);
  }

  player.isMoving = player.x !== player.targetX || player.y !== player.targetY;

  if (!player.isMoving) {
    moveByPressedKey({ player, keys: pressedKeys });
  }

  if (player.isMoving && time - timers.lastWalkFrameTime > WALK_FRAME_TIME) {
    player.frameX = (player.frameX + 1) % WALK_FRAMES;
    timers.lastWalkFrameTime = time;
  }

  if (!player.isMoving && time - timers.lastIdleFrameTime > IDLE_FRAME_TIME) {
    player.frameX = (player.frameX + 1) % IDLE_FRAMES;
    timers.lastIdleFrameTime = time;
  }
};
