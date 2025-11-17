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
  const [blurbVisible, setBlurbVisible] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | active | muted | standby
  const [lastInteraction, setLastInteraction] = useState(() => Date.now());
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
      const timestamp = new Date();
      setMessages([
        {
          id: 'greet',
          role: 'bot',
          text: 'CAWWW! How can I help you today?',
          timestamp,
        },
      ]);
      setStatus('active');
      setLastInteraction(Date.now());
    }
  }, [open, messages.length, setStatus]);

  // Auto-scroll conversation to bottom
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Wobble the bubble every 5s once visible and chat closed
  useEffect(() => {
    if (!bubbleVisible || open || status === 'muted' || status === 'standby') return undefined;
    const interval = setInterval(() => {
      setWobble(true);
      setTimeout(() => setWobble(false), 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [bubbleVisible, open, status]);

  // Show "CAWW!" blurb every 30s while bubble visible and chat is closed
  useEffect(() => {
    if (!bubbleVisible || open || status === 'muted' || status === 'standby') return undefined;
    const interval = setInterval(() => {
      setBlurbVisible(true);
      setTimeout(() => setBlurbVisible(false), 2000);
    }, 30000);
    return () => clearInterval(interval);
  }, [bubbleVisible, open, status]);

  // Standby mode after 90s of no interaction (when chat is closed and not muted)
  useEffect(() => {
    if (!bubbleVisible || status === 'muted') return undefined;
    const interval = setInterval(() => {
      if (!open && Date.now() - lastInteraction >= 90000) {
        setStatus('standby');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bubbleVisible, open, lastInteraction, status]);

  const appendMessage = (role, text) => {
    const timestamp = new Date();
    setMessages((prev) => [
      ...prev,
      { id: `${timestamp.getTime()}-${Math.random()}`, role, text, timestamp },
    ]);
  };

  const handleSend = () => {
    const text = (userInput || '').trim();
    if (!text) return;
    appendMessage('user', text);
    setUserInput('');
    setIsResponding(true);
    setStatus('active');
    setLastInteraction(Date.now());

    setTimeout(() => {
      appendMessage(
        'bot',
        "Thanks for sharing. If you'd like to go deeper, feel free to describe your stack, timelines, or constraints.",
      );
      setIsResponding(false);
      setLastInteraction(Date.now());
    }, 3000);
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
            className="mb-3 w-[30rem] max-w-[95vw] overflow-hidden rounded-xl border border-gray-200 bg-white text-slate-900 shadow-2xl dark:border-raven-border/70 dark:bg-raven-card/95 dark:text-slate-100"
          >
            <div className="flex items-center justify-between bg-raven-blue px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Raven AI Assistant</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-red-400 animate-pulse">
                  ● Live
                </span>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => {
                  setOpen(false);
                  setStatus('muted');
                }}
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
                    timeLabel = `${datePart} · ${timePart}`;
                  }

                  const isBot = m.role === 'bot';
                  const isUser = m.role === 'user';

                  if (!isBot && !isUser) return null;

                  return (
                    <div key={m.id} className="flex justify-start">
                      <div className="flex max-w-[85%] items-start gap-2">
                        {isBot && (
                          <>
                            <img
                              src={ravenAssistantIcon}
                              alt="Raven AI Assistant"
                              className="mt-0.5 h-8 w-8 object-cover"
                            />
                            <div className="flex flex-col rounded-lg bg-raven-blue/10 px-3 py-2 text-xs text-slate-800 dark:bg-raven-blue/20 dark:text-slate-100">
                              <span>{m.text}</span>
                              {timeLabel && (
                                <span className="mt-1 self-end text-[10px] opacity-70">
                                  {timeLabel}
                                </span>
                              )}
                            </div>
                          </>
                        )}

                        {isUser && (
                          <>
                            <div className="flex flex-col rounded-lg bg-raven-blue px-3 py-2 text-xs text-white">
                              <span>{m.text}</span>
                              {timeLabel && (
                                <span className="mt-1 self-end text-[10px] opacity-70">
                                  {timeLabel}
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-raven-accent/80 bg-raven-accent/10 text-[10px] font-semibold uppercase tracking-wide text-raven-accent">
                              You
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
                  <div className="flex max-w-[70%] items-start gap-2">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black/40">
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

      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {bubbleVisible && !open && blurbVisible && status !== 'muted' && status !== 'standby' && (
            <motion.div
              key="raven-caww"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="mb-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg"
            >
              CAWW!
            </motion.div>
          )}
        </AnimatePresence>

        {bubbleVisible && !open && (
          <motion.button
            className="group flex items-center justify-center rounded-full p-3 text-white shadow-lg transition bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent/70"
            whileHover={{ scale: 1.12, rotate: 3 }}
            onClick={() => {
              const nextOpen = !open;
              setOpen(nextOpen);
              if (nextOpen) {
                setStatus('active');
                setLastInteraction(Date.now());
              } else {
                setStatus('muted');
              }
            }}
            aria-expanded={open}
            aria-label="Open chat bot"
            animate={wobble ? { rotate: [0, -6, 6, -6, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative flex h-14 w-14 items-center justify-center transition-transform group-hover:scale-110">
              <div className="absolute inset-0 rounded-full border border-raven-blue/70 opacity-90 group-hover:border-raven-accent/80" />
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900">
                <img
                  src={ravenAssistantIcon}
                  alt="Raven AI Assistant"
                  className="h-12 w-12 object-cover"
                />
              </div>
            </div>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
