import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import AnimatedTitle from "../components/AnimatedTitle";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const TopGames = () => {
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");

  useEffect(() => {
    setLoading(true);
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data);

        const uniqueCategories = [
          "All",
          ...new Set(data.map((game) => game.category)),
        ];
        setCategories(uniqueCategories);

        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (selectedCategory !== "All") params.category = selectedCategory;
    setSearchParams(params);
  }, [query, selectedCategory, setSearchParams]);

  useEffect(() => {
    let result = [...allGames];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter((game) => game.title.toLowerCase().includes(q));
    }

    if (selectedCategory !== "All") {
      result = result.filter((game) => game.category === selectedCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return parseFloat(b.ratings) - parseFloat(a.ratings);
        case "rating-asc":
          return parseFloat(a.ratings) - parseFloat(b.ratings);
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredGames(result);
  }, [query, selectedCategory, sortBy, allGames]);

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

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10 flex flex-col xl:flex-row justify-between items-center gap-6 sticky top-24 z-30 transition-all">
          <div className="flex items-center gap-3 w-full xl:w-auto justify-center xl:justify-start">
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm shadow-sm border border-green-100">
              {filteredGames.length} Games Found
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <div className="relative w-full md:w-80 group">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 rounded-xl transition-all outline-none shadow-inner group-hover:shadow-md"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>

            <div className="relative w-full md:w-48 group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 rounded-xl transition-all outline-none appearance-none cursor-pointer hover:shadow-md">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-48 group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 rounded-xl transition-all outline-none appearance-none cursor-pointer hover:shadow-md">
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
              <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
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
            <AnimatePresence mode="popLayout">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center">
                  <div className="text-6xl mb-6 bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <FaSearch />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No games found
                  </h3>
                  <p className="text-gray-500">
                    We couldn't find any matches for "{query}". <br /> Try
                    checking your spelling or adjusting filters.
                  </p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-6 btn btn-outline border-gray-300 text-gray-600 hover:bg-green-600 hover:border-green-600 hover:text-white">
                    Clear All Filters
                  </button>
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
