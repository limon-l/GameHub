import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import Newsletter from "../components/Newsletter";
import { Helmet } from "react-helmet-async";
import MyLink from "../components/MyLink";
import { motion } from "framer-motion";

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedGames = data
          .sort((a, b) => b.ratings - a.ratings)
          .slice(0, 6);
        setPopularGames(sortedGames);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <Helmet>
        <title>GameHub | Home</title>
      </Helmet>

      <Banner />

      <section className="py-16 bg-gray-100">
        <Container>
          <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
            Popular Games
          </h2>
          {loading ? (
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-green-700"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
          <MyLink className={"flex justify-center mt-8"} to={"/top-games"}>
            <button className="btn bg-green-700 text-lg font-bold hover:bg-white hover:text-green-700 hover:border-2 hover:border-green-700">
              Top Games
            </button>
          </MyLink>
        </Container>
      </section>

      <Newsletter />
    </motion.div>
  );
};

export default HomePage;
