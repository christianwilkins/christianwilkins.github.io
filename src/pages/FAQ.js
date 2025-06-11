import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQ.css";
import { faqData } from "./faqData";

export default function FAQ() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can I help you today?",
      sender: "bot",
      options: [
        "Thinking of hiring Chris?",
        "Get Advice from Chris",
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesContainerRef = useRef(null);

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
  const streamText = async (text, messageId) => {
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: currentText }
          : msg
      ));
      
      // Add delay between words for streaming effect
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Ensure the final message is fully set
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, text: currentText } 
        : msg
    ));
    scrollToBottom();
    // Wait a bit before allowing new input
    await new Promise(resolve => setTimeout(resolve, 500));

    // After streaming is done, reset the isStreaming state
    setIsStreaming(false);
  };

  const handleOptionClick = async (option) => {
    if (isStreaming) return; // Prevent new messages while streaming
    
    // Check if user selected "Contact Chris" and navigate to contact page
    if (option === "Contact Chris") {
      navigate("/contact");
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
    const userMessage = {
      id: Date.now(),
      text: option,
      sender: "user"
    };

    // Get bot response
    const response = faqData[option] || {
      text: "I'm sorry, I don't have information about that. Let me help you with something else!",
      options: [
        "Thinking of hiring Chris?",
        "Get Advice from Chris",
        "Contact Chris"
      ]
    };

    const botMessageId = Date.now() + 1;
    const botMessage = {
      id: botMessageId,
      text: "", // Start with empty text for streaming
      sender: "bot",
      options: response.options
    };

    // Add both messages
    setMessages(prev => [...prev, userMessage, botMessage]);
    
    // Stream the bot response
    await streamText(response.text, botMessageId);
    setShowOptions(true);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isStreaming) {
      setIsStreaming(true);
      setShowOptions(false);
      
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        sender: "user"
      };

      // Find the last bot message to repeat
      const lastBotMessage = messages.slice().reverse().find(msg => msg.sender === "bot");
      
      const response = lastBotMessage ? {
        text: lastBotMessage.text,
        options: lastBotMessage.options || [
          "Thinking of hiring Chris?",
          "Get Advice from Chris",
          "Contact Chris"
        ]
      } : {
        text: "Hi! I'm Chris's FAQ assistant. How can I help you today?",
        options: [
          "Thinking of hiring Chris?",
          "Get Advice from Chris",
          "Contact Chris"
        ]
      };

      const botMessageId = Date.now() + 1;
      const botMessage = {
        id: botMessageId,
        text: "", // Start with empty text for streaming
        sender: "bot",
        options: response.options
      };

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
          "Thinking of hiring Chris?",
          "Get Advice from Chris",
        ]
      }
    ]);
    setInputValue("");
    setShowOptions(true);
    setIsStreaming(false);
  };

  return (
    <div className="faq-content">
      <h1 className="faq-title">FAQ</h1>
        <p className="faq-description">
            hi there! i made this page to help you learn more about me.
        </p>
      <div className="chat-container">
        <div className="messages-container" ref={messagesContainerRef}>
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className={`message-bubble ${message.sender}`}>
                <p className={isStreaming && message.sender === "bot" && message.text ? "streaming-text" : ""}>
                  {message.text}
                </p>
                {message.options && showOptions && !isStreaming && (
                  <div className="options-container">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        className="option-button"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleInputSubmit} className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            className="input-base message-input"
            disabled={isStreaming}
          />
          <button type="submit" className="btn-accent send-button" disabled={isStreaming}>
            {isStreaming ? "..." : "Send"}
          </button>
          <button 
            type="button"
            className="btn-accent start-over-button" 
            onClick={handleStartOver}
            disabled={isStreaming}
          >
            Start Over
          </button>
        </form>
      </div>
    </div>
  );
}
