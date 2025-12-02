import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import AnimatedTitle from "./AnimatedTitle";

const genres = [
  {
    id: 1,
    name: "Cyberpunk RPG",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Space Exploration",
    img: "https://images.unsplash.com/photo-1582513166998-56ed1ea02d13?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Medieval Fantasy",
    img: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Tactical Shooters",
    img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
  },
];

const TrendingGenres = () => {
  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden">
      <Container>
        <AnimatedTitle text="Trending Genres" className="text-white" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${genre.img})` }}></div>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-500 drop-shadow-lg">
                  {genre.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrendingGenres;
