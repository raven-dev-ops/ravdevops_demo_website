// components/ChatBot.jsx

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ravenAssistantIcon from '../assets/service1_banner.png';
import { getViteEnv } from '../utils/env';
import { getOfflineReply } from '../utils/offlineResponder';
import { logTelemetry } from '../utils/telemetry';

const resolveApiBase = () => {
  const appConfig =
    typeof window !== 'undefined' && window.__APP_CONFIG__ ? window.__APP_CONFIG__ : null;
  const env = getViteEnv();

  return (
    (appConfig &&
      (appConfig.CHAT_API_BASE ||
        appConfig.ASSISTANT_API_URL ||
        appConfig.OPENAUXILIUM_URL)) ||
    env.VITE_CHAT_API_BASE ||
    env.VITE_ASSISTANT_API_URL ||
    env.VITE_OPENAUXILIUM_URL ||
    'https://chat-assistant-backend-gw-3j4dip0k.uc.gateway.dev'
  );
};

const API_BASE = resolveApiBase();
export const CHAT_STATE_STORAGE_KEY = 'raven-chatbot-state';
const normalizeMode = (value) => (value === 'offline' ? 'offline' : 'live');
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));
const typingDelayFor = (text, mode) => {
  const len = (text || '').length;
  if (mode === 'offline') {
    const base = 200;
    const scaled = base + len * 6;
    return Math.min(600, Math.max(200, scaled));
  }
  // Live: lighter delay for short replies only.
  if (len < 60) return 180 + len * 3;
  return 0;
};
const trimReply = (text) => {
  if (!text) return text;
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const clipped = sentences.slice(0, 3).join(' ');
  const maxLen = 260;
  return clipped.length > maxLen ? `${clipped.slice(0, maxLen).trim()}...` : clipped;
};
const telemetryDebug = () => {
  try {
    if (typeof window === 'undefined') return false;
    return Boolean(window.__RAVEN_TELEMETRY_DEBUG__) || process.env.NODE_ENV === 'development';
  } catch {
    return false;
  }
};

const ChatBot = ({ defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [mode, setMode] = useState('offline');
  const [showTelemetry, setShowTelemetry] = useState(false);
  const listEndRef = useRef(null);
  const quickReplies = [
    {
      id: 'calendly-link',
      label: 'Book a call',
      text: 'Can you send the Calendly link?',
      inlineReply:
        'Sure thing. Here is my Calendly link: https://calendly.com/ravdevops/discovery-meeting',
    },
    {
      id: 'pricing-outline',
      label: 'Pricing',
      text: 'Can you outline pricing?',
    },
    {
      id: 'services',
      label: 'Services',
      text: 'Which services do you offer?',
    },
    {
      id: 'email',
      label: 'Email us',
      text: 'What is your email address?',
      inlineReply: 'You can email business@ravdevops.com and we will reply within one business day.',
    },
  ];

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

  // Always start fresh on page load/refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(CHAT_STATE_STORAGE_KEY);
    }
  }, []);

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

  const handleSend = async (overrideText) => {
    const candidate =
      typeof overrideText === 'string' && overrideText.length > 0 ? overrideText : userInput;
    const text = (candidate || '').trim();
    if (!text) return;

    appendMessage('user', text);
    logTelemetry('chat_user_message', { mode, length: text.length });
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
          chatUserId,
          sessionId: sessionId || undefined,
          context: {
            chatUserId,
            source: 'raven-demo-website',
          },
        }),
      });

      if (!res.ok) {
        setMode('offline');
        throw new Error(`Chat error: ${res.status}`);
      }

      const json = await res.json();
      if (json.sessionId) {
        setSessionId(json.sessionId);
      }

      const resolvedMode = normalizeMode(json.mode);
      setMode(resolvedMode);
       logTelemetry('chat_mode', { mode: resolvedMode });

      let replyText = trimReply(json.reply);

      if (resolvedMode === 'offline') {
        await delay(typingDelayFor(replyText, 'offline'));
        const offlineAnswer = getOfflineReply(text);
        if (offlineAnswer) {
          replyText = trimReply(offlineAnswer);
        }
      } else {
        const liveDelay = typingDelayFor(replyText, 'live');
        if (liveDelay > 0) {
          await delay(liveDelay);
        }
      }

      if (replyText) {
        appendMessage('bot', replyText);
      }
    } catch (error) {
      logTelemetry('chat_error', { message: String(error) });
      setMode('offline');
      await delay(typingDelayFor(text, 'offline'));
      const offlineAnswer = getOfflineReply(text);
      appendMessage(
        'bot',
        trimReply(
          offlineAnswer ||
            'What should we focus on—services, pricing, or your project? I will keep it short.'
        ),
      );
    } finally {
      setIsResponding(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsResponding(false);
    setUserInput('');
    // Briefly hide bubble to avoid visual jump
    setBubbleVisible(false);
    setTimeout(() => setBubbleVisible(true), 350);
  };

  const handleQuickReply = (qr) => {
    if (!qr) return;
    if (qr.inlineReply) {
      const promptText = qr.text || 'Share the Calendly link.';
      appendMessage('user', promptText);
      appendMessage('bot', qr.inlineReply);
      logTelemetry('quick_reply', { id: qr.id, type: 'inline' });
      return;
    }
    logTelemetry('quick_reply', { id: qr.id, type: 'text' });
    handleSend(qr.text);
  };

  const exportTelemetry = () => {
    try {
      if (typeof window === 'undefined') return;
      const data = window.__RAVEN_TELEMETRY__ || [];
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `raven-telemetry-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      /* no-op */
    }
  };

  const telemetryData = () => {
    if (typeof window === 'undefined') return [];
    return Array.isArray(window.__RAVEN_TELEMETRY__) ? window.__RAVEN_TELEMETRY__ : [];
  };

  const clearTelemetry = () => {
    if (typeof window === 'undefined') return;
    window.__RAVEN_TELEMETRY__ = [];
    setShowTelemetry(false);
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

              <div className="flex flex-wrap gap-2 pt-1">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.id}
                    type="button"
                    onClick={() => handleQuickReply(qr)}
                    disabled={isResponding}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      isResponding
                        ? 'cursor-not-allowed border-gray-300 text-gray-400'
                        : 'border-raven-accent/60 text-raven-accent hover:bg-raven-accent/10'
                    }`}
                  >
                    {qr.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                {telemetryDebug() && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowTelemetry(true)}
                      className="text-[10px] text-slate-500 underline decoration-dotted underline-offset-4 hover:text-slate-700"
                    >
                      View telemetry
                    </button>
                    <button
                      type="button"
                      onClick={exportTelemetry}
                      className="text-[10px] text-slate-500 underline decoration-dotted underline-offset-4 hover:text-slate-700"
                    >
                      Export telemetry
                    </button>
                  </>
                )}
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
          className="group flex items-center justify-center rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent/70"
          style={{ width: '4.5rem', height: '4.5rem' }}
        >
          <img
            src={ravenAssistantIcon}
            alt="Raven AI Assistant"
            className="h-16 w-16 rounded-md object-cover"
            style={{
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d',
            }}
          />
        </button>
      )}

      {telemetryDebug() && showTelemetry && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white p-4 text-xs text-slate-900 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold">Telemetry (dev only)</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded bg-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-800 hover:bg-slate-300"
                  onClick={clearTelemetry}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="rounded bg-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-800 hover:bg-slate-300"
                  onClick={() => setShowTelemetry(false)}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="h-[70vh] overflow-auto rounded border border-slate-200 bg-slate-50 p-2">
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(telemetryData(), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
