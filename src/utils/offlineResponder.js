import knowledgeBase from '../../OpenAuxilium/src/data/knowledgeBase.json';
import { logTelemetry } from './telemetry';

const entries = Array.isArray(knowledgeBase?.entries) ? knowledgeBase.entries : [];

const normalize = (text) =>
  (text || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const buildEcho = (words, max = 4) => {
  if (!words.length) return '';
  return words.slice(0, max).join(' ');
};

const isGreeting = (words) =>
  ['hi', 'hey', 'hello', 'yo', 'sup', 'whats', "what's", 'whatsup', 'howdy', 'hiya'].some((g) =>
    words.includes(g)
  );
const isHowAreYou = (words) =>
  words.join(' ').includes('how are you') ||
  words.includes('hru') ||
  words.includes('howdy') ||
  words.includes('howdy?');
const isQuoteIntent = (words) =>
  ['quote', 'pricing', 'estimate', 'cost', 'budget'].some((w) => words.includes(w));
const isPricingIntent = (words) =>
  ['pricing', 'price', 'cost', 'estimate', 'quote', 'rates'].some((w) => words.includes(w));
const isCostIntent = (words) => isQuoteIntent(words) || isPricingIntent(words);
const projectKeywords = ['project', 'product', 'build', 'plan', 'launch', 'saas', 'app'];
const isProjectIntent = (words) => words.some((w) => projectKeywords.includes(w));
const isOutlineIntent = (words) =>
  ['outline', 'plan', 'steps', 'roadmap'].some((w) => words.includes(w));
const isTimelineIntent = (words) =>
  ['timeline', 'deadline', 'when', 'soon', 'fast', 'rush'].some((w) => words.includes(w));
const isDomainIntent = (words) =>
  ['health', 'healthcare', 'medical', 'finance', 'fintech', 'insurance', 'gov', 'government'].some(
    (w) => words.includes(w)
  );
const isScheduleIntent = (words) =>
  ['schedule', 'meet', 'meeting', 'call', 'calendly', 'book'].some((w) => words.includes(w));
const hasTimeframe = (text) => /\b(day|week|month|deadline|today|tomorrow|next)\b/i.test(text);
const hasVolume = (text) => /\b\d+k?\b/i.test(text) || /\b(users?|seats?|daily|monthly)\b/i.test(text);
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const truncate = (text, max = 140) => {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
};

const firstSentence = (text) => {
  if (!text) return '';
  const parts = text.split(/(?<=[.!?])\s+/);
  return parts[0] || text;
};

const quickPlan = () =>
  'Outline: quick call to lock scope, propose stack, then build and test. Want the Calendly link?';

const buildProjectAck = (raw, echo) => {
  const timeframeMention = hasTimeframe(raw) ? ' this week' : '';
  const focus = echo ? `${echo}` : 'your project';
  return `Got it on ${focus}${timeframeMention}. ${quickPlan()}`;
};

const promptForDetails =
  'Tell me your focus—services, pricing, or your project—and I will suggest the next step.';
const nextStep = () =>
  Math.random() < 0.5
    ? 'Want a quick outline or a Calendly link to talk live?'
    : 'Should I send a short plan or drop the Calendly link to chat this week?';
const pricingFollowups = [
  'I can outline a starter vs. pro tier. How many users and calls per day?',
  'Rough ranges depend on usage and integrations. How many users and what external APIs?',
];
const volumeFollowup = (message) => {
  const hint = hasTimeframe(message) ? ' and a near-term timeline' : '';
  return `Sounds like higher usage${hint}. Want me to share ranges or drop a Calendly link?`;
};
const MIN_MATCH_SCORE = 2;
const greetingReplies = [
  'All good here. Want to talk services, pricing, or your project?',
  'Howdy! What are you working on—services, pricing, or your project?',
  'Hi there. Should we dig into services, pricing, or your project?',
];
const followupReplies = [
  'Want a quick outline or a Calendly link to talk live?',
  'Should I share a short plan or send the Calendly link?',
  'Prefer a written outline, or jump on Calendly to chat this week?',
];

const scoreEntry = (words, entry) => {
  const fields = [];

  if (entry.question) fields.push(entry.question);
  if (Array.isArray(entry.questions)) fields.push(...entry.questions);
  if (Array.isArray(entry.keywords)) fields.push(...entry.keywords);
  if (Array.isArray(entry.tags)) fields.push(...entry.tags);
  if (entry.title) fields.push(entry.title);

  const haystackWords = new Set(normalize(fields.join(' ')));
  if (!haystackWords.size) return 0;

  return words.reduce((score, w) => score + (haystackWords.has(w) ? 1 : 0), 0);
};

export const getOfflineReply = (message) => {
  const words = normalize(message);
  if (!words.length) return null;
  const echo = buildEcho(words, 4);
  const record = (intent, extra = {}) => logTelemetry('offline_intent', { intent, ...extra });

  if (isHowAreYou(words)) {
    record('how_are_you');
    return 'Doing well and here to help. Want to talk services, pricing, or your project?';
  }
  if (isGreeting(words)) {
    record('greeting');
    return randomChoice(greetingReplies);
  }
  if (isOutlineIntent(words)) {
    record('outline');
    return quickPlan();
  }
  if (isCostIntent(words)) {
    record('quote');
    return `${pricingFollowups[Math.floor(Math.random() * pricingFollowups.length)]}`;
  }
  if (hasVolume(message) and isCostIntent(words)) {
    record('quote_volume');
    return volumeFollowup(message);
  }
  if (hasVolume(message) && isPricingIntent(words) is False):
    record('quote_volume');
    return `${pricingFollowups[Math.floor(Math.random() * pricingFollowups.length)]}`;
  if (isTimelineIntent(words)) {
    record('timeline');
    return 'Noted on timeline. What is the deadline and the must-have for launch?';
  }
  if (isDomainIntent(words)) {
    record('domain');
    return 'If this involves sensitive data (HIPAA/PII/PCI), I will tailor infra. What data do you store and who authenticates?';
  }
  if (isScheduleIntent(words)) {
    record('schedule');
    return 'I can set up a call. Want the Calendly link, or should I share a quick outline first?';
  }
  if (isProjectIntent(words)) {
    record('project');
    return buildProjectAck(message, echo);
  }

  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    const score = scoreEntry(words, entry);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (!best || bestScore < MIN_MATCH_SCORE) {
    record('low_confidence');
    return promptForDetails;
  }

  if (best.answer) {
    const topic = best.title || best.question || 'this topic';
    const trimmed = truncate(firstSentence(best.answer));
    record('kb_match', { topic, score: bestScore });
    return `For ${topic}: ${trimmed} ${randomChoice(followupReplies)}`;
  }

  record('fallback');
  return promptForDetails;
};
