import { useRef } from "react";
import { RenderCanvas } from "./RenderCanvas";
import { images } from "../games/Images";

type Props = {
    val: keyof typeof images;
    x: number;
    y: number;
};

export const GameObject = ({ val, x, y }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <RenderCanvas
            ctxRef={canvasRef}
            val={val}
            x={x}
            y={y}
        />
    );
};
