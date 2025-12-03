import React, { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { useGames } from "../context/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaDownload,
  FaGamepad,
  FaCheckCircle,
  FaWindows,
  FaMemory,
  FaMicrochip,
  FaCalendarAlt,
  FaHdd,
  FaShareAlt,
  FaPlay,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Download Simulation State
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const downloadInterval = useRef(null);

  const { user } = useAuth();
  const { installedGames, installGame, loadingGames } = useGames();

  const isInstalled = useMemo(() => {
    return installedGames?.some((g) => g.id === id);
  }, [installedGames, id]);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const foundGame = data.find((g) => g.id === id);
        setGame(foundGame);
        setLoading(false);
      });
  }, [id]);

  // Clean up interval if component unmounts
  useEffect(() => {
    return () => {
      if (downloadInterval.current) clearInterval(downloadInterval.current);
    };
  }, []);

  const handleInstallClick = () => {
    if (!user) {
      toast.error("Please sign in to install games.");
      navigate("/signin", { state: { from: { pathname: `/game/${id}` } } });
      return;
    }

    if (isInstalled) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    if (downloadInterval.current) clearInterval(downloadInterval.current);

    downloadInterval.current = setInterval(() => {
      setDownloadProgress((prev) => {
        const increment = Math.floor(Math.random() * 15) + 5;
        const nextProgress = prev + increment;

        if (nextProgress >= 100) {
          clearInterval(downloadInterval.current);

          setTimeout(() => {
            setIsDownloading(false);
            installGame(game);
          }, 500);

          return 100;
        }
        return nextProgress;
      });
    }, 500);
  };

  if (loading || loadingGames) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
    );
  }

  if (!game) {
    return (
      <Container className="py-20 text-center min-h-screen bg-[#121212] text-white">
        <h2 className="text-4xl font-bold text-red-500 mb-4">
          404 - Game Not Found
        </h2>
        <button
          onClick={() => navigate("/top-games")}
          className="btn btn-outline text-white hover:bg-white hover:text-black">
          Return to Store
        </button>
      </Container>
    );
  }

  const {
    title,
    coverPhoto,
    category,
    description,
    ratings,
    developer,
    downloadLink,
  } = game;

  return (
    <div className="bg-[#121212] min-h-screen text-gray-200 pb-20 font-sans">
      <Helmet>
        <title>{title} | GameHub Store</title>
      </Helmet>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Background Image with Parallax-like fixed attachment */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
          style={{ backgroundImage: `url(${coverPhoto})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

        <Container className="relative h-full flex items-end pb-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/10">
                {category}
              </span>
              <div className="flex items-center text-yellow-400 gap-1 text-sm font-bold">
                <FaStar /> {ratings}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 line-clamp-2 max-w-2xl">
              {description}
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="relative z-20 -mt-8 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT (LEFT) --- */}
          <div className="lg:w-2/3 space-y-10">
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              {["overview", "specs", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-green-500 text-white"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}>
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold text-white mb-4">
                        About {title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {description} Experience the thrill of {category}{" "}
                        gameplay developed by the legendary team at {developer}.
                        Immerse yourself in a world designed with breathtaking
                        attention to detail, where every choice matters.
                      </p>
                    </section>

                    {/* Gallery Mockup */}
                    <section>
                      <h3 className="text-xl font-bold text-white mb-4">
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <img
                          src={coverPhoto}
                          className="rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                          alt="Screenshot 1"
                        />
                        <div className="bg-gray-800 rounded-lg flex items-center justify-center h-full min-h-[150px] text-gray-600">
                          <span>+3 More Images</span>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6">
                      System Requirements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-green-500 font-bold text-sm uppercase">
                          Minimum
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                          <li className="flex items-center gap-3">
                            <FaWindows className="text-lg" /> Windows 10 64-bit
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMicrochip className="text-lg" /> Intel Core
                            i5-4460
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMemory className="text-lg" /> 8 GB RAM
                          </li>
                          <li className="flex items-center gap-3">
                            <FaGamepad className="text-lg" /> GTX 1060 6GB
                          </li>
                          <li className="flex items-center gap-3">
                            <FaHdd className="text-lg" /> 70 GB available space
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-green-500 font-bold text-sm uppercase">
                          Recommended
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                          <li className="flex items-center gap-3">
                            <FaWindows className="text-lg" /> Windows 11 64-bit
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMicrochip className="text-lg" /> Intel Core
                            i7-8700
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMemory className="text-lg" /> 16 GB RAM
                          </li>
                          <li className="flex items-center gap-3">
                            <FaGamepad className="text-lg" /> RTX 2070 Super
                          </li>
                          <li className="flex items-center gap-3">
                            <FaHdd className="text-lg" /> SSD required
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 flex items-start gap-4">
                      <div className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-white">AlexGamer99</h4>
                        <div className="flex text-yellow-500 text-xs mb-2">
                          ★★★★★
                        </div>
                        <p className="text-gray-400 text-sm">
                          One of the best experiences I've had in years. The
                          graphics are insane!
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 flex items-start gap-4">
                      <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white">
                        S
                      </div>
                      <div>
                        <h4 className="font-bold text-white">SarahConnor</h4>
                        <div className="flex text-yellow-500 text-xs mb-2">
                          ★★★★☆
                        </div>
                        <p className="text-gray-400 text-sm">
                          Great story, but optimized poorly on launch. Patches
                          fixed it though.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- SIDEBAR (RIGHT) --- */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Game Logo/Title Card */}
              <div className="bg-[#1a1a1a] rounded-xl p-2 border border-gray-800 shadow-2xl">
                <img
                  src={coverPhoto}
                  alt="Game Cover"
                  className="w-full rounded-lg"
                />
              </div>

              {/* Price & Action */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    Base Game
                  </span>
                  <span className="text-xl font-bold text-white">
                    Free to Play
                  </span>
                </div>

                {isDownloading ? (
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-green-400 mb-1 font-bold">
                      <span>Downloading...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <progress
                      className="progress progress-success w-full h-4"
                      value={downloadProgress}
                      max="100"></progress>
                  </div>
                ) : isInstalled ? (
                  <button
                    disabled
                    className="btn btn-lg w-full bg-gray-700 text-gray-300 border-0 font-bold gap-2 cursor-not-allowed">
                    <FaCheckCircle /> Installed
                  </button>
                ) : (
                  <button
                    onClick={handleInstallClick}
                    className="btn btn-lg w-full bg-green-600 hover:bg-green-700 text-white border-0 font-bold gap-2 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">
                    <FaDownload /> Install Now
                  </button>
                )}

                <div className="text-xs text-center text-gray-500">
                  *Requires GameHub Launcher to play.
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Developer</span>
                  <span className="text-white font-medium">{developer}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Publisher</span>
                  <span className="text-white font-medium">
                    {developer} Pub.
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Release Date</span>
                  <span className="text-white font-medium">Oct 24, 2023</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-500">Platform</span>
                  <span className="flex gap-2 text-white">
                    <FaWindows title="Windows" />
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <button className="btn btn-ghost btn-xs text-gray-400 hover:text-white gap-2">
                    <FaShareAlt /> Share
                  </button>
                  <button className="btn btn-ghost btn-xs text-gray-400 hover:text-white gap-2">
                    <FaUser /> Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GameDetails;
