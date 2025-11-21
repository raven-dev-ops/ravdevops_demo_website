// components/ChatBot.jsx

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ravenAssistantIcon from '../assets/service1_banner.png';

const API_BASE =
  (typeof window !== 'undefined' &&
    window.__APP_CONFIG__ &&
    (window.__APP_CONFIG__.ASSISTANT_API_URL || window.__APP_CONFIG__.OPENAUXILIUM_URL)) ||
  'https://chat-assistant-backend-e4gl56kwma-uc.a.run.app';

const ChatBot = ({ defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const listEndRef = useRef(null);

  // Ensure the bubble is visible whenever the chat opens
  useEffect(() => {
    if (open) {
      setBubbleVisible(true);
    }
  }, [open]);

  // Seed a simple greeting the first time the chat opens
  useEffect(() => {
    if (open && messages.length === 0) {
      const timestamp = new Date();
      setMessages([
        {
          id: 'greet',
          role: 'bot',
          text: "Hi, I'm Raven. How can I help?",
          timestamp,
        },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll conversation to the bottom
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const appendMessage = (role, text) => {
    const timestamp = new Date();
    setMessages((prev) => [
      ...prev,
      { id: `${timestamp.getTime()}-${Math.random()}`, role, text, timestamp },
    ]);
  };

  const ensureChatUserId = () => {
    if (typeof document === 'undefined') return null;
    const name = 'chat_user_id';
    const existing = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`));
    if (existing) {
      return existing.split('=')[1];
    }
    const id = `guest_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${name}=${id}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    return id;
  };

  const handleSend = async () => {
    const text = (userInput || '').trim();
    if (!text) return;

    appendMessage('user', text);
    setUserInput('');
    setIsResponding(true);

    const chatUserId = ensureChatUserId();

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          context: {
            chatUserId,
            source: 'raven-demo-website',
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat error: ${res.status}`);
      }

      const json = await res.json();
      if (json.reply) {
        appendMessage('bot', json.reply);
      }
    } catch (error) {
      appendMessage(
        'bot',
        "I'm having trouble reaching my assistant server right now, but I can still share general information from the site.",
      );
    } finally {
      setIsResponding(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessages([]);
    setIsResponding(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18 }}
            className="mb-3 w-[30rem] max-w-[95vw] overflow-hidden rounded-xl border border-gray-200 bg-white text-slate-900 shadow-2xl dark:border-raven-border/70 dark:bg-raven-card/95 dark:text-slate-100"
          >
            <div className="flex items-center justify-between bg-raven-blue px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Raven AI Assistant</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-red-200">
                  Live
                </span>
              </div>
              <button
                aria-label="Close chat"
                onClick={handleClose}
                className="p-1 hover:opacity-90"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <div className="h-80 space-y-2 overflow-y-auto rounded-md border border-gray-100 bg-gray-50 p-2 pr-1 text-slate-900 dark:border-raven-border/70 dark:bg-raven-surface/80 dark:text-slate-100">
                {messages.map((m) => {
                  let timeLabel = '';
                  if (m.timestamp instanceof Date) {
                    const datePart = m.timestamp.toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    });
                    const timePart = m.timestamp.toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                    });
                    timeLabel = `${datePart} at ${timePart}`;
                  }

                  const isBot = m.role === 'bot';
                  const isUser = m.role === 'user';

                  if (!isBot && !isUser) return null;

                  return (
                    <div key={m.id} className="flex justify-start">
                      <div className="flex max-w-[85%] items-start gap-1.5">
                        {isBot && (
                          <>
                            <img
                              src={ravenAssistantIcon}
                              alt="Raven AI Assistant"
                              className="mt-0.5 h-9 w-9 object-cover"
                            />
                            <div className="flex flex-col rounded-lg bg-raven-blue/10 px-3 py-2 text-xs text-slate-800 dark:bg-raven-blue/20 dark:text-slate-100">
                              <span>{m.text}</span>
                              {timeLabel && (
                                <span className="mt-1 self-start text-[10px] opacity-70">
                                  {timeLabel}
                                </span>
                              )}
                            </div>
                          </>
                        )}

                        {isUser && (
                          <>
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-raven-accent/80 bg-raven-accent/10 text-[10px] font-semibold uppercase tracking-wide text-raven-accent">
                              You
                            </div>
                            <div className="flex flex-col rounded-lg bg-raven-blue px-3 py-2 text-xs text-white">
                              <span>{m.text}</span>
                              {timeLabel && (
                                <span className="mt-1 self-start text-[10px] opacity-70">
                                  {timeLabel}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={listEndRef} />
              </div>

              {isResponding && (
                <div className="mt-1 flex justify-start">
                  <div className="flex max-w-[70%] items-start gap-1.5">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-black/40">
                      <img
                        src={ravenAssistantIcon}
                        alt="Raven AI Assistant"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      className="flex items-center gap-2 rounded-lg bg-raven-blue/10 px-3 py-2 text-xs text-slate-800 dark:bg-raven-blue/20 dark:text-slate-100"
                      aria-live="polite"
                    >
                      <span>Raven is typing</span>
                      <span className="flex gap-0.5">
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-raven-blue"
                          style={{ animationDelay: '0s' }}
                        />
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-raven-blue"
                          style={{ animationDelay: '0.15s' }}
                        />
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-raven-blue"
                          style={{ animationDelay: '0.3s' }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              )}

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
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-raven-accent/70 hover:bg-slate-100/60 focus:border-raven-blue focus:outline-none dark:border-raven-border/70 dark:bg-raven-surface/80 dark:text-slate-100 dark:hover:border-raven-accent/70 dark:hover:bg-raven-surface/90"
                />
                <button
                  onClick={handleSend}
                  disabled={!userInput.trim()}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    userInput.trim()
                      ? 'bg-raven-accent text-black hover:bg-emerald-400'
                      : 'cursor-not-allowed bg-gray-300 text-slate-500'
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {bubbleVisible && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open chat bot"
          className="group flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent/70"
        >
          <img
            src={ravenAssistantIcon}
            alt="Raven AI Assistant"
            className="h-14 w-14 rounded-full object-cover transition-transform group-hover:scale-110"
          />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
