import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "../components/Container";
import { useGames } from "../context/GameContext";
import { motion } from "framer-motion";

const InstalledGames = () => {
  const { installedGames, uninstallGame, loadingGames } = useGames();

  if (loadingGames) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  return (
    <Container className="py-12 px-4">
      <Helmet>
        <title>GameHub | Installed Games</title>
      </Helmet>
      <h1 className="text-4xl font-extrabold text-center text-green-700 mb-12">
        Your Installed Games
      </h1>

      {installedGames.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          You haven't installed any games yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {installedGames.map((game) => (
            <motion.div
              key={game.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card bg-white shadow-xl overflow-hidden">
              <figure>
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-bold text-gray-900">
                  {game.title}
                </h2>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => uninstallGame(game)}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
                    Uninstall
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default InstalledGames;
