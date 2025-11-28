import { createContext, useContext } from "react";

export const GameContext = createContext(null);

export const useGames = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGames must be used within a GameProvider");
  }
  return context;
};
