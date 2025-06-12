// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import HamburgerMenu from "./components/HamburgerMenu";
import { HashRouter } from "react-router-dom";

function AppContent() {
  const { isDarkMode } = useTheme();
  const [showStickyHeader, setShowStickyHeader] = React.useState(false);

  React.useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  React.useEffect(() => {
    const handleScroll = () => {
      // Only show sticky header on mobile (screen width <= 768px) and when scrolled past 100px
      const isMobile = window.innerWidth <= 768;
      const scrollY = window.scrollY;
      
      if (isMobile && scrollY > 100) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };

    const handleResize = () => {
      // Hide sticky header if screen becomes larger than mobile
      if (window.innerWidth > 768) {
        setShowStickyHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      {/* Hamburger Menu - Always rendered but only visible on mobile */}
      <HamburgerMenu isVisible={true} showStickyHeader={showStickyHeader} />
      
      {/* Mobile Sticky Header */}
      <div className={`mobile-sticky-header ${showStickyHeader ? 'visible' : ''}`}>
        <Link
          to="/"
          className="name-link"
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <h2>
            CHRIS WILKINS
          </h2>
        </Link>
      </div>

      <div className="container">
        <div className="left-column">
          <Link
            to="/"
            className="name-link"
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <h2>
              CHRIS<br></br>WILKINS
            </h2>
          </Link>
          <h1 className="role">
            SOFTWARE<br></br>ENGINEER
          </h1>

          <nav className="nav-links">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/projects">PROJECTS</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/faq">FAQ</Link>
            <ThemeToggle />
          </nav>
        </div>

        <div className={`right-column ${showStickyHeader ? 'with-sticky-header' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </div>
      <div className="footer">
        <h4>COPYRIGHT © 2025 Christian J Wilkins. ALL RIGHTS RESERVED.</h4>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
