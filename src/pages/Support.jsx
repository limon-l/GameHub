import React from "react";
import Container from "../components/Container";
import AnimatedTitle from "../components/AnimatedTitle";
import { Helmet } from "react-helmet-async";

const Support = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <Helmet>
        <title>GameHub | Support</title>
      </Helmet>
      <Container className="max-w-4xl">
        <AnimatedTitle text="Help & Support" />

        <div className="join join-vertical w-full bg-white shadow-xl rounded-2xl border border-gray-100">
          <div className="collapse collapse-arrow join-item border-base-300 border-b">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium text-green-700">
              How do I install games?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Navigate to any game details page and click the "Install"
                button. You must be logged in to add games to your library.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border-b">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium text-green-700">
              Is GameHub free to use?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes! GameHub is a free platform for discovering and organizing
                your game collection.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium text-green-700">
              I forgot my password. What do I do?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Go to the Sign In page and click "Forgot Password?". Enter your
                email to receive a reset link.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-6">
            Our team is available 24/7 to assist you.
          </p>
          <button className="btn bg-green-700 hover:bg-green-800 text-white border-0 px-8">
            Contact Support
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Support;
