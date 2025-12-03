import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import AnimatedTitle from "../components/AnimatedTitle";
import { motion, AnimatePresence } from "framer-motion";

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
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, allGames]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <Container className="px-4 md:px-8">
        <Helmet>
          <title>GameHub | Top Games</title>
        </Helmet>

        <AnimatedTitle text="Top Rated Games" />

        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Discover the highest-rated masterpieces curated by our community. From
          open-world adventures to intense competitive shooters.
        </p>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-30">
          <p className="font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
            {filteredGames.length}{" "}
            <span className="font-normal text-gray-500">Titles Found</span>
          </p>

          <div className="relative w-full md:w-96">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white border-2 focus:border-green-500 rounded-xl transition-all outline-none"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <span className="loading loading-spinner loading-lg text-green-700"></span>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-700">
                    No games found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default TopGames;
