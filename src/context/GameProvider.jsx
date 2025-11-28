import React, { useEffect, useState } from "react";
import { GameContext } from "./GameContext";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase.config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";

const GameProvider = ({ children }) => {
  const { user } = useAuth();
  const [installedGames, setInstalledGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);

  useEffect(() => {
    if (user) {
      setLoadingGames(true);
      const userGamesRef = doc(db, "userGames", user.uid);

      getDoc(userGamesRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setInstalledGames(docSnap.data().installed || []);
          } else {
            setDoc(userGamesRef, { installed: [] });
            setInstalledGames([]);
          }
          setLoadingGames(false);
        })
        .catch((e) => {
          console.error(e);
          toast.error("Failed to load installed games.");
          setLoadingGames(false);
        });
    } else {
      setInstalledGames([]);
      setLoadingGames(false);
    }
  }, [user]);

  const installGame = async (game) => {
    if (!user) {
      toast.error("You must be logged in to install games.");
      return;
    }

    const gameToInstall = {
      id: game.id,
      title: game.title,
      coverPhoto: game.coverPhoto,
    };

    const userGamesRef = doc(db, "userGames", user.uid);
    try {
      await updateDoc(userGamesRef, {
        installed: arrayUnion(gameToInstall),
      });
      setInstalledGames((prevGames) => [...prevGames, gameToInstall]);
      toast.success(`${game.title} installed!`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to install game.");
    }
  };

  const uninstallGame = async (game) => {
    if (!user) {
      toast.error("You must be logged in.");
      return;
    }

    const userGamesRef = doc(db, "userGames", user.uid);
    try {
      await updateDoc(userGamesRef, {
        installed: arrayRemove(game),
      });
      setInstalledGames((prevGames) =>
        prevGames.filter((g) => g.id !== game.id)
      );
      toast.warn(`${game.title} uninstalled.`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to uninstall game.");
    }
  };

  const gameInfo = {
    installedGames,
    loadingGames,
    installGame,
    uninstallGame,
  };

  return (
    <GameContext.Provider value={gameInfo}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
