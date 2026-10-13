import { GameContainer } from "../components/GameContainer";


export default function App() {
  return (
    <main
      style={{
        minHeight: "100svh",
        background: "#090b10",
        boxSizing: "border-box",
        display: "grid",
        placeItems: "center",
        padding: "16px",
      }}
    >
      <GameContainer />
    </main>
  );
}
