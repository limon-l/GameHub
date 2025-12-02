import React from "react";
import { motion } from "framer-motion";
import { FaGamepad, FaCloudDownloadAlt, FaShieldAlt } from "react-icons/fa";
import Container from "./Container";
import AnimatedTitle from "./AnimatedTitle";

const features = [
  {
    icon: <FaGamepad className="text-5xl text-white" />,
    title: "Extensive Library",
    desc: "Access thousands of indie and AAA titles from a single hub.",
    bg: "bg-blue-600",
  },
  {
    icon: <FaCloudDownloadAlt className="text-5xl text-white" />,
    title: "Fast Installation",
    desc: "Optimized servers ensure your games are ready to play in minutes.",
    bg: "bg-green-600",
  },
  {
    icon: <FaShieldAlt className="text-5xl text-white" />,
    title: "Secure Gaming",
    desc: "Every game is verified for safety. Play without worries.",
    bg: "bg-red-600",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <AnimatedTitle text="Why Choose GameHub?" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow bg-gray-50 text-center group">
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
