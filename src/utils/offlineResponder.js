import knowledgeBase from '../../OpenAuxilium/src/data/knowledgeBase.json';

const entries = Array.isArray(knowledgeBase?.entries) ? knowledgeBase.entries : [];

const normalize = (text) =>
  (text || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const isGreeting = (words) =>
  ['hi', 'hey', 'hello', 'yo', 'sup', "whats", "what's", 'whatsup', 'howdy'].some((g) =>
    words.includes(g)
  );
const isHowAreYou = (words) =>
  words.join(' ').includes('how are you') || words.includes('hru') || words.includes('howdy');
const isQuoteIntent = (words) =>
  ['quote', 'pricing', 'estimate', 'cost', 'budget'].some((w) => words.includes(w));
const projectKeywords = ['project', 'product', 'build', 'plan', 'launch', 'saas', 'app'];
const isProjectIntent = (words) => words.some((w) => projectKeywords.includes(w));
const isOutlineIntent = (words) =>
  ['outline', 'plan', 'steps', 'roadmap'].some((w) => words.includes(w));
const hasTimeframe = (text) => /\b(day|week|month|deadline|today|tomorrow|next)\b/i.test(text);

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
  'Quick outline: call to lock scope, propose stack, then build & test. Want the Calendly link?';

const buildProjectAck = (raw) => {
  const timeframeMention = hasTimeframe(raw) ? ' this week' : '';
  return `Got it—happy to help on that project${timeframeMention}. ${quickPlan()}`;
};

const promptForDetails =
  'What should we focus on—services, pricing, or your project? I will keep it short.';
const nextStep = () =>
  Math.random() < 0.5
    ? 'Want a quick outline or a Calendly link to talk live?'
    : 'Should I send a short plan or drop the Calendly link to chat this week?';
const MIN_MATCH_SCORE = 2;

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

  if (isHowAreYou(words)) {
    return 'Doing well and here to help. Want to talk services, pricing, or your project?';
  }
  if (isGreeting(words)) {
    return 'Howdy! What are you working on—services, pricing, or your project?';
  }
  if (isOutlineIntent(words)) {
    return quickPlan();
  }
  if (isQuoteIntent(words)) {
    return 'I can help scope a quote. Share the idea, target users, and timeline. Want the Calendly link?';
  }
  if (isProjectIntent(words)) {
    return buildProjectAck(message);
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
    return promptForDetails;
  }

  if (best.answer) {
    const topic = best.title || best.question || 'this topic';
    const trimmed = truncate(firstSentence(best.answer));
    return `For ${topic}: ${trimmed} ${nextStep()}`;
  }

  return promptForDetails;
};
