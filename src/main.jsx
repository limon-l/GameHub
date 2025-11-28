import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import GameProvider from "./context/GameProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <GameProvider>
        {" "}
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </GameProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
