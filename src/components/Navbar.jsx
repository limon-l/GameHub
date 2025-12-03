import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import MyLink from "./MyLink";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaBars, FaTimes, FaGamepad } from "react-icons/fa";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/signin");
        setIsMobileMenuOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Top Games", path: "/top-games" },
    { title: "Reviews", path: "/reviews" },
    { title: "Community", path: "/community" },
    { title: "Support", path: "/support" },
    { title: "Installed Games", path: "/installed-games" },
    ...(user ? [{ title: "Profile", path: "/profile" }] : []),
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="shadow-lg bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
        <Container className="navbar py-3 px-4 md:px-8">
          <div className="navbar-start flex items-center">
            <NavLink to={"/"} className={"flex items-center group gap-2"}>
              <img
                className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300"
                src={logo}
                alt="GameHub Logo"
              />
              <p className="text-green-800 text-2xl font-extrabold tracking-tight">
                Game<span className="text-red-600">Hub</span>
              </p>
            </NavLink>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="flex gap-8 items-center text-base font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <MyLink to={link.path}>{link.title}</MyLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end flex items-center gap-4">
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost lg:hidden text-2xl text-green-800 p-0">
              <FaBars />
            </button>

            <div className="hidden lg:flex items-center gap-4">
              {loading ? (
                <span className="loading loading-spinner loading-sm text-green-700"></span>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/profile"
                    className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-green-500 transition-all"
                    title={user.displayName}>
                    <div className="w-10 rounded-full ring-2 ring-offset-2 ring-green-700">
                      {user.photoURL ? (
                        <img alt="User Profile" src={user.photoURL} />
                      ) : (
                        <FaUserCircle className="w-full h-full text-gray-400" />
                      )}
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-green-700 border-0 text-white hover:bg-red-600 transition-colors duration-300 shadow-md">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to={"/register"}>
                    <button className="btn btn-sm bg-transparent border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all rounded-full px-6">
                      Register
                    </button>
                  </Link>
                  <Link to={"/signin"}>
                    <button className="btn btn-sm bg-green-700 border-0 text-white hover:bg-green-800 hover:shadow-lg transition-all rounded-full px-6 shadow-green-200">
                      Sign In
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/50 z-60 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-70 shadow-2xl lg:hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-green-50/50">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Logo" className="w-8 h-8" />
                  <span className="text-xl font-bold text-green-800">Menu</span>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="btn btn-circle btn-ghost btn-sm text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors">
                  <FaTimes className="text-lg" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                        isActive
                          ? "bg-green-600 text-white shadow-lg shadow-green-200"
                          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                      }`
                    }>
                    <FaGamepad className="text-lg opacity-70" />
                    {link.title}
                  </NavLink>
                ))}

                {!user && (
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn bg-white border-green-600 text-green-700 w-full hover:bg-green-50">
                      Register
                    </Link>
                    <Link
                      to="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn bg-green-700 border-0 text-white w-full hover:bg-green-800 shadow-lg shadow-green-200">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>

              {user && (
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="User" />
                        ) : (
                          <FaUserCircle className="w-full h-full text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-gray-800 truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-error w-full text-white">
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
