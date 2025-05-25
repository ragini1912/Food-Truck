import React, { useState, useEffect } from "react"; // Added useEffect
import "./UserNavbar.css";
import { FaGlobe, FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  // Optional: Add body overflow hidden when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <header className="navbar-container">
      <div className="navbar-top-row">
        <div className="logo">Food Truck</div>

        <button
          className="menu-toggle"
          onClick={handleMenuToggle}
          aria-label={menuOpen ? "Close menu" : "Open menu"} // Dynamic aria-label
        >
          {menuOpen ? <FaTimes /> : <FaBars />}{" "}
          {/* Toggle icon based on state */}
        </button>

        <nav className={`navbar-nav${menuOpen ? " active" : ""}`}>
          {/* Keep the close button inside the nav for when it's part of the sliding panel */}
          {/* Or, if FaTimes in menu-toggle is preferred, this button can be styled differently or removed */}
          <button
            className="close-menu" // This button is inside the nav panel
            onClick={handleMenuClose}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <Link to="/" onClick={handleMenuClose}>
            Home
          </Link>
          <Link to="/about" onClick={handleMenuClose}>
            About
          </Link>
          <Link to="/menu" onClick={handleMenuClose}>
            Menu
          </Link>
          <Link to="/pages" onClick={handleMenuClose}>
            Pages
          </Link>
          <Link to="/blog" onClick={handleMenuClose}>
            Blog
          </Link>
          <Link to="/contact" onClick={handleMenuClose}>
            Contact
          </Link>
          <div className="mobile-menu-bottom-items">
            <div className="language-icon">
              <FaGlobe />
              <span>English</span>
            </div>
            <Link
              to="/login"
              className="login-button"
              onClick={handleMenuClose}
            >
              Register/Login
            </Link>
          </div>
        </nav>

        <div className="language-login desktop-only">
          <div className="language-icon">
            <FaGlobe />
            <span>English</span>
          </div>
          <Link to="/login" className="login-button">
            Register/Login
          </Link>
        </div>
      </div>

      <div className="navbar-bottom-row">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Buscar" />
        </div>
      </div>

      {/* Always render backdrop, toggle 'active' class for CSS transitions */}
      <div
        className={`navbar-backdrop${menuOpen ? " active" : ""}`}
        onClick={handleMenuClose}
      ></div>
    </header>
  );
};

export default Navbar;
