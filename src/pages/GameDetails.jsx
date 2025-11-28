import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { useGames } from "../context/GameContext";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loading: authLoading } = useAuth();

  const { installedGames, installGame, loadingGames } = useGames();

  const isInstalled = useMemo(() => {
    return installedGames.some((g) => g.id === id);
  }, [installedGames, id]);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const foundGame = data.find((g) => g.id === id);
        setGame(foundGame);
        setLoading(false);
      });
  }, [id]);

  if (loading || authLoading || loadingGames) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  if (!game) {
    return (
      <Container className="py-10 text-center">
        <h2 className="text-3xl font-bold text-red-600">Game not found!</h2>
      </Container>
    );
  }

  const { title, coverPhoto, category, description, ratings, developer } = game;

  return (
    <Container className="py-12 px-4">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={coverPhoto}
          alt={title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-green-700 mb-2">
            {title}
          </h1>
          <div className="flex justify-between items-center mb-4 text-gray-600">
            <span className="text-xl font-semibold">By {developer}</span>
            <span className="badge badge-lg badge-outline text-green-700 font-bold">
              {category}
            </span>
          </div>
          <p className="text-lg text-gray-800 mb-6">{description}</p>

          <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-bold text-yellow-500">
              Rating: {ratings} / 5.0
            </div>

            <button
              onClick={() => installGame(game)}
              disabled={isInstalled}
              className="btn bg-green-700 hover:bg-green-800 text-white text-lg px-8 disabled:bg-gray-400">
              {isInstalled ? "Installed" : "Install"}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GameDetails;
