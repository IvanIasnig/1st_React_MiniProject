import React from "react";
import { FaBars } from "react-icons/fa";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="header">
      <div className="container nav-container">
        <header className="nav-header">
          <div>Crypto Tracker</div>
          <div className="nav-toggler">
            <button className="icon-btn btn nav-toggler">
              <FaBars className="nav-icon" />
            </button>
          </div>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
