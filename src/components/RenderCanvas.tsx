import { useEffect, type RefObject } from "react";
import { images } from "../games/Images";
import { FRAME_SIZE, MAP_H, MAP_W, TILE_SIZE } from "../games/GenerateMap";

type Props = {
    ctxRef: RefObject<HTMLCanvasElement | null>;
    val: keyof typeof images;
    x: number;
    y: number;
};

export const RenderCanvas = ({
    ctxRef,
    val,
    x,
    y,
}: Props) => {
  useEffect(() => {
        const canvas = ctxRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const image = images[val];

        const draw = () => {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            const frameX = 0;
            const frameY = 0;

            ctx.drawImage(
                image,

                // откуда брать кадр
                frameX * FRAME_SIZE,
                frameY * FRAME_SIZE,
                FRAME_SIZE,
                FRAME_SIZE,

                // куда рисовать
                x * TILE_SIZE,
                y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        };

        if (image.complete) {
            draw();
        } else {
            image.onload = draw;
        }

        return () => {
            image.onload = null;
        };
    }, [val, x, y, ctxRef]);


    return (
        <canvas
            ref={ctxRef}
            width={MAP_W * 32}
            height={MAP_H * 32}
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                pointerEvents: "none",
            }}
        />
    );
};
