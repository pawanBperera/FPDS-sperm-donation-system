// src/components/ChatBot/ChatBot.jsx

import React, { useState } from "react";
import { askFAQ } from "./faqApi";
import './chatStyles.css';
import butterflyIcon from "../../assets/butterfly.png"; // make sure you have this
import { useRef, useEffect } from "react";



    const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! Ask me anything about our system 🦋" }]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);



const bottomRef = useRef(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);







  const toggleChat = () => setIsOpen(!isOpen);


    const handleSend = async () => {
        if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  setMessages(prev => [...prev, userMsg]);
  setInput("");

  setIsTyping(true); // start flapping

  await new Promise(resolve => setTimeout(resolve, 1200));

  const botReplyText = await askFAQ(userMsg.text);

  setIsTyping(false); // stop flapping

  const botMsg = { sender: "bot", text: botReplyText };
  setMessages(prev => [...prev, botMsg]);
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div className="chatbot-toggle" onClick={toggleChat}>
        <img
  src={butterflyIcon}
  alt="chat"
  className={`chatbot-icon ${isTyping ? 'flap-animation' : ''}`}
/>

      </div>

      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <img src={butterflyIcon} alt="logo" />
            <span>Lily is here to Assist you!</span>
            <button onClick={toggleChat} className="close-btn">×</button>
          </div>



          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
              <div ref={bottomRef} />
          </div>
          {isTyping && (
  <div className="chatbot-typing-indicator">
    <span>🦋 Lily is thinking...</span>
  </div>
)}




          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
