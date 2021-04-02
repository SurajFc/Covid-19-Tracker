import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Map, HelpCircle, Rss } from "react-feather";

function Navbar() {
  return (
    <div className="sidenav">
      <p style={{ color: "white" }} className="ml-4 mt-4">
        Covid-19 <span>World</span>
      </p>

      <NavLink to="/" exact className=" nav-link">
        <span>
          <Home /> Home
        </span>
      </NavLink>
      <NavLink to="/country" exact className="nav-link">
        <span>
          <Map /> Maps
        </span>
      </NavLink>
      <NavLink exact to="/news" className="nav-link">
        <span>
          <Rss /> News
        </span>
      </NavLink>
      <NavLink exact to="/about" className="nav-link">
        <span>
          <HelpCircle /> About
        </span>
      </NavLink>
    </div>
  );
}

export default Navbar;
