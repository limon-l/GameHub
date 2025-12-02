import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slideContent = [
  {
    img: "https://wallpapers.com/images/high/cyberpunk-night-city-txj92x7p9ojgvsgw.webp",
    title: "Explore Night City",
    desc: "Step into the neon-soaked streets of Cyberpunk 2077. A vertical metropolis where power, glamour, and body modification are everything.",
    link: "/game/1",
  },
  {
    img: "https://i.redd.it/v3pkr2o2caf91.jpg",
    title: "Rise, Tarnished",
    desc: "Traverse the breathtaking and dangerous Lands Between. Uncover the mysteries of the Elden Ring and become the Elden Lord.",
    link: "/game/3",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1kWjXb3kdTL-f3G8pbBgl2YbYp-c0nt9stg&s",
    title: "Gather Your Party",
    desc: "Experience the ultimate Dungeons & Dragons adventure in Baldur's Gate 3. Choices matter in a tale of fellowship and betrayal.",
    link: "/game/6",
  },
];

const Banner = () => {
  return (
    <div className="h-[70vh] w-full relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        speed={1000}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-green-500! w-3! h-3!"></span>`;
          },
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full">
        {slideContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-linear scale-100 animate-slow-zoom"
                style={{
                  backgroundImage: `url(${slide.img})`,
                  animation: "zoomEffect 20s infinite alternate",
                }}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-90"></div>

              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="max-w-4xl w-full text-center text-white space-y-6 p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-green-300 to-emerald-500 drop-shadow-sm">
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
                    {slide.desc}
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}>
                    <a
                      href={slide.link}
                      className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-green-600 rounded-full group hover:bg-green-700 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-black"></span>
                      <span className="relative">Start Adventure</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        @keyframes zoomEffect {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .swiper-button-next, .swiper-button-prev {
          color: #22c55e !important; 
          transition: all 0.3s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          color: #fff !important;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default Banner;
