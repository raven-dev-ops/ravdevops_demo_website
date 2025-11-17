// components/ChatBot.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ravenAssistantIcon from '../assets/service1_banner.png';

const ChatBot = ({ defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [bubbleVisible, setBubbleVisible] = useState(defaultOpen);
  const [wobble, setWobble] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const listEndRef = useRef(null);

  // Timed behavior:
  // - bubble appears after 30s
  // - auto-open at 60s with greeting
  useEffect(() => {
    if (defaultOpen) {
      setBubbleVisible(true);
      return undefined;
    }

    const bubbleTimer = setTimeout(() => {
      setBubbleVisible(true);
    }, 30000);

    const autoOpenTimer = setTimeout(() => {
      setBubbleVisible(true);
      setOpen(true);
    }, 60000);

    return () => {
      clearTimeout(bubbleTimer);
      clearTimeout(autoOpenTimer);
    };
  }, [defaultOpen]);

  // Seed greeting when the chat first opens and is empty
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 'greet', role: 'bot', text: 'CAWWW! How can I help you today?' }]);
    }
  }, [open, messages.length]);

  // Auto-scroll conversation to bottom
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Wobble the bubble every 5s once visible and chat closed
  useEffect(() => {
    if (!bubbleVisible || open) return undefined;
    const interval = setInterval(() => {
      setWobble(true);
      setTimeout(() => setWobble(false), 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [bubbleVisible, open]);

  const appendMessage = (role, text) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text }]);
  };

  const handleSend = () => {
    const text = (userInput || '').trim();
    if (!text) return;
    appendMessage('user', text);
    setUserInput('');
    appendMessage('bot', "Thanks for sharing. If you'd like to go deeper, feel free to describe your stack, timelines, or constraints.");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18 }}
            className="mb-3 w-80 max-w-[90vw] overflow-hidden rounded-xl border border-gray-200 bg-white text-slate-900 shadow-2xl dark:border-raven-border/70 dark:bg-raven-card/95 dark:text-slate-100"
          >
            <div className="flex items-center justify-between bg-raven-blue px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 overflow-hidden rounded-full bg-black/30">
                  <img
                    src={ravenAssistantIcon}
                    alt="Raven AI Assistant"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold">Raven AI Assistant</span>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="p-1 hover:opacity-90"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <div className="h-64 space-y-2 overflow-y-auto rounded-md border border-gray-100 bg-gray-50 p-2 pr-1 dark:border-raven-border/70 dark:bg-raven-surface/80">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${
                        m.role === 'bot'
                          ? 'bg-raven-blue/10 text-slate-800 dark:bg-raven-blue/20 dark:text-slate-100'
                          : 'bg-raven-blue text-white'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={listEndRef} />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-raven-blue focus:outline-none dark:border-raven-border/70 dark:bg-raven-surface/80 dark:text-slate-100"
                />
                <button
                  onClick={handleSend}
                  disabled={!userInput.trim()}
                  className={`rounded-lg px-3 py-2 text-sm font-medium text-white ${
                    userInput.trim() ? 'bg-raven-blue hover:bg-blue-800' : 'cursor-not-allowed bg-gray-300'
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {bubbleVisible && (
        <motion.button
          className="flex items-center justify-center rounded-full bg-raven-blue p-3 text-white shadow-lg hover:bg-blue-800"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Open chat bot"
          animate={wobble ? { rotate: [0, -6, 6, -6, 0] } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-12 w-12 overflow-hidden rounded-full bg-black/30">
            <img
              src={ravenAssistantIcon}
              alt="Raven AI Assistant"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default ChatBot;
