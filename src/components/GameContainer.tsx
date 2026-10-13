
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
        width: "100%",
        maxWidth: 960,
        aspectRatio: "16 / 9",
        margin: "0 auto",
        overflow: "hidden",
      }}
    />
  );
}
