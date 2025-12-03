import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const GameCard = ({ game }) => {
  const { id, title, coverPhoto, category, ratings } = game;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 group h-full flex flex-col">
      <figure className="relative h-64 overflow-hidden">
        <img
          src={coverPhoto}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Link
            to={`/game/${id}`}
            className="btn btn-sm bg-green-600 border-0 text-white w-full hover:bg-green-700">
            View Details
          </Link>
        </div>
      </figure>

      <div className="card-body p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="badge badge-sm bg-green-50 text-green-700 border-green-200 font-semibold p-3">
            {category}
          </div>
          <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
            <FaStar /> {ratings}
          </div>
        </div>

        <h2 className="card-title text-lg font-bold text-gray-800 leading-tight mb-auto group-hover:text-green-700 transition-colors">
          {title}
        </h2>

        <div className="card-actions mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/game/${id}`}
            className="btn btn-outline btn-sm w-full border-gray-300 hover:border-green-600 hover:bg-green-600 hover:text-white text-gray-600">
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
