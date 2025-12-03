import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import TopGames from "../pages/TopGames";
import Profile from "../pages/Profile";
import InstalledGames from "../pages/InstalledGames";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import GameDetails from "../pages/GameDetails";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "../pages/ForgetPassword";
import Reviews from "../pages/Reviews";
import Community from "../pages/Community";
import Support from "../pages/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/top-games",
        element: <TopGames />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/game/:id",
        element: <GameDetails />,
      },
      {
        path: "/installed-games",
        element: <InstalledGames />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
