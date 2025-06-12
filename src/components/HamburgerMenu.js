import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';
import ThemeToggle from './ThemeToggle';

const HamburgerMenu = ({ isVisible, showStickyHeader }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Don't render if not visible (desktop mode)
  if (!isVisible) return null;

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className={`hamburger-button ${isOpen ? 'open' : ''} ${showStickyHeader ? 'with-sticky-header' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Overlay */}
      {isOpen && <div className="hamburger-overlay" onClick={closeMenu}></div>}

      {/* Menu */}
      <nav className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
        <div className="hamburger-nav-links">
          <Link to="/" onClick={closeMenu}>HOME</Link>
          <Link to="/about" onClick={closeMenu}>ABOUT</Link>
          <Link to="/projects" onClick={closeMenu}>PROJECTS</Link>
          <Link to="/contact" onClick={closeMenu}>CONTACT</Link>
          <Link to="/faq" onClick={closeMenu}>FAQ</Link>
          <div className="hamburger-theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default HamburgerMenu;