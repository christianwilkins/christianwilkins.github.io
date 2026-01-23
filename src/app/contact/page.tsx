import type { Metadata } from "next";
import { FaGithub, FaLinkedin, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { contactLinks, type ContactLink } from "@/data/contactData";

export const metadata: Metadata = {
    title: "Contact | Christian Wilkins",
    description:
        "Contact Christian Wilkins for software consultancy, startup product design, and technical hiring support.",
};

export default function Contact() {
    const icons: Record<ContactLink["id"], React.ReactNode> = {
        call: <FaPhoneAlt className="w-6 h-6" />,
        email: <MdEmail className="w-6 h-6" />,
        github: <FaGithub className="w-6 h-6" />,
        linkedin: <FaLinkedin className="w-6 h-6" />,
        twitter: <FaTwitter className="w-6 h-6" />,
    };

    return (
        <div className="animate-rise-in">
            <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">Contact</h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Feel free to reach out and connect with me. <br /> <br />
                <span className="hidden sm:inline text-sm text-muted-foreground">(Do not book a call without prior communication)</span>
            </p>
            <div className="flex flex-col gap-4">
                {contactLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-background text-foreground shadow-soft hover:bg-muted transition-colors hover-lift"
                    >
                        <span className="text-muted-foreground transition-colors group-hover:text-foreground">{icons[link.id]}</span>
                        <span className="ui-label font-medium text-sm sm:text-base">{link.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
