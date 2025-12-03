import React, { useEffect, useState } from "react";
import { GameContext } from "./GameContext";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase.config";
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";

const GameProvider = ({ children }) => {
  const { user } = useAuth();
  const [installedGames, setInstalledGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);

  const getAppId = () => {
    if (typeof __app_id !== "undefined" && __app_id) return __app_id;
    if (window.__app_id) return window.__app_id;
    if (import.meta.env.VITE_PROJECTID) return import.meta.env.VITE_PROJECTID;
    return "default-app-id";
  };

  useEffect(() => {
    const appId = getAppId();

    if (!user || !appId) {
      setInstalledGames([]);
      setLoadingGames(false);
      return;
    }
    // console.log("🔍 Current User UID:", user?.uid);

    setLoadingGames(true);

    const gamesRef = collection(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "data"
    );

    const unsubscribe = onSnapshot(
      gamesRef,
      (snapshot) => {
        const games = snapshot.docs.map((doc) => doc.data());
        const validGames = games.filter((g) => g.id && g.title);
        setInstalledGames(validGames);
        setLoadingGames(false);
      },
      (error) => {
        console.error("Subscription Error:", error);
        setLoadingGames(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const installGame = async (game) => {
    if (!user) {
      toast.error("You must be logged in to install games.");
      return;
    }
    // console.log("📌 Installing as UID:", user?.uid);

    const appId = getAppId();
    const gameIdStr = String(game.id);

    const gameToInstall = {
      id: gameIdStr,
      title: game.title,
      coverPhoto: game.coverPhoto,
      category: game.category || "Unknown",
      installedAt: new Date().toISOString(),
    };

    const gameDocRef = doc(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "data",
      gameIdStr
    );

    // console.log(`[GameHub] Installing to: ${gameDocRef.path}`);

    try {
      setInstalledGames((prevGames) => {
        if (prevGames.some((g) => g.id === gameIdStr)) return prevGames;
        return [...prevGames, gameToInstall];
      });

      // Write to DB
      await setDoc(gameDocRef, gameToInstall, { merge: true });

      toast.success(`${game.title} installed!`);
    } catch (e) {
      console.error("Install Error:", e);

      // Revert optimistic update on failure
      setInstalledGames((prevGames) =>
        prevGames.filter((g) => g.id !== gameIdStr)
      );

      if (e.code === "permission-denied") {
        // CHANGED: No longer logs out. Just informs the user.
        toast.error("Permission Error: Unable to save to database.");
      } else {
        toast.error(`Installation failed: ${e.message}`);
      }
    }
  };

  const uninstallGame = async (game) => {
    if (!user) return;
    const appId = getAppId();
    const gameIdStr = String(game.id);
    const gameDocRef = doc(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "data",
      gameIdStr
    );

    try {
      setInstalledGames((prevGames) =>
        prevGames.filter((g) => g.id !== gameIdStr)
      );

      await deleteDoc(gameDocRef);
      toast.info(`${game.title} uninstalled.`);
    } catch (e) {
      console.error("Uninstall Error:", e);
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
