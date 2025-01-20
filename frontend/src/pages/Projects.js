import React from "react";
import "./Projects.css";

export default function Projects() {
  const projects = [
    {
      title: "RecycleMe",
      description:
        "A mobile app that tells users whether an item is recyclable or not by taking a photo of it. The focus is to identify if an item is too contaminated to be recycled.",
      image: "/path-to-image.jpg", // Add project screenshot/image
      technologies: ["Flutter", "Firebase", "Dart"],
      liveLink: "https://project-url.com",
      githubLink: "https://github.com/username/project",
      featured: true,
    },
    // Add more projects...
  ];

  return (
    <div className="content">
      <h1>PROJECTS</h1>
      <p className="projects-intro">
        Here are some of my recent projects. Each one represents different
        challenges and learning experiences.
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {project.image && (
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
            )}

            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="tech-stack">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
