import { FAQChat } from "@/components/faq-chat";

export default function FAQ() {
    return (
        <div className="w-full animate-rise-in">
            <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">FAQ</h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                hi there! i made this page to help you learn more about me.
            </p>
            <FAQChat />
        </div>
    );
}
