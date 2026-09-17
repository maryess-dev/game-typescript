import { useEffect, useRef } from "react";
import {
    map,
    MAP_H,
    MAP_W,
    TILE_SIZE,
} from "../games/GenerateMap";
import { images } from "../games/Images";
import { GameObject } from "./GameObject";

const objects = [
    { id: 1, type: "tree", x: 5, y: 5 },
    { id: 2, type: "tree", x: 8, y: 3 },
    { id: 3, type: "character", x: 12, y: 7 },
    { id: 4, type: "grass", x: 15, y: 10 },
];

export const Map = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            drawMap();
        };

        const drawMap = () => {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            for (let y = 0; y < MAP_H; y++) {
                for (let x = 0; x < MAP_W; x++) {
                    const tile = map[y][x];

                    const image = images[tile];

                    if (!image) continue;

                    ctx.drawImage(
                        image,
                        x * TILE_SIZE,
                        y * TILE_SIZE,
                        TILE_SIZE,
                        TILE_SIZE
                    );
                }
            }
        };

        const imagesToLoad = Object.values(images);

        let loaded = 0;

        const handleLoad = () => {
            loaded++;

            if (loaded === imagesToLoad.length) {
                resizeCanvas();
            }
        };

        imagesToLoad.forEach((image) => {
            if (image.complete) {
                loaded++;
            } else {
                image.onload = handleLoad;
            }
        });

        if (loaded === imagesToLoad.length) {
            resizeCanvas();
        }

        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener(
                "resize",
                resizeCanvas
            );

            imagesToLoad.forEach((image) => {
                image.onload = null;
            });
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

            {objects.map((object) => (
                <GameObject
                    key={object.id}
                    val={object.type as keyof typeof images}
                    x={object.x}
                    y={object.y}
                />
            ))}
        </div>
    );
};
