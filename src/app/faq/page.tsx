
import { FAQChat } from "@/components/faq-chat";

export default function FAQ() {
    return (
        <div className="w-full animate-rise-in">
            <h1 className="text-4xl font-bold mb-6 font-heading">Faq</h1>
            <p className="mb-8 text-lg leading-relaxed">
                hi there! i made this page to help you learn more about me.
            </p>
            <FAQChat />
        </div>
    );
}
