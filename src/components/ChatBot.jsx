// components/ChatBot.jsx

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const DEFAULT_SERVICES = [
  'DevOps & Cloud Infrastructure',
  'Analytics Dashboards',
  'Custom Software Development',
  'CI/CD Packages & Retainers',
];

const ChatBot = ({
  calendlyUrl = 'https://calendly.com/ravendevops/discovery-meeting',
  onOpenContact,
  servicesList,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedMeetingType, setSelectedMeetingType] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const listEndRef = useRef(null);

  const options = useMemo(
    () => (servicesList && servicesList.length ? servicesList : DEFAULT_SERVICES),
    [servicesList]
  );

  useEffect(() => {
    if (!document.getElementById('calendly-script')) {
      const s = document.createElement('script');
      s.id = 'calendly-script';
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.body.appendChild(s);
    }
    if (!document.getElementById('calendly-style')) {
      const l = document.createElement('link');
      l.id = 'calendly-style';
      l.rel = 'stylesheet';
      l.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(l);
    }
  }, []);

  // Auto-open once per session after 8 seconds
  useEffect(() => {
    if (defaultOpen) return;
    try {
      const key = 'chatbot_autolaunched';
      if (!sessionStorage.getItem(key)) {
        const t = setTimeout(() => {
          setOpen(true);
          try { sessionStorage.setItem(key, '1'); } catch {}
        }, 8000);
        return () => clearTimeout(t);
      }
    } catch {}
  }, [defaultOpen]);

  // Restore saved chat state (session)
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('chatbot_state') || 'null');
      if (saved) {
        if (saved.reason) setReason(saved.reason);
        if (Array.isArray(saved.selectedServices)) setSelectedServices(saved.selectedServices);
        if (saved.name) setName(saved.name);
        if (saved.email) setEmail(saved.email);
        if (saved.selectedMeetingType) setSelectedMeetingType(saved.selectedMeetingType);
        if (Array.isArray(saved.messages)) setMessages(saved.messages);
        if (typeof saved.step === 'number') setStep(saved.step);
      }
    } catch {}
  }, []);

  // Persist chat state during session
  useEffect(() => {
    const snapshot = { reason, selectedServices, name, email, selectedMeetingType, messages, step };
    try { sessionStorage.setItem('chatbot_state', JSON.stringify(snapshot)); } catch {}
  }, [reason, selectedServices, name, email, selectedMeetingType, messages, step]);

  // Seed greeting and first prompt when opening and empty
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 'greet', role: 'bot', text: 'Hi! 👋 What brings you to the website today?' }]);
      setStep(1);
    }
  }, [open, messages.length]);

  // Auto-scroll conversation to bottom
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const appendMessage = (role, text) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text }]);
  };

  const handleSend = async () => {
    const text = (userInput || '').trim();
    if (!text) return;
    appendMessage('user', text);
    setUserInput('');

    try {
      if (step === 1) {
        setReason(text);
        appendMessage('bot', 'Which services are you interested in? You can pick multiple.');
        setStep(2);
        return;
      }

      if (step === 2) {
        const lowered = text.toLowerCase();
        let parsed = [];
        if (/(all|any|everything)/i.test(text)) {
          parsed = options.slice();
        } else {
          parsed = options.filter((opt) => lowered.includes(opt.toLowerCase()));
        }
        if (parsed.length) {
          setSelectedServices((prev) => Array.from(new Set([...(prev || []), ...parsed])));
        }
        appendMessage('bot', 'Got it. Please share your contact details.');
        setStep(3);
        return;
      }

      if (step === 3) {
        const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
        const nameRegexes = [
          /name\s*[:=-]?\s*([^,\n]+)/i,
          /my name is\s+([^,\n]+)/i,
          /i am\s+([^,\n]+)/i,
          /i'm\s+([^,\n]+)/i,
        ];
        let nameCandidate = null;
        for (const re of nameRegexes) {
          const m = text.match(re);
          if (m) { nameCandidate = m[1].trim(); break; }
        }
        if (!nameCandidate && !emailMatch) {
          const wordCount = text.split(/\s+/).filter(Boolean).length;
          if (wordCount > 0 && wordCount <= 4) nameCandidate = text;
        }
        if (nameCandidate) setName((prev) => prev || nameCandidate);
        if (emailMatch) setEmail(emailMatch[0]);

        if (emailMatch) {
          appendMessage('bot', 'Choose your preferred consultation type.');
          setStep(4);
        } else {
          appendMessage('bot', 'Thanks! Please share your email so we can follow up.');
        }
        return;
      }

      if (step === 4) {
        const t = text.toLowerCase();
        let meetingType = '';
        if (t.includes('zoom')) meetingType = 'zoom';
        else if (t.includes('teams')) meetingType = 'teams';
        else if (t.includes('google') || t.includes('meet')) meetingType = 'google';
        else if (t.includes('phone') || t.includes('call')) meetingType = 'phone';
        if (meetingType) {
          await scheduleViaFunction(meetingType);
        } else {
          appendMessage('bot', 'Please choose Zoom, Microsoft Teams, Google Meet, or Phone Call.');
        }
        return;
      }

      // Fallback for other steps
      appendMessage('bot', 'Thanks! If you need help scheduling, just say Zoom, Teams, Google Meet, or Phone.');
    } catch (e) {
      // No-op; keep the conversation resilient
    }
  };

  const toggleService = (svc) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const openCalendlyUrl = (url, prefill) => {
    const opts = prefill ? { url, prefill } : { url };
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget(opts);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const scheduleViaFunction = async (meetingType) => {
    setLoading(true);
    setSelectedMeetingType(meetingType);
    try {
      const res = await fetch('/.netlify/functions/create-calendly-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingType }),
      });
      const data = await res.json();
      const url = data && data.url ? data.url : calendlyUrl;
      const prefill = {
        name: name || undefined,
        email: email || undefined,
        customAnswers: {
          a1: meetingType,
          a2: selectedServices.join(', '),
          a3: reason,
        },
      };
      openCalendlyUrl(url, prefill);
      setStep(5);
      const labelMap = { zoom: 'Zoom', teams: 'Microsoft Teams', google: 'Google Meet', phone: 'Phone Call' };
      appendMessage('user', `Preferred meeting: ${labelMap[meetingType] || meetingType}`);
      appendMessage('bot', 'Great — opening the scheduler so you can pick a time.');
    } catch (e) {
      openCalendlyUrl(calendlyUrl);
      setStep(5);
    } finally {
      setLoading(false);
    }
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
            className="w-80 max-w-[90vw] bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden mb-3"
          >
            <div className="flex items-center justify-between bg-raven-blue text-white px-4 py-3">
              <div className="font-semibold">Chat with us</div>
              <button aria-label="Close chat" onClick={() => setOpen(false)} className="p-1 hover:opacity-90">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Conversation window */}
              <div className="h-64 overflow-y-auto pr-1 space-y-2 border border-gray-100 rounded-md p-2 bg-gray-50">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${m.role === 'user' ? 'bg-raven-blue text-white' : 'bg-white text-gray-800 border border-gray-200'} px-3 py-2 rounded-2xl max-w-[85%] shadow-sm`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={listEndRef} />
              </div>
              {step === 1 && (
                <div>
                  {/* Quick-reply buttons removed in favor of free text input */}
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="text-sm text-gray-800 font-medium mb-2">
                    Which services are you interested in?
                  </div>
                  <div className="flex flex-col gap-2 mb-3 max-h-40 overflow-auto pr-1">
                    {options.map((svc) => (
                      <button
                        key={svc}
                        onClick={() => toggleService(svc)}
                        className={`flex items-center justify-between border rounded-lg px-3 py-2 text-sm transition ${
                          selectedServices.includes(svc)
                            ? 'border-raven-blue bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-left mr-2">{svc}</span>
                        {selectedServices.includes(svc) && (
                          <CheckCircleIcon className="w-5 h-5 text-raven-blue" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-gray-700">
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (selectedServices.length) {
                          appendMessage('user', `Interested services: ${selectedServices.join(', ')}`);
                        } else {
                          appendMessage('user', 'Interested services: (none selected)');
                        }
                        appendMessage('bot', 'Got it. Please share your contact details.');
                        setStep(3);
                      }}
                      className="bg-raven-blue text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-800"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="text-sm text-gray-800 font-medium mb-2">Your contact details</div>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-raven-blue"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-raven-blue"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setStep(2)} className="text-xs text-gray-500 hover:text-gray-700">Back</button>
                    <button
                      onClick={() => {
                        setStep(4);
                        const parts = [];
                        if (name) parts.push(`Name: ${name}`);
                        if (email) parts.push(`Email: ${email}`);
                        appendMessage('user', parts.join(' · '));
                        appendMessage('bot', 'Choose your preferred consultation type.');
                      }}
                      disabled={email && email.includes('@') ? false : true}
                      className={`text-white text-sm font-medium px-4 py-2 rounded-lg ${email && email.includes('@') ? 'bg-raven-blue hover:bg-blue-800' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="text-sm text-gray-800 font-medium mb-2">Choose your preferred consultation type</div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { k: 'zoom', label: 'Zoom' },
                      { k: 'teams', label: 'Microsoft Teams' },
                      { k: 'google', label: 'Google Meet' },
                      { k: 'phone', label: 'Phone Call' },
                    ].map((opt) => (
                      <button
                        key={opt.k}
                        disabled={loading}
                        onClick={() => scheduleViaFunction(opt.k)}
                        className={`text-left border rounded-lg px-3 py-2 text-sm transition ${
                          loading ? 'opacity-70 cursor-not-allowed' : 'border-gray-200 hover:border-raven-blue hover:bg-blue-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button onClick={() => setStep(3)} className="text-xs text-gray-500 hover:text-gray-700">
                      Back
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="font-medium text-gray-800">Thanks! We’ve got your interests.</div>
                  <div>Feel free to browse, or reach out if you have questions.</div>
                  {typeof onOpenContact === 'function' && (
                    <button
                      onClick={() => {
                        const r = (reason || '').toLowerCase();
                        let interest = 'Consultation';
                        if (r.includes('retainer')) interest = 'CI Retainer Program';
                        else if (r.includes('learn')) interest = 'Consultation';
                        else if (r.includes('project')) interest = 'Consultation';
                        else if (r.includes('demo') || r.includes('trial') || r.includes('walkthrough') || r.includes('showcase')) interest = 'Demo Request';
                        else if (r.includes('other')) interest = 'General Inquiry';

                        const msgParts = [];
                        if (reason) msgParts.push(`Reason: ${reason}`);
                        if (selectedServices.length) msgParts.push(`Interested services: ${selectedServices.join(', ')}`);
                        if (selectedMeetingType) {
                          const labelMap = { zoom: 'Zoom', teams: 'Microsoft Teams', google: 'Google Meet', phone: 'Phone Call' };
                          msgParts.push(`Preferred meeting: ${labelMap[selectedMeetingType] || selectedMeetingType}`);
                        }
                        const message = msgParts.join('\n');

                        onOpenContact({
                          interest,
                          name,
                          email,
                          message,
                        });
                        setOpen(false);
                      }}
                      className="mt-1 underline text-raven-blue hover:text-blue-800"
                    >
                      Prefer email? Open the contact form
                    </button>
                  )}
                </div>
              )}

              {/* Freeform input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-raven-blue"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !userInput.trim()}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-white ${userInput.trim() && !loading ? 'bg-raven-blue hover:bg-blue-800' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="flex items-center gap-2 bg-raven-blue text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-800"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open chat bot"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
        <span className="text-sm font-semibold">Chat</span>
      </button>
    </div>
  );
};

export default ChatBot;
