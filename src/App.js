// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { HashRouter } from "react-router-dom";

function AppContent() {
  const { isDarkMode } = useTheme();

  React.useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
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
            <ThemeToggle />
          </nav>
        </div>

        <div className="right-column">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
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
