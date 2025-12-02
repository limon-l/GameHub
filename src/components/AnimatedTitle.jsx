import React from "react";
import { motion } from "framer-motion";

const AnimatedTitle = ({ text, className = "" }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className={`flex flex-col items-center mb-12 ${className}`}>
      <motion.h2
        className="text-4xl font-extrabold text-green-700 flex overflow-hidden"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h2>
      <motion.div
        className="h-1 bg-green-700 mt-2 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </div>
  );
};

export default AnimatedTitle;
