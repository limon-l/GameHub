import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    e.target.reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 bg-green-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Join Our Newsletter</h2>
        <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
          Stay up-to-date with the latest game releases, indie highlights, and
          exclusive offers.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-lg w-full bg-amber-50 text-black"
            required
          />
          <button className="btn btn-lg bg-red-700 hover:bg-red-800 border-0 text-white">
            Subscribe
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;
