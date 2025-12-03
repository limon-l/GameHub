import React from "react";
import Container from "../components/Container";
import AnimatedTitle from "../components/AnimatedTitle";
import { Helmet } from "react-helmet-async";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

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
  {
    id: 4,
    user: "Emily Chen",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
    game: "Hades",
    rating: 5,
    comment:
      "Incredible art style and addictive gameplay loop. I can't stop playing just one more run!",
  },
  {
    id: 5,
    user: "David Kim",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    game: "God of War",
    rating: 5,
    comment:
      "A cinematic masterpiece. The combat feels weighty and satisfying, and the story is surprisingly emotional.",
  },
];

const Reviews = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen overflow-hidden">
      <Helmet>
        <title>GameHub | Reviews</title>
      </Helmet>
      <Container>
        <AnimatedTitle text="Player Reviews" />

        <div className="mt-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-linear-to-r from-purple-200/30 to-pink-200/30 blur-3xl rounded-full -z-10"></div>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="mySwiper py-12! px-4!">
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id} className="w-80! sm:w-96!">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative h-full flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
                  <FaQuoteLeft className="text-4xl text-green-100 absolute top-6 right-6" />
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-14 h-14 rounded-full border-2 border-green-500 p-0.5"
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
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
