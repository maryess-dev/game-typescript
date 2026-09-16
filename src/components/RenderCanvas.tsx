import { useEffect, type RefObject } from "react";
import { images } from "../games/Images";
import { MAP_H, MAP_W } from "../games/GenerateMap";

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

            ctx.drawImage(
                image,
                x * 32,
                y * 32,
                32,
                32
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
