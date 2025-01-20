import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="content">
      <h1>HOME</h1>
      <p>
        Hi, I'm Chris!
        <br></br>
        Welcome to my portfolio!
        <br></br>
        I'm a software engineer based in the US (US Citizen).
        <br></br>I love <Link to="/contact">meeting new people</Link> and
        learning new things.
      </p>
    </div>
  );
}
