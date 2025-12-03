import React from "react";
import Container from "../components/Container";
import AnimatedTitle from "../components/AnimatedTitle";
import { Helmet } from "react-helmet-async";
import { FaDiscord, FaReddit, FaHeart, FaComment } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const communityPosts = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?u=1",
    name: "EldenLord_99",
    time: "2 hours ago",
    content:
      "Has anyone beaten the final boss in Elden Ring yet? I'm stuck on phase 2!",
    likes: 245,
    comments: 42,
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?u=2",
    name: "PixelWarrior",
    time: "5 hours ago",
    content:
      "Just did it last night! Use the Mimic Tear and focus on dodging the AoE attacks. Good luck!",
    likes: 189,
    comments: 15,
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?u=3",
    name: "Destiny_Raider",
    time: "1 day ago",
    content:
      "Anyone up for a raid in Destiny 2 tonight? Need 2 more for a fresh run.",
    likes: 76,
    comments: 8,
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/150?u=4",
    name: "RetroGamer_84",
    time: "2 days ago",
    content:
      "Just picked up a classic SNES. What are the must-play RPGs I should start with?",
    likes: 312,
    comments: 56,
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/150?u=5",
    name: "SpeedRunner_X",
    time: "3 days ago",
    content:
      "New world record for Hollow Knight any% glitchless! Check out the VOD.",
    likes: 521,
    comments: 34,
  },
];

const Community = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen overflow-hidden">
      <Helmet>
        <title>GameHub | Community</title>
      </Helmet>
      <Container>
        <AnimatedTitle text="Join the Discussion" />

        <div className="flex flex-col lg:flex-row gap-12 items-center mt-12">
          <div className="flex-1 space-y-8 text-center lg:text-left lg:max-w-md z-10">
            <h3 className="text-4xl font-extrabold text-gray-800 leading-tight">
              Where Gamers <br /> Connect & Share
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are more than just a library. We are a thriving ecosystem of
              creators, strategists, and fans. Jump into our dedicated channels
              to find your squad and share your passion.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button className="btn btn-lg bg-[#5865F2] hover:bg-[#4752C4] text-white border-0 flex items-center gap-3 rounded-full shadow-lg hover:shadow-[#5865F2]/50 transition-all">
                <FaDiscord className="text-2xl" /> Join Discord
              </button>
              <button className="btn btn-lg bg-[#FF4500] hover:bg-[#CC3700] text-white border-0 flex items-center gap-3 rounded-full shadow-lg hover:shadow-[#FF4500]/50 transition-all">
                <FaReddit className="text-2xl" /> r/GameHub
              </button>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto lg:max-w-2xl relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-green-200/40 to-blue-200/40 blur-3xl rounded-full -z-10"></div>

            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Autoplay, Pagination]}
              className="mySwiper py-12! px-4!">
              {communityPosts.map((post) => (
                <SwiperSlide key={post.id} className="w-80! sm:w-96!">
                  <div className="card bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full">
                    <div className="card-body p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="avatar">
                          <div className="w-12 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                            <img src={post.avatar} alt={post.name} />
                          </div>
                        </div>
                        <div>
                          <h2 className="card-title text-base font-bold text-gray-800">
                            {post.name}
                          </h2>
                          <p className="text-xs text-gray-500">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-6">
                        {post.content}
                      </p>
                      <div className="card-actions justify-between items-center text-gray-500 text-sm mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
                          <FaHeart /> <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
                          <FaComment /> <span>{post.comments} Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Community;
