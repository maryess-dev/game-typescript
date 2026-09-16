import { useEffect, useRef } from "react";
import { map, MAP_H, MAP_W } from "../games/GenerateMap";
import { images } from "../games/Images";
import { GameObject } from "./GameObject";

const objects = [
    { id: 1, type: "tree", x: 5, y: 5 },
    { id: 2, type: "tree", x: 8, y: 3 },
    { id: 3, type: "tree", x: 12, y: 7 },
    { id: 4, type: "grass", x: 15, y: 10 },
];

export const Map = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const drawMap = () => {
            for (let y = 0; y < MAP_H; y++) {
                for (let x = 0; x < MAP_W; x++) {
                    const tile = map[y][x];

                    if (tile === "main") {
                        ctx.drawImage(
                            images.main,
                            x * 32,
                            y * 32,
                            32,
                            32
                        );
                    }

                    if (tile === "grass") {
                        ctx.drawImage(
                            images.grass,
                            x * 32,
                            y * 32,
                            32,
                            32
                        );
                    }

                    if (tile === "tree") {
                        ctx.drawImage(
                            images.tree,
                            x * 32,
                            y * 32,
                            32,
                            32
                        );
                    }
                }
            }
        };

        if (images.main.complete) {
            drawMap();
        } else {
            images.main.onload = drawMap;
        }

        return () => {
            images.main.onload = null;
        };
    }, []);

    return (
        <div
            style={{
                position: "relative",
                width: MAP_W * 32,
                height: MAP_H * 32,
            }}
        >
            <canvas
                ref={canvasRef}
                width={MAP_W * 32}
                height={MAP_H * 32}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
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
