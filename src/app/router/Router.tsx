import { Route, Routes } from "react-router";
import App from "../App";
// import { MainPage } from "../../pages/Main";
// import { GameContainer } from "../../pages/Game";

const currentRoutes = [
  {
    path: "/",
    element: <App />,
  },

];

export const Router = () => {
  return (
    <Routes>
      {/* {currentRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))} */}
    </Routes>
  );
};
