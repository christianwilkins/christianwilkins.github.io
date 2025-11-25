import { FaGithub, FaLinkedin, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {
    const socialLinks = [
        {
            name: "Book a Call",
            url: "https://chriswiki.com/meet",
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
        <div>
            <h1 className="text-4xl font-bold mb-6 font-heading">CONTACT</h1>
            <p className="mb-8 text-lg leading-relaxed">
                feel free to reach out and connect with me! <br /> <br />
                <span className="text-sm text-muted-foreground">(do not book call without prior communication)</span>
            </p>
            <div className="flex flex-col gap-4">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        <span className="text-primary">{link.icon}</span>
                        <span className="font-medium">{link.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
