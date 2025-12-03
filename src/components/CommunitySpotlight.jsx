import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { Link } from "react-router";

const CommunitySpotlight = () => {
  return (
    <section className="py-24 bg-linear-to-br from-green-50 to-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6">
            <h2 className="text-4xl font-extrabold text-green-800 leading-tight">
              Join the <span className="text-red-600">GameHub</span> Creator
              Community
            </h2>
            <div className="h-1 w-24 bg-green-600 rounded-full"></div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Are you an indie developer or a passionate gamer? Join our discord
              community to share your mods, discuss strategies, and get early
              access to beta releases. Connect with thousands of players
              worldwide.
            </p>
            <Link to="/register">
              <button className="btn btn-lg bg-green-700 hover:bg-green-800 text-white border-0 mt-4">
                Join Community
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop"
              alt="Community"
              className="rounded-lg shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CommunitySpotlight;
