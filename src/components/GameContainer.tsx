import { useEffect, useRef } from "react";
import { createGame } from "../../game/main";

export function GameContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const game = createGame(container);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        // Учитываем и ширину, и высоту окна, сохраняя область 16:9 целиком видимой.
        width: "min(100%, 1960px, calc((100svh - 32px) * 16 / 9))",
        aspectRatio: "16 / 9",
        margin: "0 auto",
        overflow: "hidden",
      }}
    />
  );
}
