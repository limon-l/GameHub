import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      img: "https://wallpapers.com/images/high/cyberpunk-night-city-txj92x7p9ojgvsgw.webp",
      title: "Explore Night City",
      desc: "Discover the vast open world of Cyberpunk 2077. A new era of RPGs.",
      link: "/game/1",
    },
    {
      img: "https://i.redd.it/v3pkr2o2caf91.jpg",
      title: "Become the Elden Lord",
      desc: "Embark on a quest in the Lands Between in the acclaimed Elden Ring.",
      link: "/game/3",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1kWjXb3kdTL-f3G8pbBgl2YbYp-c0nt9stg&s",
      title: "Your Journey Awaits",
      desc: "Gather your party in Baldur's Gate 3, the definitive RPG experience.",
      link: "/game/6",
    },
  ];

  return (
    <div className="h-[70vh] w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}>
              <div className="w-full h-full flex flex-col justify-center items-center text-green-300 bg-black/60 p-4">
                <h2 className="text-5xl font-extrabold mb-4 text-center">
                  {slide.title}
                </h2>
                <p className="text-xl text-center max-w-2xl mb-6">
                  {slide.desc}
                </p>
                <a
                  href={slide.link}
                  className="btn bg-green-700 border-0 text-white text-lg hover:bg-green-800">
                  Learn More
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
