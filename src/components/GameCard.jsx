import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const GameCard = ({ game }) => {
  const { id, title, coverPhoto, category, ratings } = game;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card bg-white shadow-xl overflow-hidden rounded-xl">
      <figure>
        <img
          src={coverPhoto}
          alt={title}
          className="h-80 w-full object-cover p-3 rounded-3xl"
        />
      </figure>
      <div className="card-body p-3 pt-0">
        <div className="flex flex-col gap-2 justify-between items-start mb-2">
          <h2 className="card-title text-xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="badge badge-outline text-green-700 font-semibold">
            {category}
          </div>
        </div>
        <div className="card-actions flex justify-between items-center">
          <p className="text-lg font-bold text-yellow-500 mb-4">
            Rating: {ratings}
          </p>
          <Link
            to={`/game/${id}`}
            className="btn border-0 bg-green-700 hover:bg-green-800 text-white">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
