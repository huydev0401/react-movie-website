import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-10 header flex items-center justify-center gap-x-5 text-white">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movie
      </NavLink>
    </header>
  );
};

export default Header;
