import React from "react";
import { NavLink } from "react-router";
import Container from "./Container";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container className="footer p-10 flex flex-col md:flex-row md:justify-between">
        <aside>
          <NavLink to={"/"} className={"flex items-center"}>
            <img className="w-12 mr-2" src={logo} alt="" />
            <p className="text-green-500 text-3xl font-bold">
              Game<span className="text-red-500">Hub</span>
            </p>
          </NavLink>
          <p className="mt-2">
            Discover and install the best indie games.
            <br />
            Copyright © 2025 GameHub. All rights reserved.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-white">Quick Links</h6>
          <NavLink to="/" className="link link-hover">
            Home
          </NavLink>
          <NavLink to="/top-games" className="link link-hover">
            Top Games
          </NavLink>
          <NavLink to="/installed-games" className="link link-hover">
            Installed Games
          </NavLink>
        </nav>
        <nav>
          <h6 className="footer-title text-white">Account</h6>
          <NavLink to="/profile" className="link link-hover">
            My Profile
          </NavLink>
          <NavLink to="/signin" className="link link-hover">
            Sign In
          </NavLink>
          <NavLink to="/register" className="link link-hover">
            Register
          </NavLink>
        </nav>
        <nav>
          <h6 className="footer-title text-white">Social</h6>
          <div className="grid grid-flow-col gap-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover">
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover">
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover">
              <FaYoutube />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover">
              <FaInstagram />
            </a>
          </div>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
