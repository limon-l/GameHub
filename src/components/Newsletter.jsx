import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Welcome to the inner circle! 🎮");
    e.target.reset();
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-600 blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-900 blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-500 blur-[100px]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-16 shadow-2xl text-center">
          <div className="inline-block p-4 rounded-full bg-green-500/20 mb-6 text-green-400">
            <FaEnvelopeOpenText className="text-4xl" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Level Up Your Inbox
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't miss a beat. Get the latest game drops, exclusive developer
            interviews, and hidden gem alerts delivered straight to you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto">
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold tracking-wide hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              <span>Subscribe</span>
              <FaPaperPlane className="text-sm" />
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-6">
            We respect your privacy. No spam, just games. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
