import { useEffect, useRef } from "react";
import { createCharacterDraw } from "../entities/ character";
import {
  gameObjects,
  map,
  MAP_H,
  MAP_W,
  TILE_SIZE,
} from "../games/GenerateMap";
import { images } from "../games/Images";

const mapWidth = MAP_W * TILE_SIZE;
const mapHeight = MAP_H * TILE_SIZE;
const WALK_FRAMES = 6;
const WALK_FRAME_TIME = 70;
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

const getMapOffset = (canvas: HTMLCanvasElement) => ({
  x: Math.max((canvas.width - mapWidth) / 2, 0),
  y: Math.max((canvas.height - mapHeight) / 2, 0),
});

export const Map = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pressedKeysRef = useRef(new Set<string>());
  const playerRef = useRef({
    x: startPosition.x,
    y: startPosition.y,
    targetX: startPosition.x,
    targetY: startPosition.y,
    frameX: 0,
    frameY: 0,
    isMoving: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let lastTime = 0;
    let lastWalkFrameTime = 0;
    let isRunning = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const movePlayer = (dx: number, dy: number, frameY: number) => {
      const player = playerRef.current;
      if (player.isMoving) return;

      const nextTargetX = Math.min(
        Math.max(player.targetX + dx * TILE_SIZE, 0),
        (MAP_W - 1) * TILE_SIZE,
      );
      const nextTargetY = Math.min(
        Math.max(player.targetY + dy * TILE_SIZE, 0),
        (MAP_H - 1) * TILE_SIZE,
      );

      if (nextTargetX === player.targetX && nextTargetY === player.targetY) {
        return;
      }

      player.targetX = nextTargetX;
      player.targetY = nextTargetY;
      player.frameY = frameY;
      player.isMoving = true;
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

    const moveByPressedKey = () => {
      const keys = pressedKeysRef.current;

      if (keys.has("ArrowDown") || keys.has("s")) {
        movePlayer(0, 1, 0);
        return;
      }

      if (keys.has("ArrowUp") || keys.has("w")) {
        movePlayer(0, -1, 1);
        return;
      }

      if (keys.has("ArrowRight") || keys.has("d")) {
        movePlayer(1, 0, 2);
        return;
      }

      if (keys.has("ArrowLeft") || keys.has("a")) {
        movePlayer(-1, 0, 2);
      }
    };

    const updatePlayer = (time: number) => {
      const player = playerRef.current;
      const deltaTime = lastTime === 0 ? 0 : (time - lastTime) / 1000;
      const step = PLAYER_SPEED * deltaTime;

      if (player.x < player.targetX) {
        player.x = Math.min(player.x + step, player.targetX);
      }

      if (player.x > player.targetX) {
        player.x = Math.max(player.x - step, player.targetX);
      }

      if (player.y < player.targetY) {
        player.y = Math.min(player.y + step, player.targetY);
      }

      if (player.y > player.targetY) {
        player.y = Math.max(player.y - step, player.targetY);
      }

      player.isMoving =
        player.x !== player.targetX || player.y !== player.targetY;

      if (!player.isMoving) {
        moveByPressedKey();
      }

      if (player.isMoving && time - lastWalkFrameTime > WALK_FRAME_TIME) {
        player.frameX = (player.frameX + 1) % WALK_FRAMES;
        lastWalkFrameTime = time;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

      const offset = getMapOffset(canvas);

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

      gameObjects.forEach((object) => {
        if (object.type === "character") return;

        const image = images[object.type];
        const drawX = offset.x + object.x * TILE_SIZE;
        const drawY = offset.y + object.y * TILE_SIZE;

        ctx.drawImage(image, drawX, drawY, TILE_SIZE, TILE_SIZE);
      });

      createCharacterDraw({
        ctx,
        drawX: offset.x + playerRef.current.x,
        drawY: offset.y + playerRef.current.y,
        image: images.character,
        frameX: playerRef.current.frameX,
        frameY: playerRef.current.frameY,
      });
    };

    const gameLoop = (time: number) => {
      updatePlayer(time);
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
