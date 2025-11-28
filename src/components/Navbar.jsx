import React from "react";
import { NavLink, useNavigate, Link } from "react-router";
import Container from "./Container";
import MyLink from "./MyLink";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/signin");
      })
      .catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <li>
        <MyLink to={"/"}>Home</MyLink>
      </li>
      <li>
        <MyLink to={"/top-games"}>Top Games</MyLink>
      </li>
      <li>
        <MyLink to={"/installed-games"}>Installed Games</MyLink>
      </li>
      {user && (
        <li>
          <MyLink to={"/profile"}>Profile</MyLink>
        </li>
      )}
      {!user && !loading && (
        <>
          <li className="lg:hidden">
            {" "}
            <MyLink to={"/register"}>Register</MyLink>
          </li>
          <li className="lg:hidden">
            {" "}
            <MyLink to={"/signin"}>Sign In</MyLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="shadow-sm bg-white sticky top-0 z-50">
      {" "}
      <Container className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 text-lg font-semibold text-green-700">
              {navLinks}
            </ul>
          </div>
          <NavLink to={"/"} className={"flex items-center"}>
            <img className="w-10 mr-2" src={logo} alt="GameHub Logo" />
            <p className="text-green-700 text-2xl font-bold">
              Game<span className="text-red-700">Hub</span>
            </p>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-semibold text-green-700">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="btn btn-ghost btn-circle avatar">
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
                className="btn btn-sm bg-green-700 border-0 text-white text-base hover:bg-red-700">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex gap-4">
              {" "}
              <MyLink to={"/register"}>
                <span className="btn bg-green-700 border-0 text-white text-lg hover:bg-green-800">
                  Register
                </span>
              </MyLink>
              <MyLink to={"/signin"}>
                <span className="btn bg-green-700 border-0 text-white text-lg hover:bg-green-800">
                  Sign In
                </span>
              </MyLink>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
