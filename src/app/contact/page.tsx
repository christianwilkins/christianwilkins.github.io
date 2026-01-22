import type { Metadata } from "next";
import { FaGithub, FaLinkedin, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
    title: "Contact | Christian Wilkins",
    description:
        "Contact Christian Wilkins for software consultancy, startup product design, and technical hiring support.",
};

export default function Contact() {
    const socialLinks = [
        {
            name: "Book a Call",
            url: "https://cal.com/christianwilkins/book?duration=15",
            icon: <FaPhoneAlt className="w-6 h-6" />,
        },
        {
            name: "Email",
            url: "mailto:christian.wilkins.careers@gmail.com",
            icon: <MdEmail className="w-6 h-6" />,
        },
        {
            name: "GitHub",
            url: "https://github.com/christianwilkins",
            icon: <FaGithub className="w-6 h-6" />,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/christian--wilkins/",
            icon: <FaLinkedin className="w-6 h-6" />,
        },
        {
            name: "Twitter",
            url: "https://x.com/christian_wilki",
            icon: <FaTwitter className="w-6 h-6" />,
        },
    ];

    return (
        <div className="animate-rise-in">
            <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">Contact</h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Feel free to reach out and connect with me. <br /> <br />
                <span className="hidden sm:inline text-sm text-muted-foreground">(Do not book a call without prior communication)</span>
            </p>
            <div className="flex flex-col gap-4">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-background text-foreground shadow-soft hover:bg-muted transition-colors hover-lift"
                    >
                        <span className="text-muted-foreground transition-colors group-hover:text-foreground">{link.icon}</span>
                        <span className="ui-label font-medium text-sm sm:text-base">{link.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
