import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="content">
      <h1>HOME</h1>
      <p>Hi, I'm Chris!</p>
      <p>
        I'm a software engineer passionate about building meaningful solutions
        that make a difference. Currently based in the US (US Citizen), I
        specialize in full-stack development and love tackling complex problems.
      </p>
      <p>
        Take a look at my{" "}
        <Link to="/projects" className="nav-link">
          recent projects
        </Link>{" "}
        to see my work in action, or learn more{" "}
        <Link to="/about" className="nav-link">
          about my journey
        </Link>{" "}
        in tech. I'm always excited to{" "}
        <Link to="/contact" className="nav-link">
          connect with fellow developers
        </Link>{" "}
        and discuss new opportunities.
      </p>
      <p>
        Whether you're interested in collaboration or just want to chat about
        technology, I'd love to hear from you!
      </p>
    </div>
  );
}
