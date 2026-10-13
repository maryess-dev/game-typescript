import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Router } from "./app/router/Router";
import '../game/Game'
import "./index.css";
import App from "./app/App";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <GamePage/> */}
    <App/>
  </StrictMode>,
);
