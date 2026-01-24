"use client";

import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { contactLinks, type ContactLink } from "@/data/contactData";
import { trackEvent } from "@/lib/analytics";

const icons: Record<ContactLink["id"], React.ReactNode> = {
  call: <FaPhoneAlt className="w-6 h-6" />,
  email: <MdEmail className="w-6 h-6" />,
  github: <FaGithub className="w-6 h-6" />,
  linkedin: <FaLinkedin className="w-6 h-6" />,
  twitter: <FaTwitter className="w-6 h-6" />,
};

const eventMap: Record<ContactLink["id"], string> = {
  call: "book_call",
  email: "email_contact",
  github: "contact_github",
  linkedin: "contact_linkedin",
  twitter: "contact_twitter",
};

export function ContactLinks() {
  const handleClick = (link: ContactLink) => {
    trackEvent(eventMap[link.id], { label: link.label, href: link.url });
  };

  return (
    <div className="flex flex-col gap-4">
      {contactLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(link)}
          className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-background text-foreground shadow-soft hover:bg-muted transition-colors hover-lift"
        >
          <span className="text-muted-foreground transition-colors group-hover:text-foreground">{icons[link.id]}</span>
          <span className="ui-label font-medium text-sm sm:text-base">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
