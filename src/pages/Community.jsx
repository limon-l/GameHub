import React from "react";
import Container from "../components/Container";
import AnimatedTitle from "../components/AnimatedTitle";
import { Helmet } from "react-helmet-async";
import { FaDiscord, FaReddit, FaComments } from "react-icons/fa";

const Community = () => {
  return (
    <div className="py-20 bg-white min-h-screen">
      <Helmet>
        <title>GameHub | Community</title>
      </Helmet>
      <Container>
        <AnimatedTitle text="Join the Discussion" />

        <div className="flex flex-col lg:flex-row gap-12 items-center mt-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Where Gamers Connect
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are more than just a library. We are a thriving ecosystem of
              creators, strategists, and fans. Jump into our dedicated channels
              to find your squad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn btn-lg bg-[#5865F2] hover:bg-[#4752C4] text-white border-0 flex items-center gap-2">
                <FaDiscord className="text-2xl" /> Join Discord
              </button>
              <button className="btn btn-lg bg-[#FF4500] hover:bg-[#CC3700] text-white border-0 flex items-center gap-2">
                <FaReddit className="text-2xl" /> r/GameHub
              </button>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="mockup-window border bg-base-300 shadow-2xl">
              <div className="flex flex-col gap-4 justify-center bg-base-200 px-4 py-8 h-96 overflow-y-auto">
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://i.pravatar.cc/150?u=1" alt="avatar" />
                    </div>
                  </div>
                  <div className="chat-bubble chat-bubble-primary">
                    Has anyone beaten the final boss in Elden Ring yet?
                  </div>
                </div>
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://i.pravatar.cc/150?u=2" alt="avatar" />
                    </div>
                  </div>
                  <div className="chat-bubble chat-bubble-secondary">
                    Just did it last night! Use the Mimic Tear.
                  </div>
                </div>
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://i.pravatar.cc/150?u=3" alt="avatar" />
                    </div>
                  </div>
                  <div className="chat-bubble bg-green-600 text-white">
                    Anyone up for a raid in Destiny 2?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Community;
