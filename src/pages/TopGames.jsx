import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";
import Container from "../components/Container";
import GameCard from "../components/GameCard";

const TopGames = () => {
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  useEffect(() => {
    setLoading(true);
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => parseFloat(b.ratings) - parseFloat(a.ratings)
        );
        setAllGames(sortedData);
        setFilteredGames(sortedData);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        setFilteredGames(allGames);
      } else {
        const filtered = allGames.filter((game) =>
          String(game.title || "")
            .toLowerCase()
            .includes(q)
        );
        setFilteredGames(filtered);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, allGames]);

  return (
    <Container className="px-6 md:px-20 mb-20">
      <Helmet>
        <title>GameHub | Top Games</title>
      </Helmet>
      <h1 className="text-5xl font-bold text-center mb-4 mt-20 text-green-700">
        Top Games
      </h1>
      <p className="text-center text-lg text-gray-600">
        Explore top games on GameHub, sorted by their rating.
      </p>

      <div className="my-4 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <p className="font-bold text-lg text-gray-800">
          ({filteredGames.length}) Games Found
        </p>

        <label className="input bg-gray-100 flex items-center gap-2 px-3 py-2 rounded-md w-full md:w-auto border-2 border-transparent focus-within:border-green-600">
          <svg
            className="h-5 w-5 opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games by name…"
            className="bg-transparent outline-none flex-1"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-sm text-slate-600 hover:text-slate-800">
              Clear
            </button>
          )}
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <span className="loading loading-spinner loading-lg text-green-700"></span>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <p className="text-slate-500 text-lg col-span-full text-center">
              No games found{query ? ` for “${query}”` : ""}.
            </p>
          )}
        </div>
      )}
    </Container>
  );
};

export default TopGames;
