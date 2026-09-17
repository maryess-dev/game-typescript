import type { MutableRefObject } from "react";

export interface ICharacter {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  frameX: number;
  frameY: number;
  isMoving: boolean;
  isRotate: boolean;
}

export type CharacterRef = MutableRefObject<ICharacter>;

export type PressedKeysRef = MutableRefObject<Set<string>>;

export type CharacterAnimationTimers = {
  lastWalkFrameTime: number;
  lastIdleFrameTime: number;
};
