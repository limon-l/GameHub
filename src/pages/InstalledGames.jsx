import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "../components/Container";
import { useGames } from "../context/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTitle from "../components/AnimatedTitle";
import { Link } from "react-router";
import { FaTrashAlt, FaGamepad, FaPlay } from "react-icons/fa";

const InstalledGames = () => {
  const { installedGames, uninstallGame, loadingGames } = useGames();

  if (loadingGames) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <Container className="px-4 md:px-8">
        <Helmet>
          <title>GameHub | My Library</title>
        </Helmet>

        <AnimatedTitle text="My Collection" />

        <AnimatePresence mode="popLayout">
          {installedGames.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-green-100 p-6 rounded-full mb-6 text-green-600 animate-pulse">
                <FaGamepad className="text-6xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Your library is empty
              </h3>
              <p className="text-gray-500 max-w-md mb-8">
                Looks like you haven't installed any games yet. Explore our
                collection and start building your gaming empire today.
              </p>
              <Link
                to="/top-games"
                className="btn btn-lg bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg hover:shadow-green-200 transition-all rounded-full px-8">
                Browse Games
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {installedGames.map((game) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  whileHover={{ y: -5 }}
                  className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group rounded-2xl">
                  <figure className="relative h-48 overflow-hidden">
                    <img
                      src={game.coverPhoto}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <button className="btn btn-circle btn-lg bg-green-600 border-0 text-white hover:bg-green-500 hover:scale-110 transition-all shadow-lg">
                        <FaPlay className="pl-1" />
                      </button>
                    </div>
                  </figure>

                  <div className="card-body p-5">
                    <div className="flex justify-between items-start mb-1">
                      <h2
                        className="card-title text-lg font-bold text-gray-800 line-clamp-1"
                        title={game.title}>
                        {game.title}
                      </h2>
                    </div>

                    <div className="text-xs text-gray-500 mb-4 bg-gray-100 py-1 px-2 rounded-lg w-fit font-medium">
                      Installed:{" "}
                      {game.installedAt
                        ? new Date(game.installedAt).toLocaleDateString()
                        : "Recently"}
                    </div>

                    <div className="card-actions justify-between mt-auto pt-4 border-t border-gray-100 items-center">
                      <Link
                        to={`/game/${game.id}`}
                        className="text-sm font-semibold text-gray-500 hover:text-green-700 transition-colors">
                        View Details
                      </Link>
                      <button
                        onClick={() => uninstallGame(game)}
                        className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-0 transition-all flex items-center gap-2 rounded-lg">
                        <FaTrashAlt /> Uninstall
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default InstalledGames;
