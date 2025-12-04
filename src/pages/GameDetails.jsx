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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  if (!game) {
    return (
      <Container className="py-20 text-center min-h-screen bg-gray-50 text-gray-800">
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          404 - Game Not Found
        </h2>
        <button
          onClick={() => navigate("/top-games")}
          className="btn btn-outline text-gray-700 hover:bg-gray-800 hover:text-white">
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
    <div className="bg-gray-50 min-h-screen text-gray-800 pb-20 font-sans">
      <Helmet>
        <title>{title} | GameHub Store</title>
      </Helmet>

      <div className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 blur-[2px]"
          style={{ backgroundImage: `url(${coverPhoto})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-50 via-white/40 to-transparent" />

        <Container className="relative h-full flex items-end pb-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-white/80 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-white/50">
                {category}
              </span>
              <div className="flex items-center bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-yellow-600 gap-1 text-sm font-bold shadow-md border border-white/50">
                <FaStar /> {ratings}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 leading-tight drop-shadow-sm">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-800 font-medium line-clamp-2 max-w-2xl drop-shadow-sm bg-white/30 backdrop-blur-sm p-2 rounded-xl">
              {description}
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="relative z-20 -mt-8 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3 space-y-10">
            <div className="flex border-b border-gray-200">
              {["overview", "specs", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-green-600 text-green-700"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}>
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        About {title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {description} Experience the thrill of {category}{" "}
                        gameplay developed by the legendary team at {developer}.
                        Immerse yourself in a world designed with breathtaking
                        attention to detail, where every choice matters.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <img
                          src={coverPhoto}
                          className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                          alt="Screenshot 1"
                        />
                        <div className="bg-gray-100 rounded-2xl flex items-center justify-center h-full min-h-[200px] text-gray-500 font-semibold border-2 border-dashed border-gray-300">
                          <span>+3 More Images</span>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      System Requirements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-green-700 font-bold text-sm uppercase tracking-wider bg-green-50 w-fit px-3 py-1 rounded-full">
                          Minimum
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600 font-medium">
                          <li className="flex items-center gap-3">
                            <FaWindows className="text-lg text-gray-400" />{" "}
                            Windows 10 64-bit
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMicrochip className="text-lg text-gray-400" />{" "}
                            Intel Core i5-4460
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMemory className="text-lg text-gray-400" /> 8 GB
                            RAM
                          </li>
                          <li className="flex items-center gap-3">
                            <FaGamepad className="text-lg text-gray-400" /> GTX
                            1060 6GB
                          </li>
                          <li className="flex items-center gap-3">
                            <FaHdd className="text-lg text-gray-400" /> 70 GB
                            available space
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-green-700 font-bold text-sm uppercase tracking-wider bg-green-50 w-fit px-3 py-1 rounded-full">
                          Recommended
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600 font-medium">
                          <li className="flex items-center gap-3">
                            <FaWindows className="text-lg text-gray-400" />{" "}
                            Windows 11 64-bit
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMicrochip className="text-lg text-gray-400" />{" "}
                            Intel Core i7-8700
                          </li>
                          <li className="flex items-center gap-3">
                            <FaMemory className="text-lg text-gray-400" /> 16 GB
                            RAM
                          </li>
                          <li className="flex items-center gap-3">
                            <FaGamepad className="text-lg text-gray-400" /> RTX
                            2070 Super
                          </li>
                          <li className="flex items-center gap-3">
                            <FaHdd className="text-lg text-gray-400" /> SSD
                            required
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-shadow">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-green-700 text-xl shadow-inner">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          AlexGamer99
                        </h4>
                        <div className="flex text-yellow-500 text-sm mb-2">
                          ★★★★★
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          One of the best experiences I've had in years. The
                          graphics are insane and the gameplay is smooth!
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-shadow">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-blue-700 text-xl shadow-inner">
                        S
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          SarahConnor
                        </h4>
                        <div className="flex text-yellow-500 text-sm mb-2">
                          ★★★★☆
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          Great story, but optimized poorly on launch. Patches
                          fixed it though. Still a solid 8/10.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={coverPhoto}
                  alt="Game Cover"
                  className="w-full rounded-xl"
                />
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                    Base Game
                  </span>
                  <span className="text-2xl font-black text-gray-900">
                    Free to Play
                  </span>
                </div>

                {isDownloading ? (
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-green-700 mb-2 font-bold uppercase tracking-wide">
                      <span>Downloading...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${downloadProgress}%` }}></div>
                    </div>
                  </div>
                ) : isInstalled ? (
                  <button
                    disabled
                    className="btn btn-lg w-full bg-gray-100 text-gray-400 border-0 font-bold gap-2 cursor-not-allowed shadow-none">
                    <FaCheckCircle className="text-xl" /> Installed
                  </button>
                ) : (
                  <button
                    onClick={handleInstallClick}
                    className="btn btn-lg w-full bg-green-600 hover:bg-green-700 text-white border-0 font-bold gap-2 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all hover:-translate-y-1">
                    <FaDownload /> Install Now
                  </button>
                )}

                <div className="text-xs text-center text-gray-400 font-medium">
                  *Requires GameHub Launcher to play.
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">Developer</span>
                  <span className="text-gray-900 font-bold">{developer}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">Publisher</span>
                  <span className="text-gray-900 font-bold">
                    {developer} Pub.
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">
                    Release Date
                  </span>
                  <span className="text-gray-900 font-bold">Oct 24, 2023</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">Platform</span>
                  <span className="flex gap-2 text-gray-900 font-bold items-center">
                    <FaWindows
                      title="Windows"
                      className="text-lg text-blue-600"
                    />{" "}
                    Windows
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button className="btn btn-ghost btn-sm text-gray-500 hover:text-green-700 hover:bg-green-50 gap-2 font-semibold">
                    <FaShareAlt /> Share
                  </button>
                  <button className="btn btn-ghost btn-sm text-gray-500 hover:text-red-600 hover:bg-red-50 gap-2 font-semibold">
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
