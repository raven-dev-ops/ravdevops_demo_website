// components/ChatBot.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ravenAssistantIcon from '../assets/service1_banner.png';

const CATCH_MESSAGES = [
  "You caught me! Lesson learned, don't chase AI prompts — make a training tool.",
  'You got me again. Better to train your tools than chase their quirks.',
  'Snagged! Smart humans build training data instead of chasing chat bubbles.',
  'Caught in 4K. Optimize prompts by improving your systems, not your aim.',
  'Another catch. Real power comes from solid workflows and training, not luck.',
  'Tag, I’m it. Let’s turn your questions into a repeatable playbook.',
  'You’re persistent. Channel that into better automation and training, not chasing ravens.',
  'Cornered again. Maybe it’s time for a knowledge base, not a wild goose chase.',
  'Nice reflexes. Now let’s apply that to tightening your tooling and docs.',
  'Final catch of the session. Remember: don’t chase AI—teach it.',
];

const API_BASE =
  process.env.REACT_APP_OPENAUXILIUM_URL || 'http://localhost:5050';

const ChatBot = ({ defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [bubbleVisible, setBubbleVisible] = useState(defaultOpen);
  const [wobble, setWobble] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [blurbVisible, setBlurbVisible] = useState(false); // CAWW! while running
  const [nevermoreVisible, setNevermoreVisible] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | active | muted | standby
  const [lastInteraction, setLastInteraction] = useState(() => Date.now());
  const [catchCount, setCatchCount] = useState(0);
  const [iconX, setIconX] = useState(0);
  const [isRunningAway, setIsRunningAway] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const listEndRef = useRef(null);
  const sessionIdRef = useRef(null);
  const runIntervalRef = useRef(null);
  const runTimeoutRef = useRef(null);
  const nevermoreRunTimeoutRef = useRef(null);
  const nevermoreCountRef = useRef(0);
  const iconRef = useRef(null);

  // Timed behavior:
  // - bubble appears after 30s (icon starts hidden until then)
  useEffect(() => {
    if (defaultOpen) {
      setBubbleVisible(true);
      return undefined;
    }

    const bubbleTimer = setTimeout(() => {
      setBubbleVisible(true);
    }, 30000);

    return () => {
      clearTimeout(bubbleTimer);
    };
  }, [defaultOpen]);

  // Initialize icon starting X so it begins near the bottom-right corner
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const updateInitialX = () => {
      const viewportWidth = window.innerWidth || 0;
      const iconWidth = 72; // approx 56px icon + margin
      const startX = Math.max(16, viewportWidth - iconWidth);
      setIconX(startX);
    };
    updateInitialX();
    window.addEventListener('resize', updateInitialX);
    return () => window.removeEventListener('resize', updateInitialX);
  }, []);

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

  // "NEVERMORE!!!" every 60s while bubble visible and chat is closed.
  // After the 3rd NEVERMORE, schedule the runaway animation 59s later.
  useEffect(() => {
    if (!bubbleVisible || open || status === 'muted' || status === 'standby') return undefined;
    const interval = setInterval(() => {
      setNevermoreVisible(true);
      setWobble(true);
      setTimeout(() => {
        setNevermoreVisible(false);
        setWobble(false);
      }, 2000);

      const next = nevermoreCountRef.current + 1;
      nevermoreCountRef.current = next;
      if (next === 3) {
        if (nevermoreRunTimeoutRef.current) {
          clearTimeout(nevermoreRunTimeoutRef.current);
        }
        nevermoreRunTimeoutRef.current = setTimeout(() => {
          if (!open && bubbleVisible && status !== 'muted') {
            startRunningAway();
          }
        }, 59000);
      }
    }, 60000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Track general activity so we can judge "idle for 3 minutes" for click logic
  useEffect(() => {
    const handleActivity = () => {
      setLastInteraction(Date.now());
    };
    if (typeof window === 'undefined') return undefined;
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  const stopRunningAway = () => {
    setIsRunningAway(false);
    if (runIntervalRef.current) {
      clearInterval(runIntervalRef.current);
      runIntervalRef.current = null;
    }
    if (runTimeoutRef.current) {
      clearTimeout(runTimeoutRef.current);
      runTimeoutRef.current = null;
    }
  };

  const startRunningAway = () => {
    if (isRunningAway || !bubbleVisible || open) return;
    setIsRunningAway(true);
    setLastInteraction(Date.now());

    // Show a quick CAWW! while running
    setBlurbVisible(true);
    setTimeout(() => {
      setBlurbVisible(false);
    }, 1500);

    if (runIntervalRef.current) return;

    let direction = -1; // start by moving left
    runIntervalRef.current = setInterval(() => {
      setIconX((prev) => {
        if (typeof window === 'undefined') return prev;
        const viewportWidth = window.innerWidth || 0;
        const iconWidth = 72;
        const minX = 16;
        const maxX = Math.max(minX, viewportWidth - iconWidth);
        const step = 40;
        let next = prev + direction * step;
        if (next <= minX) {
          next = minX;
          direction = 1;
        } else if (next >= maxX) {
          next = maxX;
          direction = -1;
        }
        return next;
      });
    }, 160);

    if (runTimeoutRef.current) {
      clearTimeout(runTimeoutRef.current);
    }
    runTimeoutRef.current = setTimeout(() => {
      stopRunningAway();
    }, 4000);
  };

  // Run away when the mouse cursor gets close to the icon
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleMouseMove = (event) => {
      if (!bubbleVisible || open || !iconRef.current) return;
      const rect = iconRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        startRunningAway();
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubbleVisible, open]);

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

    // Send message to OpenAuxilium-style backend
    const chatUserId = ensureChatUserId();

    fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionIdRef.current,
        chatUserId,
        message: text,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Chat error: ${res.status}`);
        }
        const json = await res.json();
        if (json.sessionId && !sessionIdRef.current) {
          sessionIdRef.current = json.sessionId;
        }
        if (json.reply) {
          appendMessage('bot', json.reply);
        }
      })
      .catch(() => {
        appendMessage(
          'bot',
          "I'm having trouble reaching my assistant server right now, but I can still share general information from the site.",
        );
      })
      .finally(() => {
        setIsResponding(false);
        setLastInteraction(Date.now());
      });
  };

  // When chat is explicitly closed by the user, clear the current backend session
  const endChatSession = () => {
    stopRunningAway();
    const id = sessionIdRef.current;
    sessionIdRef.current = null;
    setMessages([]);
    setStatus('idle');
    if (!id) return;

    fetch(`${API_BASE}/sessions/${id}/end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {
      // swallow errors; session will expire on the server
    });
  };

  const resetIconPosition = () => {
    if (typeof window === 'undefined') return;
    const viewportWidth = window.innerWidth || 0;
    const iconWidth = 72;
    const startX = Math.max(16, viewportWidth - iconWidth);
    setIconX(startX);
    stopRunningAway();
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

  const handleIconClick = () => {
    if (isRunningAway) return;

    const now = Date.now();
    const withinThreeMinutes = now - lastInteraction <= 3 * 60 * 1000;
    let nextClickCount = clickCount;

    if (!withinThreeMinutes) {
      nextClickCount = 0;
    }

    nextClickCount += 1;

    if (nextClickCount >= 3) {
      resetIconPosition();
      nextClickCount = 0;
    }

    setClickCount(nextClickCount);
    setLastInteraction(now);

    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      const index = Math.min(catchCount, CATCH_MESSAGES.length - 1);
      appendMessage('bot', CATCH_MESSAGES[index]);
      setCatchCount((prev) => prev + 1);
      setStatus('active');
      setLastInteraction(now);
    } else {
      setStatus('muted');
    }
  };

  const iconAnimate = wobble
    ? {
        x: iconX,
        y: isRunningAway ? 0 : [0, -4, 0],
        rotate: [0, -8, 8, -8, 0],
      }
    : {
        x: iconX,
        y: isRunningAway ? 0 : [0, -4, 0],
        rotate: 0,
      };

  const iconTransition = {
    x: { type: 'spring', stiffness: 260, damping: 20 },
    y: isRunningAway
      ? { duration: 0.2 }
      : { duration: 1.2, repeat: Infinity, repeatType: 'reverse' },
    rotate: { duration: wobble ? 0.6 : 0.2 },
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
                <span className="text-[10px] font-semibold uppercase tracking-wide text-red-400 animate-pulse">
                  ● Live
                </span>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => {
                  setOpen(false);
                  setStatus('muted');
                  endChatSession();
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

        <AnimatePresence>
          {bubbleVisible &&
            !open &&
            nevermoreVisible &&
            status !== 'muted' &&
            status !== 'standby' && (
              <motion.div
                key="raven-nevermore"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="mb-1 rounded-full bg-black px-3 py-1 text-xs font-semibold text-yellow-200 shadow-lg dark:bg-slate-900"
              >
                NEVERMORE!!!
              </motion.div>
            )}
        </AnimatePresence>

        {bubbleVisible && !open && (
          <motion.button
            ref={iconRef}
            className={`group fixed bottom-4 left-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent/70 ${
              isRunningAway ? 'pointer-events-none' : ''
            }`}
            onClick={handleIconClick}
            aria-expanded={open}
            aria-label="Open chat bot"
            animate={iconAnimate}
            transition={iconTransition}
          >
            <img
              src={ravenAssistantIcon}
              alt="Raven AI Assistant"
              className="h-14 w-14 rounded-full object-cover transition-transform group-hover:scale-110"
            />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
