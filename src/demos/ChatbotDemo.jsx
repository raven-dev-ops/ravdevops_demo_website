import React, { useState, useEffect, useRef } from 'react';

const ChatbotDemo = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Ask me about Raven Development services (e.g., "What is SaaS development?"). This is a demo.' }]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null); // To scroll to bottom

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]); // Scroll whenever messages change

  const handleSend = () => {
    if (!input.trim() || isBotTyping) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsBotTyping(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      let botResponseText = "Thanks for your message! As a demo bot, I have limited responses. For a real consultation, please use the contact form.";

      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('saas')) {
          botResponseText = "SaaS (Software as a Service) involves building cloud-hosted apps offered via subscription. We build scalable SaaS platforms!";
      } else if (lowerInput.includes('custom software')) {
           botResponseText = "Custom software is tailor-made for your specific business needs, providing a perfect fit unlike off-the-shelf options. We excel at creating these.";
      } else if (lowerInput.includes('app development') || lowerInput.includes('mobile app') || lowerInput.includes('web app')) {
           botResponseText = "We develop both web and mobile applications designed to streamline your operations, engage customers, and digitize workflows.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
           botResponseText = "Hello there! How can I help you demo Raven Development's services today?";
      }

      const botMessage = { sender: 'bot', text: botResponseText };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsBotTyping(false);
    }, 1200); // Simulate delay
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col h-[300px]"> {/* Fixed height */}
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-3"> {/* Added padding-right */}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span className={`inline-block px-3 py-1.5 rounded-lg max-w-[80%] text-sm ${msg.sender === 'user' ? 'bg-raven-blue text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {isBotTyping && (
          <div className="flex justify-start">
            <span className="inline-block px-3 py-1.5 rounded-lg bg-gray-200 text-gray-500 text-sm italic">
              Bot is typing...
            </span>
          </div>
        )}
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-auto"> {/* Ensure input is at bottom */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow border border-gray-300 rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-raven-blue"
          placeholder="Type your message..."
          disabled={isBotTyping}
        />
        <button
          onClick={handleSend}
          className={`bg-raven-blue text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200 text-sm ${isBotTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isBotTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotDemo; // Default export