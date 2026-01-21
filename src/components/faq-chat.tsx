"use client"

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { faqData } from "@/data/faqData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    options?: string[];
}

export function FAQChat() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi! How can I help you today?",
            sender: "bot",
            options: [
                "Thinking of hiring Christian?",
                "Get Advice from Christian",
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [showOptions, setShowOptions] = useState(true);
    const [isStreaming, setIsStreaming] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messageIdRef = useRef(1);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Streaming text function
    const streamText = async (text: string, messageId: number) => {
        const words = text.split(' ');

        for (let i = 0; i < words.length; i++) {
            const nextText = words.slice(0, i + 1).join(' ');

            setMessages(prev => prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, text: nextText }
                    : msg
            ));

            // Add delay between words for streaming effect
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        // Ensure the final message is fully set
        const finalText = words.join(' ');
        setMessages(prev => prev.map(msg =>
            msg.id === messageId
                ? { ...msg, text: finalText }
                : msg
        ));
        scrollToBottom();
        // Wait a bit before allowing new input
        await new Promise(resolve => setTimeout(resolve, 500));

        // After streaming is done, reset the isStreaming state
        setIsStreaming(false);
    };

    const handleOptionClick = async (option: string) => {
        if (isStreaming) return; // Prevent new messages while streaming

        // Check if user selected "Contact Christian" and navigate to contact page
        if (option === "Contact Christian") {
            router.push("/contact");
            return;
        } else if (option === "Imagine Software") {
            window.open("https://preview--imagine-software-reborn.lovable.app/", "_blank");
            return;
        } else if (option === "Companies Expert YouTube (soft skills)") {
            window.open("https://www.youtube.com/@TheCompaniesExpert/videos", "_blank");
            return;
        }

        setIsStreaming(true);
        setShowOptions(false);

        // Add user message
        const userMessage: Message = {
            id: messageIdRef.current + 1,
            text: option,
            sender: "user"
        };
        messageIdRef.current += 1;

        // Get bot response
        const response = faqData[option] || {
            text: "I'm sorry, I don't have information about that. Let me help you with something else!",
            options: [
                "Thinking of hiring Christian?",
                "Get Advice from Christian",
                "Contact Christian"
            ]
        };

        const botMessageId = messageIdRef.current + 1;
        const botMessage: Message = {
            id: botMessageId,
            text: "", // Start with empty text for streaming
            sender: "bot",
            options: response.options
        };
        messageIdRef.current += 1;

        // Add both messages
        setMessages(prev => [...prev, userMessage, botMessage]);

        // Stream the bot response
        await streamText(response.text, botMessageId);
        setShowOptions(true);
    };

    const handleInputSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && !isStreaming) {
            setIsStreaming(true);
            setShowOptions(false);

            const userMessage: Message = {
                id: messageIdRef.current + 1,
                text: inputValue,
                sender: "user"
            };
            messageIdRef.current += 1;

            // Find the last bot message to repeat
            const lastBotMessage = messages.slice().reverse().find(msg => msg.sender === "bot");

            const response = lastBotMessage ? {
                text: lastBotMessage.text,
                options: lastBotMessage.options || [
                    "Thinking of hiring Christian?",
                    "Get Advice from Christian",
                    "Contact Christian"
                ]
            } : {
                text: "Hi! I am Christian's faq assistant. How can I help you today?",
                options: [
                    "Thinking of hiring Christian?",
                    "Get Advice from Christian",
                    "Contact Christian"
                ]
            };

            const botMessageId = messageIdRef.current + 1;
            const botMessage: Message = {
                id: botMessageId,
                text: "", // Start with empty text for streaming
                sender: "bot",
                options: response.options
            };
            messageIdRef.current += 1;

            setMessages(prev => [...prev, userMessage, botMessage]);
            setInputValue("");

            // Stream the bot response
            await streamText(response.text, botMessageId);
            setShowOptions(true);
        }
    };

    const handleStartOver = () => {
        setMessages([
            {
                id: 1,
                text: "Hi! How can I help you today?",
                sender: "bot",
                options: [
                    "Thinking of hiring Christian?",
                    "Get Advice from Christian",
                ]
            }
        ]);
        messageIdRef.current = 1;
        setInputValue("");
        setShowOptions(true);
        setIsStreaming(false);
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl border rounded-lg overflow-hidden bg-card shadow-soft animate-rise-in">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
                {messages.map((message) => (
                    <div key={message.id} className={cn("flex flex-col animate-rise-in", message.sender === "user" ? "items-end" : "items-start")}>
                        <div className={cn(
                            "max-w-[80%] p-3 rounded-lg text-sm",
                            message.sender === "user"
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-muted text-muted-foreground rounded-bl-none"
                        )}>
                            <p className={cn(isStreaming && message.sender === "bot" && message.text ? "animate-pulse" : "")}>
                                {message.text}
                            </p>
                            {message.options && showOptions && !isStreaming && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {message.options.map((option, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleOptionClick(option)}
                                            className="text-xs h-auto py-1 px-2 whitespace-normal text-left"
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleInputSubmit} className="p-4 border-t bg-background flex gap-2">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1"
                    disabled={isStreaming}
                />
                <Button type="submit" disabled={isStreaming}>
                    {isStreaming ? "..." : "Send"}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleStartOver}
                    disabled={isStreaming}
                >
                    Start Over
                </Button>
            </form>
        </div>
    );
}
