import { useEffect, useRef } from "react";
import { createCharacterDraw, updatePlayer } from "../entities/ character";
import { movementKeys, startPosition } from "../entities/ character/constants";
import type {
  CharacterAnimationTimers,
  ICharacter,
} from "../entities/ character/types";
import {
  drawMapObjects,
  drawMapTiles,
  drawMapTopObjects,
  getMapOffset,
} from "../entities/map";
import { images } from "../games/Images";

export const Map = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pressedKeysRef = useRef(new Set<string>());
  const playerRef = useRef<ICharacter>({
    x: startPosition.x,
    y: startPosition.y,
    targetX: startPosition.x,
    targetY: startPosition.y,
    frameX: 0,
    frameY: 0,
    isMoving: false,
    isRotate: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let lastTime = 0;
    let isRunning = true;
    const animationTimers: CharacterAnimationTimers = {
      lastWalkFrameTime: 0,
      lastIdleFrameTime: 0,
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!movementKeys.has(event.key)) return;

      event.preventDefault();
      pressedKeysRef.current.add(event.key);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (!movementKeys.has(event.key)) return;

      event.preventDefault();
      pressedKeysRef.current.delete(event.key);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

      const offset = getMapOffset(canvas);

      drawMapTiles(ctx, offset);
      drawMapObjects(ctx, offset);

      createCharacterDraw({
        ctx,
        drawX: offset.x + playerRef.current.x,
        drawY: offset.y + playerRef.current.y,
        image: playerRef.current.isMoving
          ? images.character
          : images.idleCharacter,
        frameX: playerRef.current.frameX,
        frameY: playerRef.current.frameY,
        isRotate: playerRef.current.isRotate,
      });

      drawMapTopObjects(ctx, offset);
    };

    const gameLoop = (time: number) => {
      updatePlayer({
        player: playerRef.current,
        pressedKeys: pressedKeysRef.current,
        time,
        lastTime,
        timers: animationTimers,
      });
      draw();
      lastTime = time;

      animationId = requestAnimationFrame(gameLoop);
    };

    const imagesToLoad = Object.values(images);

    Promise.all(
      imagesToLoad.map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            }),
      ),
    ).then(() => {
      if (!isRunning) return;

      resizeCanvas();
      animationId = requestAnimationFrame(gameLoop);
    });

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};
