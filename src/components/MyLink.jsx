import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className = "", children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group py-1 px-1 transition-colors duration-300 font-semibold ${
          isActive ? "text-green-700" : "text-gray-600 hover:text-green-700"
        } ${className}`
      }>
      {({ isActive }) => (
        <>
          <span className="relative z-10">{children}</span>
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-green-700 transition-all duration-300 ease-out rounded-full ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </>
      )}
    </NavLink>
  );
};

export default MyLink;
