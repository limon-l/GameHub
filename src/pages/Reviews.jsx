import React from "react";
import Container from "../components/Container";
import AnimatedTitle from "../components/AnimatedTitle";
import { Helmet } from "react-helmet-async";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const reviewsData = [
  {
    id: 1,
    user: "Alex Walker",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    game: "Cyberpunk 2077",
    rating: 5,
    comment:
      "Absolutely breathtaking visuals and a story that grips you from the start. Night City feels alive.",
  },
  {
    id: 2,
    user: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    game: "Elden Ring",
    rating: 5,
    comment:
      "The open world design is a masterpiece. It's difficult, unforgiving, and completely rewarding.",
  },
  {
    id: 3,
    user: "Mike Ross",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    game: "Stardew Valley",
    rating: 4,
    comment:
      "The perfect game to relax to. I've spent hundreds of hours just farming and fishing.",
  },
];

const Reviews = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <Helmet>
        <title>GameHub | Reviews</title>
      </Helmet>
      <Container>
        <AnimatedTitle text="Player Reviews" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {reviewsData.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative hover:-translate-y-2 transition-transform duration-300">
              <FaQuoteLeft className="text-4xl text-green-100 absolute top-6 right-6" />
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-14 h-14 rounded-full border-2 border-green-500"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    {review.user}
                  </h4>
                  <p className="text-sm text-green-600 font-medium">
                    {review.game}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="text-gray-600 italic leading-relaxed">
                "{review.comment}"
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
