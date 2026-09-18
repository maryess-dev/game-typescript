import { Route, Routes } from "react-router";
import { GamePage } from "../../pages/Game";
import { MainPage } from "../../pages/Main";

const currentRoutes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
];

export const Router = () => {
  return (
    <Routes>
      {currentRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
