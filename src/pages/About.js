import React from "react";
import profileImage from "../assets/pfp.jpg";

export default function About() {
  return (
    <div className="content">
      <h1>ABOUT ME</h1>
      <p>
        I’m a passionate software engineer and leader dedicated to solving
        meaningful challenges through technology. As the president of a{" "}
        <a
          href="https://www.linkedin.com/company/imaginemsu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          software development and consulting club
        </a>
        , I’ve overseen impactful projects, mentored teams, and helped the
        organization grow from 350 to 500 members during my tenure. I thrive on
        empowering others while delivering real-world solutions for clients.
      </p>
      <p>
        Professionally, I worked on a team at Configura to directly fulfill the
        needs of a singular client, gaining hands-on experience in client
        collaboration and problem-solving. At Imagine Software, I led one of the
        most successful teams in the organization’s history, with members
        gaining experience that helped them secure roles at Meta and Google.
        This summer, I’m excited to join JPMorgan Chase as a software
        engineering intern, continuing to push the boundaries of innovation and
        impact.
      </p>
      <img
        src={profileImage}
        alt="Christian Wilkins"
        className="profile-image"
      />
    </div>
  );
}
