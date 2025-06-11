import React from "react";
import "./Contact.css";
import { FaGithub, FaLinkedin, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  const socialLinks = [
    {
      name: "Book a Call",
      url: "https://chriswiki.com/meet",
      icon: <FaPhoneAlt />, // Using material icon for phone
    },
    {
      name: "Email",
      url: "mailto:christian.wilkins.careers@gmail.com",
      icon: <MdEmail />,
    },
    {
      name: "GitHub",
      url: "https://github.com/christianwilkins",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/christian--wilkins/",
      icon: <FaLinkedin />,
    },
    {
      name: "Twitter",
      url: "https://x.com/christian_wilki",
      icon: <FaTwitter />,
    },
    
  ];

  return (
    <div className="content">
      <h1>CONTACT</h1>
      <p>
        feel free to reach out and connect with me! <br/> <br/>
        <span className="contact-note">(do not book call without prior communication)</span>
      </p>
      <div className="social-links">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon">{link.icon}</span>
            <span className="social-name">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
